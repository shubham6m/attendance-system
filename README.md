# Attendance Tracking System

## Description

This is a Node.js-based attendance tracking system that integrates with Google Sheets to record employee punch-in and punch-out times, along with their daily tasks. This system provides a simple and efficient way to manage employee attendance and track their work activities.

## Features

*   **Punch-In/Punch-Out:** Allows employees to record their start and end times for the workday.
*   **Task Tracking:** Enables employees to specify the tasks they worked on during the day.
*   **Google Sheets Integration:** Automatically records attendance data in a Google Sheet for easy access and reporting.
*   **Calculates Total Hours:**  Calculates the total hours worked based on punch-in and punch-out times.
*   **Simple API Endpoints:** Provides API endpoints for punch-in and punch-out functionality.

## Technologies Used

*   Node.js
*   Express.js
*   Google Sheets API
*   googleapis (Node.js library for Google APIs)
*   node-fetch (for dynamic import fix)

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



# Employee Attendance System

This is a simple employee attendance system built with HTML, CSS, JavaScript for the front end, and Node.js with Express for the back end. It uses Google Sheets as a data store via the Google Sheets API.

## Features

*   **Employee Login:** Allows employees to log in with their ID and full name.
*   **Punch In/Out:** Records the time when an employee starts and ends their work.
*   **Task Tracking:** Allows employees to enter the tasks they are working on.
*   **Total Hours Worked:** Automatically calculates the total hours worked between punch-in and punch-out.
*   **Dark Mode:** Offers a dark mode option for improved user experience.
*   **Data Storage:** Uses Google Sheets to store attendance records.

## Technologies Used

*   **Frontend:**
    *   HTML
    *   CSS
    *   JavaScript
*   **Backend:**
    *   Node.js
    *   Express
*   **API:**
    *   Google Sheets API

## Prerequisites

Before running this application, you need to have the following installed:

*   **Node.js:** Make sure Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
*   **NPM (Node Package Manager):** NPM comes with Node.js, so you should have it installed automatically.
*   **Google Cloud Project:**  A Google Cloud Project with the Google Sheets API enabled.
*   **Google Service Account:**  A service account with credentials to access the Google Sheets API.
*   **Google Sheet:** A Google Sheet to store the attendance data.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd [repository-directory]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Google Sheets API:**

    *   Enable the Google Sheets API in your Google Cloud project.
    *   Create a service account and download the JSON key file.
    *   Share your Google Sheet with the service account's email address and give it edit permissions.

4.  **Configure environment variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```
    SPREADSHEET_ID=[your-spreadsheet-id]
    GOOGLE_APPLICATION_CREDENTIALS='[JSON string of your service account credentials file]'
    PORT=3000 # Optional: Set a custom port
    ```

    *   Replace `[your-spreadsheet-id]` with the ID of your Google Sheet. You can find it in the URL of your Google Sheet.
    *   Replace `[JSON string of your service account credentials file]` with the JSON string of your service account credentials file.  **Important:**  Make sure this is a single-line string.  You can achieve this by reading the file content and stringifying it in your application or using a tool to convert the JSON to a single-line string.

5.  **Run the application:**

    ```bash
    npm start
    ```

    This will start the server, and you can access the application in your browser at `http://localhost:3000`.

## Google Sheet Setup

Ensure your Google Sheet has the following headers in the first row:

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

## Important Notes

*   **Timezones:** This application assumes that the server and users are in the same timezone. For production applications with users in different timezones, you need to implement proper timezone handling using a library like `date-fns-tz` or `luxon`.
*   **Error Handling:** The error handling is basic. Consider adding more robust error handling and logging for production use.
*   **Security:** This is a basic example and may not be suitable for production environments without additional security measures.
*   **API Usage:** Be mindful of Google Sheets API usage limits.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements.
