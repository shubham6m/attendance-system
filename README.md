# Attendance Tracking System

## Description

This is a **Node.js–based attendance tracking system** that integrates with **Google Sheets** to record employee punch-in and punch-out times along with their daily tasks, suggestions, and leave requests.

The system provides a simple and efficient way to manage employee attendance **without using a traditional database**.

---

## Features

- **Employee Login**  
  Employees can log in using their Employee ID and full name.

- **Punch In / Punch Out**  
  Records the time when an employee starts and ends their work.

- **Task Tracking**  
  Employees can enter the tasks they worked on during the day.

- **Total Hours Worked**  
  Automatically calculates total working hours between punch-in and punch-out.

- **Suggestion Box**  
  Employees can submit suggestions which are stored in Google Sheets.

- **Leave Requests**  
  Employees can apply for leave with a date range and reason.

- **Dark Mode**  
  Optional dark mode for improved user experience.

- **Google Sheets Storage**  
  All attendance data is stored securely in Google Sheets.

---

## Technologies Used

- Node.js  
- Express.js  
- Google Sheets API  
- googleapis  
- node-fetch  
- HTML, CSS, JavaScript  

---

## Google Sheets Structure

Your Google Spreadsheet must contain **three sheets** with the **exact names** below.

### Daily attendance

| Column | Header |
|------:|--------|
| A | Employee ID |
| B | Name |
| C | Date |
| D | Punch In Time |
| E | Punch Out Time |
| F | Task |
| G | Total Hours Worked |
| H | Final Report |

---

### Suggestions

| Column | Header |
|------:|--------|
| A | Employee ID |
| B | Suggestion |
| C | Date |
| D | Time |

---

### LeaveRequests

| Column | Header |
|------:|--------|
| A | Employee ID |
| B | From Date |
| C | To Date |
| D | Reason |
| E | Applied Date |
| F | Applied Time |

> **Note:** Format Date columns as **Date** and Time columns as **Time** in Google Sheets.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <your_repository_url>
    cd attendance-tracking-system
    ```

    Replace `<your_repository_url>` with the actual URL of your Git repository.

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a Google Cloud Project and Service Account:**

    *   Follow the steps outlined in the Google Cloud documentation to create a project and service account: [https://cloud.google.com/iam/docs/creating-managing-service-accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts)
    *   Enable the Google Sheets API for your project.

4.  **Download Service Account Credentials:**

    *   Download the service account key file (JSON format).
    **Important: Keep this file secure!**
    * Create an env file & paste the content of json file under the key 'GOOGLE_APP_CREDENTIALS' with value in single quote like :*
      {
  "type": "service_account",
  "project_id": "attendence-system-448406",
  "private_key_id": "your private id",
  "client_email": "abc@attendence-system-448406.iam.gserviceaccount.com",
  "client_id": "you client id in number format",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/stakshism%40attendence-system-448406.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

Make sure all this in single quote.

      

5.  **Create a Google Sheet:**

    *   Create a new Google Sheet to store the attendance data.

* Ensure your Google Sheet has the following headers in the first row:

| Column | Header          |
| :----- | :-------------- |
| A      | Employee ID     |
| B      | Name            |
| C      | Date            |
| D      | Punch In time   |
| E      | Punch Out time  |
| F      | Task            |
| G      | Total hours worked|

Format the columns to Plain Text.
    *   Share the sheet with the service account's email address (e.g., `stakshism@attendence-system-448406.iam.gserviceaccount.com`) and grant it "Editor" permission.
    *   Copy the Spreadsheet ID from the URL of your Google Sheet.  The URL will look something like this: `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit`

6.  **Configure Environment Variables:**

    *   Create a `.env` file in the project root directory.  **Important:**  Add `.env` to your `.gitignore` file to prevent it from being committed to the repository.
    *   Add the following environment variables to the `.env` file:

        ```
        PORT=3000
        SPREADSHEET_ID=<your_spreadsheet_id>
        GOOGLE_APPLICATION_CREDENTIALS='{"type": "service_account", "project_id": "your-project-id", ... (entire contents of attend.json) ... }'
        ```

        *   Replace `<your_spreadsheet_id>` with the actual ID of your Google Sheet.
        *   Replace the `... (entire contents of attend.json) ...` with the *entire contents* of your `attend.json` file as a JSON string.  Make sure the JSON string is properly escaped (enclosed in single quotes, with any internal single quotes or other special characters escaped).

7.  **Run the Application:**

    ```bash
    npm install dotenv  # Install dotenv for local development
    node app.js
    ```

    The server will start running on `http://localhost:3000` (or the port specified in your `.env` file).


## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements.
