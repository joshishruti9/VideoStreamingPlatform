# YouTube Redesign (CPSC 5200)

## Overview
This project is a full-stack YouTube-like platform built using Node.js, Express, MySQL, and React. It provides a backend with RESTful APIs for video uploading, streaming, authentication via Google OAuth, and user management, along with a React frontend for user interaction.

## Features
### Backend
- Google OAuth authentication
- Video upload functionality with Multer
- Video storage and retrieval from MySQL
- User data storage and retrieval from MySQL
- User authentication and session management
- Video streaming API

### Frontend
- Home page displaying all videos by name with description
- User authentication with Google OAuth
- Video upload functionality
- Search functionality to filter videos
- Video watch page with streaming capabilities

## Technologies Used
### Backend
- Node.js
- Express.js
- MySQL
- Passport.js (Google OAuth)
- Multer (for file uploads)
- Express-session
- dotenv (for environment variables)
- cors (for handling cross-origin requests)
- mysql2 (for database queries)

### Frontend
- React.js
- React Router
- Axios (for API communication)
- Bootstrap/CSS (for styling)
- Lucide-react (for icons)

## Setup Instructions
### Prerequisites
- Node.js installed
- MySQL database setup
- Google OAuth credentials (Client ID and Secret)

### Backend Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Update the `.env` file in the backend folder and fill in the corresponding fields:
   ```env
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   GOOGLE_CALLBACK_URL=<your-google-callback-url>
   SESSION_SECRET=<your-session-secret>
   ```
4. Set up MySQL database:
   ```sql
   CREATE DATABASE IF NOT EXISTS youtube_app;

   USE youtube_app;

   SET GLOBAL max_allowed_packet = 524288000; -- 100MB

   CREATE TABLE videos_data (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       uploader VARCHAR(255),
       user_id INT,  -- Foreign key to users(id)
       description TEXT NOT NULL,
       video_data LONGBLOB NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(id)  -- Maintain relationship via user_id
   );

   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       provider VARCHAR(50) NOT NULL, -- e.g., 'google', 'facebook'
       provider_id VARCHAR(255) NOT NULL, -- e.g., Google ID, Facebook ID
       name VARCHAR(255),
       email VARCHAR(255),
       profile_pic VARCHAR(255),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       UNIQUE (provider, provider_id) -- Ensure unique combination of provider and provider_id
   );
   ```
   Update `database.js` with your MySQL credentials.

5. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Installation
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication Routes
- `GET /auth/google` - Initiates Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/logout` - Logs out the user
- `GET /auth/user` - Retrieves authenticated user session

### Video Routes
- `POST /videos/upload` - Uploads a new video (authenticated users only)
- `GET /videos/` - Retrieves all videos
- `GET /videos/:id` - Retrieves specific video details
- `GET /videos/stream/:id` - Streams video by ID
