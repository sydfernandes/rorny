# API Reference

## Overview
This document provides detailed information about Rorny's API endpoints, request/response formats, and authentication requirements.

## Authentication
All API endpoints require Firebase authentication unless explicitly marked as public.

### Authentication Headers
```typescript
{
  'Authorization': 'Bearer ${firebaseIdToken}'
}
```

## API Endpoints

### Auth API

#### POST /api/auth/login
Firebase Authentication endpoint.

**Request Body:**
```typescript
{
  email: string
  password: string
}
```

**Response:**
```typescript
{
  user: {
    uid: string
    email: string
    displayName: string
    photoURL?: string
  }
  token: string
}
```

[See Auth Flow Documentation](./auth-flow.md) for more details.

### User API

#### GET /api/users/:id
Retrieve user profile information from Firestore.

**Response:**
```typescript
{
  uid: string
  displayName: string
  bio: string
  photoURL: string
  interests: string[]
  createdAt: Timestamp
}
```

### Messages API

#### GET /api/messages
Retrieve user messages from Firestore.

**Query Parameters:**
```typescript
{
  unread?: boolean
  limit?: number
  startAfter?: string // Firestore document ID for pagination
}
```

[See Full API Documentation](../schemas/SCHEMA.md#route-structure) for more endpoints.

## Error Handling

### Error Response Format
```typescript
{
  error: {
    code: string
    message: string
    details?: any
  }
}
```

### Common Error Codes
- `auth/user-not-found`: User not found in Firebase Auth
- `auth/wrong-password`: Invalid login credentials
- `permission-denied`: Firestore permission denied
- `not-found`: Document not found in Firestore
- `invalid-argument`: Invalid input data

## Rate Limiting
API requests are subject to Firebase's default rate limiting. See [Rate Limiting Documentation](./rate-limiting.md) for details.

## WebSocket API
Real-time features use Firebase Realtime Database.

### Connection
```typescript
import { getDatabase, ref, onValue } from "firebase/database";

const db = getDatabase();
const presenceRef = ref(db, 'status/' + uid);
```

### Event Types
- `message`: New message received
- `notification`: New notification
- `presence`: User presence update

[See WebSocket Documentation](./websocket.md) for more details.
