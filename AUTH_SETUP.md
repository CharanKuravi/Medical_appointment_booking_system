# Authentication Setup

## Overview
MedLink now uses **local JWT-based authentication** with SQLite database. Firebase has been removed.

## How It Works

### Backend (Server)
- **Database**: SQLite stores user credentials
- **Password Security**: Passwords are hashed using bcryptjs
- **Authentication**: JWT tokens for session management
- **Token Expiry**: 7 days

### Frontend (Client)
- **Login/Register**: Simple email/password forms
- **Token Storage**: JWT stored in localStorage
- **Auto-login**: Token persists across sessions

## Quick Start

### 1. Start the Server
```bash
cd server
npm install
npm start
```

### 2. Start the Client
```bash
cd client
npm install
npm run dev
```

### 3. Create an Account
- Go to http://localhost:5173
- Click "Sign Up"
- Enter your details (name, email, password)
- Choose role (Patient or Doctor)

### 4. Login
- Use your email and password
- Token is automatically saved
- Redirects to dashboard based on role

## API Endpoints

### Register
```
POST /api/auth/register
Body: { name, email, password, phone?, role? }
```

### Login
```
POST /api/auth/login
Body: { email, password }
```

### Get Current User
```
GET /api/auth/me
Headers: { Authorization: "Bearer <token>" }
```

## Environment Variables

### Server (.env)
```
PORT=5000
JWT_SECRET=your-super-secret-key-change-this
```

## Security Notes
- Change JWT_SECRET in production
- Passwords are hashed with bcrypt (10 rounds)
- Tokens expire after 7 days
- HTTPS recommended for production
