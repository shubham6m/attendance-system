const loginOptionsDiv = document.getElementById('loginOptions');
const employeeFormDiv = document.getElementById('employeeForm');

document.getElementById('employeeLoginBtn').addEventListener('click', ()=>{
    loginOptionsDiv.classList.add('hidden');
    employeeFormDiv.classList.remove('hidden');
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

document.getElementById('punchIn').addEventListener('click', async ()=>{
  const employeeId = document.getElementById('employeeId').value;
  const fullName = document.getElementById('fullName').value;
  const tasks = document.getElementById('tasks').value;

    if(!employeeId || !fullName){
      const statusMessageDiv = document.getElementById('statusMessage');
      statusMessageDiv.textContent = "Employee ID and Full Name are required.";
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

document.getElementById('punchOut').addEventListener('click', async ()=>{
 const employeeId = document.getElementById('employeeId').value;
  const fullName = document.getElementById('fullName').value;
  const tasks = document.getElementById('tasks').value;

    if(!employeeId || !fullName){
      const statusMessageDiv = document.getElementById('statusMessage');
      statusMessageDiv.textContent = "Employee ID and Full Name are required.";
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
          body: JSON.stringify({employeeId, fullName, tasks, currentTime, timezoneOffset })
      });
    const data = await response.json();
    const statusMessageDiv = document.getElementById('statusMessage');
     statusMessageDiv.textContent = data.message;
     if(data.success){
         statusMessageDiv.classList.remove('error');
         statusMessageDiv.classList.add('success');
         statusMessageDiv.textContent = data.message + `Total Hours Worked: ${data.totalHours}`;
          document.getElementById("attendanceForm").reset()
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

const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', ()=>{
  document.body.classList.toggle('dark');
});
