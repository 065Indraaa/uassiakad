# Student Management System Blueprint

## Overview

This document outlines the architecture and features of the Student Management System, a web application built with React and Firebase. The system provides a dashboard and tools for managing students, teachers, grades, and schedules.

## Core Technologies

*   **Frontend:** React (with Vite)
*   **UI Framework:** Material-UI
*   **Routing:** React Router DOM
*   **Backend:** Firebase (Firestore for database, Firebase Authentication)

## Implemented Features

### 1. Project Setup & Foundational Structure

*   **React with Vite:** The project was initialized using Vite for a fast and modern development experience.
*   **Dependency Management:** `npm` is used for package management. Key dependencies include `react`, `react-dom`, `react-router-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`, and `firebase`.
*   **Firebase Integration:** The project is configured to connect to a Firebase project. A `src/firebase.js` file centralizes the Firebase configuration, and the `.idx/mcp.json` file is set up for Firebase integration within the development environment.

### 2. Authentication and Routing

*   **Routing:** `react-router-dom` is implemented in `src/App.jsx` to manage navigation. The following routes are configured:
    *   `/`: The main dashboard.
    *   `/login`: A dedicated login page.
    *   `/students`: The student management page.
    *   `/teachers`: The teacher management page.
    *   `/grades`: The grade management page.
    *   `/schedule`: The class schedule page.
*   **Login Page:** A user interface for logging in has been created at `src/pages/Login.jsx`, complete with email and password fields.

### 3. User Interface and Layout

*   **Consistent Layout:** A reusable `Layout` component (`src/components/Layout.jsx`) provides a consistent look and feel across the application. It includes a persistent sidebar for navigation and a top app bar that displays the current page title.
*   **Navigation:** The sidebar, defined in `src/components/listItems.jsx`, contains links to all major sections of the application, utilizing Material-UI icons for clarity.
*   **Styling:** The application uses Material-UI for all UI components, providing a clean and modern design.

### 4. Student Management (CRUD Functionality)

The `src/pages/Students.jsx` page provides full Create, Read, Update, and Delete (CRUD) functionality for student data, stored in a `students` collection in Firestore.

*   **View Students:** Student data is fetched from Firestore and displayed in a Material-UI table.
*   **Add Students:** A dialog form allows users to add new students to the database.
*   **Edit Students:** Existing student information can be edited through the same dialog form.
*   **Delete Students:** Students can be removed from the database.

### 5. Placeholder Pages

To facilitate future development, the following placeholder pages have been created, each integrated with the main application `Layout`:

*   `src/pages/Teachers.jsx`
*   `src/pages/Grades.jsx`
*   `src/pages/Schedule.jsx`

## Next Steps

The following features are planned for future development:

*   **User Authentication:** Implement the logic to handle user login and registration using Firebase Authentication.
*   **CRUD for Other Sections:** Build out the CRUD functionality for the Teachers, Grades, and Schedule pages.
*   **Dashboard Features:** Enhance the dashboard to display relevant statistics and summaries.
*   **Protected Routes:** Ensure that only authenticated users can access the main application pages.
