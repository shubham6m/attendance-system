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

async function getSheetData() {
    try {
        const sheetData = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: 'A1:Z'
        });
        return sheetData.data.values;
    } catch (error) {
        console.error('Error getting sheet data', error);
        throw new Error('Error getting sheet data: ' + error.message)
    }
}

async function updateSheetData(data) {
    try {
        await sheets.spreadsheets.values.append({
            auth,
            spreadsheetId: SPREADSHEET_ID,
            range: 'A1:Z',
            valueInputOption: 'USER_ENTERED',
            resource: { values: [data] }
        });
    } catch (error) {
        console.error('Error updating sheet data', error);
        throw new Error('Error updating sheet data:' + error.message)
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
        })
    } catch (error) {
        console.error('Error updating sheet data', error);
        throw new Error('Error updating sheet data:' + error.message)
    }
}

// Helper function to format the current time as HH:mm:ss
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
//When punch-in or punch-out button are pressed, get the current time using the function
const currentTime = getCurrentTime()

// API endpoints
app.post('/punch-in', async (req, res) => {
  const { employeeId, fullName, tasks, currentTime } = req.body;

    try {
        const now = new Date();
        const date = now.toLocaleDateString();
        const punchInTime = getCurrentTime(); // Use the consistent time format

        const sheetData = await getSheetData();
        const existingUser = sheetData.some(row => row[0] === employeeId && row[2] === date);

        if (existingUser) {
            return res.json({ success: false, message: 'User already punched in.' });
        }

        await updateSheetData([employeeId, fullName, date, punchInTime, "", tasks]);
        return res.json({ success: true, message: "Punch In Successful" });

    } catch (error) {
        console.error("Error during punch in.", error);
        return res.status(500).json({ success: false, message: "Error during punch in. " + error.message })
    }
});

app.post("/punch-out", async (req, res) => {
    const { employeeId, fullName, finalReport, currentTime, timezoneOffset } = req.body;

    try {
        console.log("Punch Out Request:", { employeeId, fullName, finalReport, currentTime }); // Log request data

        const sheetData = await getSheetData();
        const userIndex = sheetData.findIndex(row => row[0] === employeeId && row[2] === new Date().toLocaleDateString()); // Ensure date comparison

        if (userIndex === -1) {
            return res.status(400).json({ success: false, message: "User not logged in." });
        }

        if (sheetData[userIndex][4]) {
            return res.status(400).json({ success: false, message: "User has already punched out." });
        }

        const punchInTime = sheetData[userIndex][3];
        const totalHours = calculateHoursWorked(punchInTime, currentTime);

        console.log("User Index:", userIndex); // Log user index
        console.log("Final Report Value:", finalReport); // Log final report value

        await updateSheetRow(`A${userIndex + 1}:Z${userIndex + 1}`, [sheetData[userIndex][0], sheetData[userIndex][1], sheetData[userIndex][2], sheetData[userIndex][3], currentTime, sheetData[userIndex][5], totalHours, finalReport]);
        return res.json({ success: true, message: "Punch out successful.", totalHours });

    } catch (error) {
        console.error("Error during punch out.", error);
        return res.status(500).json({ success: false, message: "Error during punch out. " + error.message });
    }
});

function calculateHoursWorked(punchInTime, punchOutTime) {
    if (!punchInTime || !punchOutTime) {
        return '00:00:00 hours';
    }

    const [inHours, inMinutes, inSeconds] = punchInTime.split(':').map(Number);
    const [outHours, outMinutes, outSeconds] = punchOutTime.split(':').map(Number);

    const inTimeInSeconds = inHours * 3600 + inMinutes * 60 + inSeconds;
    const outTimeInSeconds = outHours * 3600 + outMinutes * 60 + outSeconds;

    let diffInSeconds = outTimeInSeconds - inTimeInSeconds;

    if (diffInSeconds < 0) {
        diffInSeconds += 24 * 3600; // Account for overnight shifts
    }

    const diffHours = Math.floor(diffInSeconds / 3600);
    const diffMinutes = Math.floor((diffInSeconds % 3600) / 60);
    const diffSeconds = diffInSeconds % 60;

    const formattedHours = String(diffHours).padStart(2, '0');
    const formattedMinutes = String(diffMinutes).padStart(2, '0');
    const formattedSeconds = String(diffSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} hours`;
}

app.get('*', (req, res) => {
    res.status(404).send("Not found");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
