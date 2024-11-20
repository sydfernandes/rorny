# Profile Management User Journey

## Overview
This document outlines the user journey for profile management in the Rorny application, including profile viewing, editing, and photo management capabilities.

## Journey Flow
```
+-------------------+
|   View Profile    |
+---------+---------+
          |
          v
+---------+---------+
|   Edit Bio        |
+---------+---------+
          |
          v
+---------+---------+
| Edit Interests    |
+---------+---------+
          |
          v
+---------+---------+
| Edit Preferences  |
+---------+---------+
          |
          v
+---------+---------+
| Photos Upload     |
+---------+---------+
          |
          v
+---------+---------+
| Photos Edit       |
+---------+---------+
          |
          v
+---------+---------+
| Photos Delete     |
+---------+---------+
```

## Journey Steps

### 1. View Profile
- User accesses their profile page
- System displays current profile information:
  - Profile picture
  - Bio
  - Interests
  - Preferences
  - Photo gallery

### 2. Edit Bio
- User selects edit bio option
- System provides editable bio field
- User updates bio information
- System saves changes
- Profile updates in real-time

### 3. Edit Interests
- User accesses interests section
- System displays current interests
- User can add/remove interests
- System updates interest tags
- Changes reflect immediately

### 4. Edit Preferences
- User accesses preference settings
- System shows current preferences
- User modifies preferences:
  - Privacy settings
  - Notification preferences
  - Account settings
- System saves preference updates

### 5. Photo Management
#### Upload Photos
- User initiates photo upload
- System presents upload interface
- User selects photos
- System processes and stores photos
- Photos appear in gallery

#### Edit Photos
- User selects photo to edit
- System provides editing options:
  - Captions
  - Tags
  - Order/arrangement
- User makes desired changes
- System saves edits

#### Delete Photos
- User selects photos to delete
- System requests confirmation
- User confirms deletion
- System removes photos
- Gallery updates automatically

## Expected Outcomes
- Successfully updated profile information
- Properly managed photo gallery
- Accurately reflected interests and preferences
- Maintained profile privacy settings

## Error Scenarios
- Failed photo uploads (size/format issues)
- Storage limit reached
- Invalid input formats
- Connection issues during updates
- Unsupported file types
