# Authentication & Authorization Setup Guide

This project now includes full authentication and authorization with Role-Based Access Control (RBAC).

## Features

- ✅ Email/Password authentication
- ✅ OAuth (Google & GitHub)
- ✅ Role-Based Access Control (RBAC)
- ✅ Protected routes
- ✅ Admin panel for user management
- ✅ User profile pages

## Setup Instructions

### 1. Install Dependencies

First, install the required packages:

```bash
npm install firebase react-router-dom
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to **Authentication** > **Sign-in method**
   - Enable **Email/Password**
   - Enable **Google** (add your OAuth client ID)
   - Enable **GitHub** (add your OAuth client ID)
4. Create a Firestore Database:
   - Go to **Firestore Database**
   - Click **Create database**
   - Start in **test mode** (or set up security rules)
5. Get your Firebase config:
   - Go to **Project Settings** > **General**
   - Scroll to **Your apps** section
   - Click the web icon (</>) to add a web app
   - Copy the Firebase configuration object

### 3. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration values in `.env`:
   ```
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   ```

### 4. Firestore Security Rules

Update your Firestore security rules to allow authenticated users to read their own data and admins to manage users:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Users can read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      // Only admins can write
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 5. OAuth Setup

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - Your production domain
6. Add the Client ID to Firebase Authentication > Sign-in method > Google

#### GitHub OAuth:
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL:
   - `http://localhost:5173` (for development)
   - Your production domain
4. Add the Client ID and Client Secret to Firebase Authentication > Sign-in method > GitHub

## Role System

The system uses three roles:

- **user** (default): Basic authenticated user
- **moderator**: Can perform moderate actions
- **admin**: Full access, can manage users and roles

### Making a User Admin

To make a user an admin, you can:

1. Use the Admin Panel (if you're already an admin)
2. Manually update in Firestore:
   - Go to Firestore Database
   - Find the user document in the `users` collection
   - Update the `role` field to `admin`

## Usage

### Protected Routes

Use the `ProtectedRoute` component to protect routes:

```jsx
import ProtectedRoute from './components/ProtectedRoute'

<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>
```

### Using Auth Context

Access authentication state anywhere:

```jsx
import { useAuth } from './contexts/AuthContext'

function MyComponent() {
  const { currentUser, userRole, hasRole, logout } = useAuth()
  
  if (hasRole('admin')) {
    // Admin-only content
  }
}
```

### Available Routes

- `/` - Home page (public)
- `/login` - Login page
- `/signup` - Sign up page
- `/profile` - User profile (protected)
- `/admin` - Admin panel (admin only)

## Components

- `Login` - Login form with email/password and OAuth
- `Signup` - Sign up form with email/password and OAuth
- `UserMenu` - User dropdown menu in navigation
- `ProtectedRoute` - Route protection component
- `AdminPanel` - Admin user management interface
- `Profile` - User profile page

## Troubleshooting

### Firebase not initialized
- Check that your `.env` file has all required variables
- Make sure variable names start with `VITE_`
- Restart your dev server after changing `.env`

### OAuth not working
- Verify OAuth credentials are set in Firebase Console
- Check redirect URIs match your domain
- Ensure OAuth providers are enabled in Firebase

### Permission denied errors
- Check Firestore security rules
- Verify user has the correct role
- Check that user document exists in Firestore

## Security Notes

- Never commit `.env` file to version control
- Use proper Firestore security rules in production
- Implement rate limiting for authentication endpoints
- Consider adding email verification
- Add password strength requirements
- Implement account lockout after failed attempts


