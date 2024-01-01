# Node.js Movie Notes App

## Overview

This Node.js application allows users to manage movie notes by creating, updating, and deleting movies along with associated tags. Users can register, login, and perform CRUD operations on movies and tags.

## Database Schema

### Users Table

- `id`: User ID (Primary Key)
- `name`: User's Name
- `email`: User's Email
- `password`: Encrypted Password
- `avatar`: User's Avatar Image URL
- `created_at`: Creation Date
- `updated_at`: Last Update Date

### Movie Notes Table

- `id`: Movie Note ID (Primary Key)
- `title`: Movie Title
- `description`: Movie Description
- `rating`: User's Rating (1 to 5)
- `user_id`: User ID (Foreign Key referencing Users Table)
- `created_at`: Creation Date
- `updated_at`: Last Update Date

### Movie Tags Table

- `id`: Tag ID (Primary Key)
- `name`: Tag Name (e.g., action, comedy, horror)
- `note_id`: Movie Note ID (Foreign Key referencing Movie Notes Table)
- `user_id`: User ID (Foreign Key referencing Users Table)
- `created_at`: Creation Date
- `updated_at`: Last Update Date

## Features

- User registration and login
- Movie CRUD operations
- Tag creation and association with movies
- Password encryption for user security
- Email validation
- Cascade deletion to ensure tags are deleted when a related movie note is deleted

## Getting Started

1. Clone the repository: `https://github.com/Pedro-HFelix/movie-backEnd.git`
2. Install dependencies: `npm install`
4. Run the application: `npm start`

## Technologies Used

- Node.js
- Express.js
- Knex.js
- SQLite 
- Bcrypt.js for password encryption
