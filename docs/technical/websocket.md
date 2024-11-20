# Real-time Communication Documentation

## Overview
Rorny uses Firebase Realtime Database for real-time features such as messaging, notifications, and presence updates.

## Setup

### Initialization
```typescript
import { getDatabase, ref, onValue, set } from "firebase/database";

const db = getDatabase();
```

### Authentication
Authentication is handled automatically by Firebase SDK when you initialize the app with Firebase config.

## Data Structure

### Messages
```typescript
interface Message {
  id: string
  senderId: string
  conversationId: string
  content: string
  timestamp: number
  media?: {
    type: string
    url: string
  }[]
}

// Database structure
/messages/{conversationId}/{messageId}
```

### Notifications
```typescript
interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'mention'
  actorId: string
  targetId: string
  content: string
  timestamp: number
}

// Database structure
/notifications/{userId}/{notificationId}
```

### Presence
```typescript
interface Presence {
  status: 'online' | 'offline' | 'away'
  lastActive: number
  deviceInfo?: {
    platform: string
    lastSeen: number
  }
}

// Database structure
/status/{userId}
```

## Usage Examples

### Message Handling
```typescript
// Listen for new messages
const messagesRef = ref(db, `messages/${conversationId}`);
onValue(messagesRef, (snapshot) => {
  const messages = snapshot.val();
  handleNewMessages(messages);
});

// Send a message
const newMessageRef = ref(db, `messages/${conversationId}/${newMessageId}`);
await set(newMessageRef, {
  senderId: currentUserId,
  content: messageText,
  timestamp: serverTimestamp()
});
```

### Notification Handling
```typescript
// Listen for notifications
const notificationsRef = ref(db, `notifications/${userId}`);
onValue(notificationsRef, (snapshot) => {
  const notifications = snapshot.val();
  handleNotifications(notifications);
});
```

### Presence Management
```typescript
import { getDatabase, ref, onDisconnect, set, serverTimestamp } from "firebase/database";

// Set up presence system
const userStatusRef = ref(db, `status/${userId}`);

// When app loads
set(userStatusRef, {
  status: 'online',
  lastActive: serverTimestamp()
});

// When user disconnects
onDisconnect(userStatusRef).set({
  status: 'offline',
  lastActive: serverTimestamp()
});
```

## Error Handling

### Connection State
```typescript
import { getDatabase, ref, onValue } from "firebase/database";

const connectedRef = ref(db, ".info/connected");
onValue(connectedRef, (snap) => {
  if (snap.val() === true) {
    console.log("connected");
  } else {
    console.log("disconnected");
  }
});
```

### Error Recovery
```typescript
const dbRef = ref(db, 'path/to/data');
onValue(dbRef, (snapshot) => {
  // Handle data
}, (error) => {
  console.error('Data sync error:', error);
  // Implement retry logic if needed
});
```

## Best Practices

1. **Data Structure**
   - Keep data shallow
   - Index for performance
   - Use appropriate data types

2. **Security Rules**
   ```javascript
   {
     "rules": {
       "messages": {
         "$conversationId": {
           ".read": "auth !== null && root.child('conversations').child($conversationId).child('participants').child(auth.uid).exists()",
           ".write": "auth !== null && root.child('conversations').child($conversationId).child('participants').child(auth.uid).exists()"
         }
       },
       "status": {
         "$uid": {
           ".read": "auth !== null",
           ".write": "auth !== null && auth.uid === $uid"
         }
       }
     }
   }
   ```

3. **Performance**
   - Use shallow queries
   - Implement pagination
   - Cache data locally
   - Handle offline scenarios

4. **Data Sync**
   - Use `onValue` for real-time sync
   - Use `once` for one-time reads
   - Implement proper cleanup

## Related Documentation
- [API Reference](./api-reference.md)
- [Firebase Schema](../schemas/database-schema.md)
- [Deployment Guide](./deployment.md)
