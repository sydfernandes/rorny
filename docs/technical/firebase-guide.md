# Firebase Implementation Guide

## Overview
This guide covers the implementation details of Firebase services in Rorny, including Authentication, Firestore, Realtime Database, and Cloud Functions.

## Firebase Services Used

### Authentication
- Email/Password authentication
- Social authentication (Google, Facebook, Twitter)
- Custom claims for user roles
- Email verification
- Password reset flow

### Cloud Firestore
- Main database for user data
- Profile information
- Posts and comments
- User relationships
- Settings and preferences

### Realtime Database
- Real-time features
- Chat messages
- Notifications
- User presence
- Live updates

### Cloud Storage
- User media uploads
- Profile pictures
- Post attachments
- Story media

### Cloud Functions
- User triggers
- Notification processing
- Data aggregation
- Cleanup tasks

## Implementation Details

### Authentication Setup
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth state observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
  } else {
    // User is signed out
  }
});
```

### Firestore Data Structure
```typescript
// Users Collection
interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  following: string[];
  followers: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Posts Collection
interface Post {
  id: string;
  authorId: string;
  content: string;
  media?: {
    type: string;
    url: string;
  }[];
  likes: number;
  comments: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Comments Collection
interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  likes: number;
  createdAt: Timestamp;
}
```

### Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isPublic(doc) {
      return doc.data.visibility == 'public';
    }

    // User profiles
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);
      
      // Following collection
      match /following/{followedId} {
        allow read: if isAuthenticated();
        allow write: if isOwner(userId);
      }
    }

    // Posts
    match /posts/{postId} {
      allow read: if isAuthenticated() && (isPublic(resource) || isOwner(resource.data.authorId));
      allow create: if isAuthenticated();
      allow update, delete: if isOwner(resource.data.authorId);
      
      // Comments
      match /comments/{commentId} {
        allow read: if isAuthenticated();
        allow create: if isAuthenticated();
        allow update, delete: if isOwner(resource.data.authorId);
      }
    }
  }
}
```

### Cloud Functions
```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// User creation hook
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  // Create user profile
  await admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
});

// Post notification
export const onNewPost = functions.firestore
  .document('posts/{postId}')
  .onCreate(async (snap, context) => {
    const post = snap.data();
    const authorId = post.authorId;
    
    // Get author's followers
    const followersSnapshot = await admin.firestore()
      .collection('users')
      .doc(authorId)
      .collection('followers')
      .get();
      
    // Create notifications
    const notifications = followersSnapshot.docs.map(doc => ({
      userId: doc.id,
      type: 'new_post',
      actorId: authorId,
      postId: context.params.postId,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }));
    
    // Batch write notifications
    const batch = admin.firestore().batch();
    notifications.forEach(notification => {
      const ref = admin.firestore().collection('notifications').doc();
      batch.set(ref, notification);
    });
    
    await batch.commit();
});
```

### Performance Optimization

1. **Firestore Indexing**
```javascript
{
  "indexes": [
    {
      "collectionGroup": "posts",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "authorId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

2. **Data Denormalization**
```typescript
// Store frequently accessed data in parent documents
interface Post {
  id: string;
  authorId: string;
  authorName: string;  // Denormalized
  authorPhoto: string; // Denormalized
  content: string;
  // ...
}
```

3. **Batch Operations**
```typescript
const batch = db.batch();

// Add multiple operations
posts.forEach(post => {
  const ref = db.collection('posts').doc();
  batch.set(ref, post);
});

// Commit as single transaction
await batch.commit();
```

### Offline Support
```typescript
// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab
  } else if (err.code == 'unimplemented') {
    // Browser doesn't support persistence
  }
});

// Configure cache size
const settings = {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
};
db.settings(settings);
```

## Best Practices

1. **Security**
   - Always use security rules
   - Implement proper authentication
   - Use custom claims for roles
   - Validate data on server-side

2. **Performance**
   - Use appropriate indexes
   - Implement pagination
   - Denormalize when necessary
   - Batch operations
   - Enable offline persistence

3. **Cost Optimization**
   - Monitor usage
   - Implement caching
   - Use appropriate security rules
   - Optimize queries

4. **Data Structure**
   - Keep documents small
   - Use subcollections
   - Plan for scaling
   - Consider query patterns

## Related Documentation
- [Deployment Guide](./deployment.md)
- [API Reference](./api-reference.md)
- [Real-time Communication](./websocket.md)
