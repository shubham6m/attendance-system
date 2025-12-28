const initialOptionsDiv = document.getElementById('initialOptions');
const employeeFormDiv = document.getElementById('employeeForm');
const employeeOutFormDiv = document.getElementById('employeeOutForm');
const suggestionFormDiv = document.getElementById('suggestionForm');
const leaveFormDiv = document.getElementById('leaveForm');

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
    // Hide all forms
    employeeFormDiv.classList.add('hidden');
    employeeOutFormDiv.classList.add('hidden');
    suggestionFormDiv.classList.add('hidden');
    leaveFormDiv.classList.add('hidden');

    // Show initial buttons
    initialOptionsDiv.classList.remove('hidden');

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
