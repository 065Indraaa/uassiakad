# Student Management System Blueprint

## Overview

This document outlines the architecture and features of the Student Management System, a web application built with React and Firebase. The system provides a dashboard and tools for managing students, teachers, grades, and schedules.

## Core Technologies

*   **Frontend:** React (with Vite)
*   **UI Framework:** Material-UI
*   **Routing:** React Router DOM
*   **Backend:** Firebase (Firestore for database, Firebase Authentication)
*   **State Management:** React Hooks (`useState`, `useEffect`) and `react-firebase-hooks` for auth state.

## Implemented Features

### 1. Project Setup & Foundational Structure

*   **React with Vite:** The project was initialized using Vite for a fast and modern development experience.
*   **Dependency Management:** `npm` is used for package management. Key dependencies include `react`, `react-dom`, `react-router-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`, `firebase`, and `react-firebase-hooks`.
*   **Firebase Integration:** The project is configured to connect to a Firebase project. A `src/firebase.js` file centralizes the Firebase configuration, and the `.idx/mcp.json` file is set up for Firebase integration within the development environment.

### 2. Authentication and Routing

*   **User Authentication:** User accounts are created by an administrator through the "Add Teacher" or "Add Student" forms. When a new person is added, an account is created in Firebase Authentication with a default password. The self-service registration page has been removed.
    *   **Sign In:** A login page (`src/pages/Login.jsx`) validates user credentials.
    *   **Sign Out:** A logout button in the application header allows users to securely sign out.
    *   **Forgot Password:** A password reset feature is available on the login page.
*   **Protected Routes:** A `ProtectedRoute` component ensures that only authenticated users can access the main application pages. Unauthenticated users are redirected to the login page.
*   **Routing:** `react-router-dom` is implemented in `src/App.jsx` to manage navigation. The following routes are configured:
    *   `/login`: The application's login page.
    *   `/`: The main dashboard (protected).
    *   `/students`: The student management page (protected).
    *   `/teachers`: The teacher management page (protected).
    *   `/grades`: The grade management page (protected).
    *   `/schedule`: The class schedule page (protected).
    *   `/profile`: The user profile page where users can change their password (protected).

### 3. User Interface and Layout

*   **Consistent Layout:** A reusable `Layout` component (`src/components/Layout.jsx`) provides a consistent look and feel across the application. It includes a persistent sidebar for navigation and a top app bar that displays the current page title and a logout button.
*   **Navigation:** The sidebar, defined in `src/components/listItems.jsx`, contains links to all major sections of the application, utilizing Material-UI icons for clarity.
*   **Styling:** The application uses Material-UI for all UI components, providing a clean and modern design.

### 4. Student Management (CRUD Functionality)

The `src/pages/Students.jsx` page provides full Create, Read, Update, and Delete (CRUD) functionality for student data, stored in a `students` collection in Firestore. New student creation also triggers the creation of a corresponding user account in Firebase Authentication.

### 5. Teacher Management (CRUD Functionality)

The `src/pages/Teachers.jsx` page provides full Create, Read, Update, and Delete (CRUD) functionality for teacher data, stored in a `teachers` collection in Firestore. New teacher creation also triggers the creation of a corresponding user account in Firebase Authentication.

### 6. Grade Management (CRUD Functionality)

The `src/pages/Grades.jsx` page provides full Create, Read, Update, and Delete (CRUD) functionality for grade data. The form for adding and editing grades includes dropdowns to select students and teachers.

### 7. Schedule Management (CRUD Functionality)

The `src/pages/Schedule.jsx` page provides full Create, Read, Update, and Delete (CRUD) functionality for class schedules. The form for adding and editing schedules includes a dropdown to select teachers.

### 8. Dashboard

The `src/pages/Dashboard.jsx` page displays summary statistics, including the total number of students, teachers, and classes.

## Next Steps

*   **Further Dashboard Enhancements:** The dashboard could be further improved with more detailed charts and graphs.
*   **Fine-Grained Permissions:** Implement role-based access control (e.g., distinguishing between admin, teacher, and student roles).
*   **Real-time Updates:** Utilize Firebase's real-time capabilities to update data across the application without requiring a page reload.
