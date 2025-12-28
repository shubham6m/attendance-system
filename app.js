const express = require('express');
const { google } = require('googleapis');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

let fetch;

import('node-fetch').then((module) => {
    fetch = module.default;
});

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const sheets = google.sheets({ version: 'v4' });
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

/* =========================
   🔴 CHANGE 1
   Explicit sheet name added
   ========================= */
async function getSheetData() {
    try {
        const sheetData = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: 'Daily attendance!A1:H' // 🔴 CHANGE
        });
        return sheetData.data.values || [];
    } catch (error) {
        console.error('Error getting sheet data', error);
        throw new Error('Error getting sheet data: ' + error.message);
    }
}

/* =========================
   🔴 CHANGE 2
   Explicit sheet mapping
   ========================= */
async function updateSheetData(data) {
    try {
        await sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: 'Daily attendance!A1:H', // 🔴 CHANGE
            valueInputOption: 'USER_ENTERED',
            resource: { values: [data] }
        });
    } catch (error) {
        console.error('Error updating sheet data', error);
        throw new Error('Error updating sheet data: ' + error.message);
    }
}

async function updateSheetRow(range, data) {
    try {
        await sheets.spreadsheets.values.update({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: range,
            valueInputOption: 'USER_ENTERED',
            resource: { values: [data] }
        });
    } catch (error) {
        console.error('Error updating sheet data', error);
        throw new Error('Error updating sheet data: ' + error.message);
    }
}

// Helper functions
function getCurrentTime() {
    return new Date().toTimeString().split(' ')[0];
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

/* =========================
   Punch In API
   ========================= */
app.post('/punch-in', async (req, res) => {
    const { employeeId, fullName, tasks, currentTime } = req.body;

    try {
        const date = getCurrentDate();
        const sheetData = await getSheetData();

        const existingUser = sheetData.some(
            row => row[0] === employeeId && row[2] === date
        );

        if (existingUser) {
            return res.json({ success: false, message: 'User already punched in.' });
        }

        await updateSheetData([
            employeeId,
            fullName,
            date,
            currentTime,
            "",
            tasks,
            "",
            ""
        ]);

        return res.json({ success: true, message: "Punch In Successful" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

/* =========================
   Punch Out API
   ========================= */
app.post('/punch-out', async (req, res) => {
    const { employeeId, finalReport, currentTime } = req.body;

    try {
        const date = getCurrentDate();
        const sheetData = await getSheetData();

        const userIndex = sheetData.findIndex(
            row => row[0] === employeeId && row[2] === date
        );

        if (userIndex === -1) {
            return res.json({ success: false, message: "User not logged in." });
        }

        if (sheetData[userIndex][4]) {
            return res.json({ success: false, message: "User already punched out." });
        }

        const punchInTime = sheetData[userIndex][3];
        const totalHours = calculateHoursWorked(punchInTime, currentTime);

        /* =========================
           🔴 CHANGE 3
           Correct row number (+2)
           Prevent duplicate row
           ========================= */
        const sheetRowNumber = userIndex + 2; // 🔴 CHANGE

        await updateSheetRow(
            `Daily attendance!A${sheetRowNumber}:H${sheetRowNumber}`, // 🔴 CHANGE
            [
                sheetData[userIndex][0],
                sheetData[userIndex][1],
                sheetData[userIndex][2],
                sheetData[userIndex][3],
                currentTime,
                sheetData[userIndex][5],
                totalHours,
                finalReport
            ]
        );

        return res.json({ success: true, message: "Punch out successful", totalHours });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

/* =========================
   🔴 CHANGE 4
   Suggestion API – Fix time format
   ========================= */
app.post('/suggestion', async (req, res) => {
    const { employeeId, suggestion } = req.body;

    try {
        const now = new Date(); // 🔴 CHANGE

        await sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: 'Suggestions!A1:D',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[
                    employeeId,
                    suggestion,
                    now.toISOString().split('T')[0], // Date
                    now.toISOString()                 // 🔴 Proper DateTime
                ]]
            }
        });

        res.json({ success: true, message: "Suggestion submitted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/* =========================
   Leave API (No change)
   ========================= */
app.post('/leave', async (req, res) => {
    const { employeeId, fromDate, toDate, reason } = req.body;

    try {
        await sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: 'LeaveRequests!A1:E',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[employeeId, fromDate, toDate, reason, getCurrentDate()]]
            }
        });

        res.json({ success: true, message: "Leave request submitted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/* =========================
   Hours Calculation
   ========================= */
function calculateHoursWorked(punchInTime, punchOutTime) {
    const toSeconds = t => {
        const [h, m, s] = t.split(':').map(Number);
        return h * 3600 + m * 60 + s;
    };

    let diff = toSeconds(punchOutTime) - toSeconds(punchInTime);
    if (diff < 0) diff += 86400;

    const h = String(Math.floor(diff / 3600)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const s = String(diff % 60).padStart(2, '0');

    return `${h}:${m}:${s}`;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
