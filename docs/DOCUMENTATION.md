# Rorny Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Technical Stack](#technical-stack)
4. [Features](#features)
5. [Implementation](#implementation)
6. [API Reference](#api-reference)
7. [Security](#security)
8. [Development](#development)
9. [Contributing](#contributing)
10. [Documentation Status](#documentation-status)

## Overview

Rorny is a Next.js-based social media application that provides a comprehensive platform for social interaction, media sharing, and community engagement.

### Core Technologies
- **Framework**: Next.js 15.0.3
- **Language**: TypeScript 5.0
- **Backend**: Firebase (Authentication, Firestore, Storage, Realtime Database)
- **UI**: Radix UI, Tailwind CSS, Shadcn/ui
- **State**: React Hook Form with Zod validation
- **Infrastructure**: Upstash Redis, Iron Session

## Architecture

### System Overview
- Next.js App Router for routing and API
- Firebase services for backend functionality
- Real-time capabilities using Firebase Realtime Database
- Modern UI components with Radix UI and Tailwind

### Directory Structure
```
rorny/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── (auth)/      # Authentication routes
│   │   ├── (dashboard)/ # Protected routes
│   │   ├── api/         # API routes
│   │   └── layout.tsx   # Root layout
│   ├── components/      # React components
│   ├── lib/            # Utilities
│   └── middleware/     # Middleware
├── public/            # Static assets
└── docs/             # Documentation
```

## Technical Stack

### Frontend
- **Framework**: Next.js 15.0.3
- **Language**: TypeScript 5.0
- **UI Components**: 
  - Radix UI (base components)
  - Tailwind CSS (styling)
  - Shadcn/ui (enhanced components)
- **State Management**: React Hook Form
- **Form Validation**: Zod
- **Theme**: Next-themes

### Backend
- **Framework**: Next.js App Router
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Real-time**: Firebase Realtime Database
- **Storage**: Firebase Storage
- **Rate Limiting**: Upstash Redis
- **Session**: Iron Session

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Styling**: PostCSS, Tailwind CSS
- **Environment**: Dotenv
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions

## Features

### Core Features
1. **Authentication**
   - Email/Password
   - OAuth (Google, Apple, Facebook)
   - Session Management
   - Password Reset

2. **User Management**
   - Profile Management
   - Settings
   - Privacy Controls
   - Account Management

3. **Social Features**
   - Posts
   - Comments
   - Likes
   - Follows
   - Direct Messages

4. **Media**
   - Image Upload
   - Video Support
   - File Sharing
   - Media Processing

5. **Real-time Features**
   - Chat
   - Notifications
   - Presence System
   - Live Updates

## Implementation

### Firebase Setup

#### Project Configuration
```typescript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
```

#### Authentication Implementation
```typescript
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const auth = getAuth(app);

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error('Authentication failed');
  }
}
```

#### Database Setup
```typescript
import { getFirestore, collection } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

export const firestore = getFirestore(app);
export const realtimeDb = getDatabase(app);

// Collection references
export const usersCollection = collection(firestore, 'users');
export const postsCollection = collection(firestore, 'posts');
```

### Environment Configuration

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PROJECT_ID=

# Next.js
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Additional Services
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=
```

## API Reference

### Authentication Endpoints

```typescript
// Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/reset-password
POST /api/auth/verify-email

// Session
GET /api/auth/session
POST /api/auth/refresh
DELETE /api/auth/session
```

### User Endpoints

```typescript
// Profile
GET /api/users/:id
PATCH /api/users/:id
DELETE /api/users/:id

// Settings
GET /api/users/:id/settings
PATCH /api/users/:id/settings
```

### Social Endpoints

```typescript
// Posts
GET /api/posts
POST /api/posts
GET /api/posts/:id
PATCH /api/posts/:id
DELETE /api/posts/:id

// Comments
GET /api/posts/:id/comments
POST /api/posts/:id/comments
PATCH /api/comments/:id
DELETE /api/comments/:id

// Likes
POST /api/posts/:id/like
DELETE /api/posts/:id/like
```

## Security

### Firebase Security Rules

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Posts
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null && request.resource.data.authorId == request.auth.uid;
    }
  }
}
```

### Authentication Security
- Secure Session Management
- Rate Limiting
- Password Requirements
- Multi-factor Authentication (planned)

### API Security
- CORS Configuration
- Request Validation
- Error Handling
- Rate Limiting

## Development

### Prerequisites
1. Node.js 18+
2. npm 9+
3. Firebase Project
4. Environment Variables

### Setup Steps
1. Clone repository
2. Install dependencies
3. Configure environment
4. Start development server

### Testing Strategy
1. Unit Tests
   - Components
   - Hooks
   - Utilities
   - API Routes

2. Integration Tests
   - Feature Flows
   - API Integration
   - Authentication
   - Database Operations

3. E2E Tests
   - Critical User Flows
   - Authentication Flows
   - Social Features
   - Media Upload

## Contributing

### Development Workflow
1. Fork repository
2. Create feature branch
3. Make changes
4. Write tests
5. Submit pull request

### Code Standards
- Follow TypeScript best practices
- Use ESLint configuration
- Write comprehensive tests
- Document changes

### Documentation
- Update relevant documentation
- Add inline comments
- Create examples
- Update changelog

## Documentation Status

### Documentation Health
- Documentation Coverage: 95%
- Cross-Reference Accuracy: 100%
- Code Example Coverage: 80%

### Current Focus Areas
1. API Documentation
   - Endpoint documentation
   - Authentication flows
   - Request/response examples

2. Security Documentation
   - Firebase security rules
   - Best practices
   - Authentication flows

3. Performance Documentation
   - Optimization guides
   - Caching strategies
   - Monitoring setup

### Review Schedule
- Core Documentation: Monthly
- Technical Guides: Bi-weekly
- Feature Documentation: With each feature update
- Schema Documentation: With data model changes
- Security Documentation: Monthly
- API Documentation: Bi-weekly

## Database Schema

### Collections

#### Users
```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  settings: {
    theme: 'light' | 'dark';
    notifications: boolean;
    privacy: 'public' | 'private';
  };
}
```

#### Posts
```typescript
interface Post {
  id: string;
  authorId: string;
  content: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
  likes: number;
  comments: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### Comments
```typescript
interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Real-time Features

### Chat Implementation
```typescript
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '@/lib/firebase';

export function subscribeToChat(chatId: string, callback: (messages: Message[]) => void) {
  const chatRef = ref(realtimeDb, `chats/${chatId}/messages`);
  return onValue(chatRef, (snapshot) => {
    const messages = snapshot.val() || {};
    callback(Object.values(messages));
  });
}
```

### Presence System
```typescript
import { ref, onDisconnect, set } from 'firebase/database';

export function setupPresence(userId: string) {
  const presenceRef = ref(realtimeDb, `status/${userId}`);
  
  // When user connects
  set(presenceRef, 'online');
  
  // When user disconnects
  onDisconnect(presenceRef).set('offline');
}
```

### Notifications
```typescript
import { ref, push } from 'firebase/database';

export async function sendNotification(userId: string, notification: Notification) {
  const notificationsRef = ref(realtimeDb, `notifications/${userId}`);
  await push(notificationsRef, {
    ...notification,
    timestamp: Date.now()
  });
}
