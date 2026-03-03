const initialOptionsDiv = document.getElementById('initialOptions');
const employeeFormDiv = document.getElementById('employeeForm');
const employeeOutFormDiv = document.getElementById('employeeOutForm');
const suggestionFormDiv = document.getElementById('suggestionForm');
const leaveFormDiv = document.getElementById('leaveForm');
const calenderFormDiv = document.getElementById('calenderForm');
const noticePeriodFormDiv = document.getElementById('noticePeriodForm');

// button click handler
document.getElementById('punchInBtn').addEventListener('click', ()=>{
    initialOptionsDiv.classList.add('hidden');
    employeeFormDiv.classList.remove('hidden');
    employeeOutFormDiv.classList.add('hidden');
});

document.getElementById('punchOutBtn').addEventListener('click', ()=>{
    initialOptionsDiv.classList.add('hidden');
    employeeFormDiv.classList.add('hidden');
    employeeOutFormDiv.classList.remove('hidden');
});

document.getElementById('suggestionBtn').addEventListener('click', () => {
    initialOptionsDiv.classList.add('hidden');
    employeeFormDiv.classList.add('hidden');
    employeeOutFormDiv.classList.add('hidden');
    leaveFormDiv.classList.add('hidden');
    suggestionFormDiv.classList.remove('hidden');
});

document.getElementById('leaveBtn').addEventListener('click', () => {
    initialOptionsDiv.classList.add('hidden');
    employeeFormDiv.classList.add('hidden');
    employeeOutFormDiv.classList.add('hidden');
    suggestionFormDiv.classList.add('hidden');
    leaveFormDiv.classList.remove('hidden');
});

document.getElementById('calender').addEventListener('click', () => {
    initialOptionsDiv.classList.add('hidden');
    employeeFormDiv.classList.add('hidden');
    employeeOutFormDiv.classList.add('hidden');
    suggestionFormDiv.classList.add('hidden');
    leaveFormDiv.classList.add('hidden');
    calenderFormDiv.classList.remove('hidden');
});

document.getElementById('noticePeriod').addEventListener('click', () => {
    initialOptionsDiv.classList.add('hidden');
    employeeFormDiv.classList.add('hidden');
    employeeOutFormDiv.classList.add('hidden');
    suggestionFormDiv.classList.add('hidden');
    leaveFormDiv.classList.add('hidden');
    // calenderFormDiv.classList.add('hidden');
    noticePeriodFormDiv.classList.remove('hidden');
});

//public leave list
const publicLeaves = [
  { name: "New Year", date: "2026-01-01", type: "PUBLIC LEAVE" },
  { name: "Republic Day", date: "2026-01-26", type: "PUBLIC LEAVE" },
  { name: "Holi", date: "2026-03-04", type: "PUBLIC LEAVE" },
  { name: "Independence Day", date: "2026-08-15", type: "PUBLIC LEAVE" },
  { name: "Raksha Bandhan", date: "2026-08-28", type: "PUBLIC LEAVE" },
  { name: "Mahatma Gandhi Jayanti", date: "2026-10-02", type: "PUBLIC LEAVE" },
  { name: "Vijayadashami (Dussehra)", date: "2026-10-20", type: "PUBLIC LEAVE" },
  { name: "Diwali", date: "2026-11-08", type: "PUBLIC LEAVE" },
  { name: "Christmas", date: "2026-12-25", type: "PUBLIC LEAVE" }
];

//optional leave list
const optionalLeaves = [
  { name: "Makar Sankranti (Pongal)", date: "2026-01-14", type: "OPTIONAL LEAVE" },
  { name: "Maha Shivaratri", date: "2026-02-15", type: "OPTIONAL LEAVE" },
  { name: "Eid-ul-Fitr (Ramzan ID)", date: "2026-03-21", type: "OPTIONAL LEAVE" },
  { name: "Good Friday", date: "2026-04-03", type: "OPTIONAL LEAVE" },
  { name: "Eid-ul-Adha (Bakrid)", date: "2026-05-27", type: "OPTIONAL LEAVE" },
  { name: "Muharram (Ashura)", date: "2026-06-26", type: "OPTIONAL LEAVE" },
  { name: "Janmashtami", date: "2026-09-04", type: "OPTIONAL LEAVE" },
  { name: "Bhai Duj", date: "2026-11-11", type: "OPTIONAL LEAVE" },
  { name: "Guru Nanak Jayanti", date: "2026-11-24", type: "OPTIONAL LEAVE" },
  { name: "Last Day of the Year", date: "2026-12-31", type: "OPTIONAL LEAVE" }
];

// NOTICE PERIOD DATA FOR DIFFERENT TIERS
const noticePeriods = [
  { tier: "T1", type: "Entry-Level DEOs, Data Collection Experts", days: "30 days" },
  { tier: "T2", type: "Entry-Level Fresher, Trainee", days: "30 days" },
  { tier: "T3", type: "Associates, Executives", days: "30 days" },
  { tier: "T4", type: "Senior Executives", days: "60 days" },
  { tier: "T5", type: "Team Leader, Manager", days: "60 days" },
  { tier: "T6", type: "Sr. Manager, HOD", days: "90 days" },
  { tier: "T7", type: "AVP, VP", days: "90 days" },
  { tier: "T8", type: "Director, CXO", days: "180 days" }
];

// LEAVE RENDERING LOGIC
// Helper function to format date for display leave list
function formatLeave(dateStr) {
  const date = new Date(dateStr);
  return {
    month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    day: date.getDate(),
    weekday: date.toLocaleString('en-US', { weekday: 'long' })
  };
}

// function to render both public and optional leaves
function renderLeaveList(leaveArray, containerId) {
  const container = document.getElementById(containerId);

  // Prevent duplicate rendering if calendar reopened
  container.innerHTML = "";

  leaveArray.forEach(item => {
    const { month, day, weekday } = formatLeave(item.date);

    const div = document.createElement("div");
    div.className = "leave-item";

    div.innerHTML = `
      <div class="date-box">
        <div class="month">${month}</div>
        <div class="day">${day}</div>
      </div>
      <div class="leave-content">
        <div class="leave-title">${item.name}</div>
        <div class="leave-day">${weekday}</div>
        <div class="badge">${item.type}</div>
      </div>
    `;

    container.appendChild(div);
  });
}

// Render both lists properly
function renderLeaves() {
  renderLeaveList(publicLeaves, "publicLeaveList");     // Public section
  renderLeaveList(optionalLeaves, "optionalLeaveList"); // Optional section
}

// // Calls render when page loads
// renderLeaves();

// RENDER NOTICE PERIOD
function renderNoticePeriods() {
    const container = document.getElementById("noticePeriodList");

    // Prevent duplicate rendering
    container.innerHTML = "";

    noticePeriods.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.tier}</td>
            <td>${item.type}</td>
            <td class="notice-align">${item.days}</td>
        `;
        container.appendChild(row);
    });
}
// Call once when page loads
// Calls render when page loads
renderLeaves();
renderNoticePeriods();

// Helper Functions for Time
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function getTimezoneOffset() {
    return -new Date().getTimezoneOffset() * 60;
}

//submit logic for punch in
document.getElementById('submitPunchIn').addEventListener('click', async ()=>{
  const employeeId = document.getElementById('employeeId').value;
  const fullName = document.getElementById('fullName').value;
  const tasks = document.getElementById('tasks').value;

    if(!employeeId){
      const statusMessageDiv = document.getElementById('statusMessage');
      statusMessageDiv.textContent = "Please Enter your Employee ID.";
      statusMessageDiv.classList.remove('success');
      statusMessageDiv.classList.add('error');
      return;
  }
    if(!fullName){
      const statusMessageDiv = document.getElementById('statusMessage');
      statusMessageDiv.textContent = "Please Enter your Name.";
      statusMessageDiv.classList.remove('success');
      statusMessageDiv.classList.add('error');
      return;
  }
    if(!tasks){
      const statusMessageDiv = document.getElementById('statusMessage');
      statusMessageDiv.textContent = "Please Enter your task.";
      statusMessageDiv.classList.remove('success');
      statusMessageDiv.classList.add('error');
      return;
  }
    // Get time and timezone
    const currentTime = getCurrentTime();
    const timezoneOffset = getTimezoneOffset();

  try{
     const response = await fetch("/punch-in", {
          method: "POST",
           headers: {
                 'Content-Type': 'application/json'
           },
           body: JSON.stringify({employeeId, fullName, tasks, currentTime, timezoneOffset })
      });
     const data = await response.json();

     const statusMessageDiv = document.getElementById('statusMessage');
    statusMessageDiv.textContent = data.message;
    if(data.success){
       statusMessageDiv.classList.remove('error');
       statusMessageDiv.classList.add('success');
       document.getElementById("attendanceForm").reset()
       // Show initial option
       initialOptionsDiv.classList.remove('hidden');
       employeeFormDiv.classList.add('hidden');
      }else{
         statusMessageDiv.classList.remove('success');
        statusMessageDiv.classList.add('error');
      }
  }catch(error){
        console.error("Error during fetch:", error);
       const statusMessageDiv = document.getElementById('statusMessage');
         statusMessageDiv.textContent = "Error occurred during punch in.";
          statusMessageDiv.classList.remove('success');
        statusMessageDiv.classList.add('error');
    }
});

//submit logic for punch out
document.getElementById('submitPunchOut').addEventListener('click', async ()=>{
 const employeeId = document.getElementById('employeeIdOut').value;
  const fullName = document.getElementById('fullNameOut').value;
  const finalReport = document.getElementById('finalReport').value;

    if(!employeeId){
      const statusMessageDiv = document.getElementById('statusMessage');
      statusMessageDiv.textContent = "Please Enter your Employee ID.";
      statusMessageDiv.classList.remove('success');
      statusMessageDiv.classList.add('error');
      return;
  }
    if(!fullName){
      const statusMessageDiv = document.getElementById('statusMessage');
      statusMessageDiv.textContent = "Please Enter your Name.";
      statusMessageDiv.classList.remove('success');
      statusMessageDiv.classList.add('error');
      return;
  }
    if(!finalReport){
      const statusMessageDiv = document.getElementById('statusMessage');
      statusMessageDiv.textContent = "Please Enter your Report.";
      statusMessageDiv.classList.remove('success');
      statusMessageDiv.classList.add('error');
      return;
  }
     // Get time and timezone
    const currentTime = getCurrentTime();
    const timezoneOffset = getTimezoneOffset();

  try{
     const response = await fetch("/punch-out", {
         method: "POST",
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({employeeId, fullName, finalReport, currentTime, timezoneOffset })
      });
    const data = await response.json();
    const statusMessageDiv = document.getElementById('statusMessage');
     statusMessageDiv.textContent = data.message;
     if(data.success){
         statusMessageDiv.classList.remove('error');
         statusMessageDiv.classList.add('success');
         statusMessageDiv.textContent = data.message + `Total Hours Worked: ${data.totalHours}`;
          document.getElementById("attendanceOutForm").reset()

           // Show initial option
           initialOptionsDiv.classList.remove('hidden');
           employeeOutFormDiv.classList.add('hidden');
      }else{
          statusMessageDiv.classList.remove('success');
         statusMessageDiv.classList.add('error');
      }
 }catch(error){
      console.error("Error during fetch:", error);
      const statusMessageDiv = document.getElementById('statusMessage');
       statusMessageDiv.textContent = "Error occurred during punch out.";
       statusMessageDiv.classList.remove('success');
       statusMessageDiv.classList.add('error');
    }

});

//submit logic for suggestion box
document.getElementById('submitSuggestion').addEventListener('click', async () => {
    const employeeId = document.getElementById('suggestEmployeeId').value;
    const suggestion = document.getElementById('suggestionText').value;

    if (!employeeId || !suggestion) {
        statusMessage.textContent = "All fields are required.";
        statusMessage.className = "message error";
        return;
    }

    const res = await fetch('/suggestion', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ employeeId, suggestion })
    });

    const data = await res.json();
    statusMessage.textContent = data.message;
    statusMessage.className = data.success ? "message success" : "message error";

    if (data.success) {
        document.getElementById('suggestionFormData').reset();
        suggestionFormDiv.classList.add('hidden');
        initialOptionsDiv.classList.remove('hidden');
    }
});

//submit logic for leave
document.getElementById('submitLeave').addEventListener('click', async () => {
    const employeeId = document.getElementById('leaveEmployeeId').value;
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const reason = document.getElementById('leaveReason').value;

    if (!employeeId || !fromDate || !toDate || !reason) {
        statusMessage.textContent = "All fields are required.";
        statusMessage.className = "message error";
        return;
    }

    const res = await fetch('/leave', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ employeeId, fromDate, toDate, reason })
    });

    const data = await res.json();
    statusMessage.textContent = data.message;
    statusMessage.className = data.success ? "message success" : "message error";

    if (data.success) {
        document.getElementById('leaveFormData').reset();
        leaveFormDiv.classList.add('hidden');
        initialOptionsDiv.classList.remove('hidden');
    }
});

//for back button logic =================
function goBack() {
    // Show initial options only
    initialOptionsDiv.classList.remove('hidden');
    // Hide all forms
    employeeFormDiv.classList.add('hidden');
    employeeOutFormDiv.classList.add('hidden');
    suggestionFormDiv.classList.add('hidden');
    leaveFormDiv.classList.add('hidden');
    calenderFormDiv.classList.add('hidden');
    noticePeriodFormDiv.classList.add('hidden');

    // Clear status message
    const statusMessageDiv = document.getElementById('statusMessage');
    statusMessageDiv.textContent = "";
    statusMessageDiv.className = "";
}



//for change mode light -> dark
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', ()=>{
  document.body.classList.toggle('dark');
});
