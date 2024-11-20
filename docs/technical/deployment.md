# Deployment Guide

## Overview
This guide covers the deployment process for Rorny, including environment setup, build process, and deployment strategies.

## Prerequisites
- Node.js 16+
- Firebase account
- AWS Account (for media storage)

## Environment Setup

### Environment Variables
```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
FIREBASE_ADMIN_PRIVATE_KEY=your-private-key
FIREBASE_ADMIN_CLIENT_EMAIL=your-client-email

# AWS (for additional media storage if needed)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-west-2
S3_BUCKET=rorny-media

# App
NEXT_PUBLIC_API_URL=https://api.rorny.com
NEXT_PUBLIC_WS_URL=wss://api.rorny.com/ws
```

## Build Process

### Production Build
```bash
# Install dependencies
npm install

# Build Next.js application
npm run build
```

## Deployment Options

### Docker Deployment

#### Dockerfile
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env

volumes:
  firebase_data:
```

### Cloud Deployment

#### Firebase Hosting
1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase:
```bash
firebase login
firebase init hosting
```

3. Deploy:
```bash
firebase deploy
```

#### Vercel
1. Connect GitHub repository
2. Configure environment variables
3. Deploy:
```bash
vercel
```

## Firebase Configuration

### Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
                   && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Firebase Functions
```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  await admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
```

## Monitoring

### Health Checks
- `/api/health`: Basic health check
- `/api/health/firebase`: Firebase connection check

### Logging
```typescript
// Configure logging with Firebase
import { getAnalytics } from "firebase/analytics";

const analytics = getAnalytics(app);

// Log events
analytics.logEvent('page_view', {
  page_title: 'Home',
  page_location: '/',
});
```

## Security Considerations

1. **SSL/TLS**
   - Enable HTTPS
   - Configure SSL certificates
   - Set secure headers

2. **Rate Limiting**
   - Configure API rate limits
   - Implement DDoS protection

3. **Environment Variables**
   - Use secrets management
   - Rotate credentials regularly

4. **Firebase Security**
   - Implement proper security rules
   - Use Firebase Authentication
   - Enable email verification
   - Set up proper IAM roles

## Scaling Strategies

1. **Firebase Scaling**
   - Use Firebase Cloud Functions
   - Implement proper indexing
   - Use Firebase Cloud Storage
   - Enable Firebase Performance Monitoring

2. **Caching**
   - Firebase caching
   - CDN for static assets
   - Browser caching
   - Implement offline persistence

## Related Documentation
- [API Reference](./api-reference.md)
- [Rate Limiting](./rate-limiting.md)
- [Firebase Schema](../schemas/database-schema.md)
