# Journeyman

Journeyman is a project management application, built using React with Firebase Authentication and Firestore Database.

[https://journeyman-f849b.web.app/](https://journeyman-f849b.web.app/)
 
## The App

The application uses React Router with layers of context providers to provide state management. The app layer provides app-wide controls for the application dark mode setting, whilst the data layer provides the application data. An auth layer supports user authentication and access control. The forms in the application are built using React Hook Form - most configured to send data on submit, except for the Objective form which will send on change.

## Features

Features of the app include:

- **Firestore Database** - Data is stored as collections of documents in the no-SQL Firestore Database. 
- **Optimistic rendering** - Updates to the application data are sent to the server and updated in client state in parallel.
- **Objective update on change** - Changes to fields in an Objective will be registered instantly.
- **Authentication** - User account management is handled by Firebase Authentication with the option to sign in with Google.
- **Dark Mode Toggle** - Users can toggle the Dark Mode theme of the application with the click of a button.
