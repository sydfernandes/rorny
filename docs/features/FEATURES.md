# Rorny Application Features

## Table of Contents

1. [Authentication Features](#authentication-features)
2. [Home Features](#home-features)
3. [Profile Features](#profile-features)
4. [Messages Features](#messages-features)
5. [Groups Features](#groups-features)
6. [Media Features](#media-features)
7. [Search Features](#search-features)
8. [Notifications Features](#notifications-features)
9. [Settings Features](#settings-features)
10. [Safety Features](#safety-features)
11. [Explore Features](#explore-features)
12. [Stories Features](#stories-features)
13. [Ads Features](#ads-features)
14. [Help Features](#help-features)

## Feature Details

### Authentication Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Login                      | /auth/login                          | User login page to authenticate existing users                   |
| Register                   | /auth/register                       | User registration page for new users                            |
| Reset Password             | /auth/reset-password.action          | Page to reset forgotten passwords                               |
| Verify Email               | /auth/verify-email.action            | Page to verify user email after registration                    |

### Home Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Feed                       | /home/feed                           | Main feed page displaying recent posts                          |
| Feed Latest                | /home/feed/latest                    | Latest posts in the feed                                        |
| Feed Favorites             | /home/feed/favorites                 | Favorite posts in the feed                                      |
| Trending                   | /home/trending                       | Page displaying trending content                                |
| Nearby                     | /home/nearby                         | Section for nearby users and groups                             |
| Nearby Users               | /home/nearby/users                   | List of nearby users                                            |
| Nearby Groups              | /home/nearby/groups                  | List of nearby groups                                           |

### Profile Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| View Profile               | /profile/view/{userId}               | Page to view user profiles                                      |
| Edit Bio                   | /profile/edit/bio.action             | Form to edit user bio information                               |
| Edit Interests             | /profile/edit/interests.action       | Form to edit user interests                                     |
| Edit Preferences           | /profile/edit/preferences.action     | Form to edit user preferences                                   |
| Photos Upload              | /profile/photos/upload.action        | Page to upload new photos                                       |
| Photos Edit                | /profile/photos/{photoId}/edit.action| Form to edit a specific photo                                   |
| Settings Privacy           | /profile/settings/privacy            | Section for privacy settings                                    |
| Privacy Visibility         | /profile/settings/privacy.visibility.action| Form to set visibility preferences                        |

[Additional profile features continue...]

### Messages Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Inbox                      | /messages/inbox                      | Main inbox page for messages                                    |
| Inbox Unread               | /messages/inbox.unread.action        | List of unread messages                                         |
| Inbox Archived             | /messages/inbox.archived.action      | List of archived messages                                       |
| Conversation Media         | /messages/{conversationId}/media     | Section for conversation media items                            |
| Conversation Details       | /messages/{conversationId}/details   | Section for conversation details and settings                   |

[Additional messages features continue...]

### Groups Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Explore Groups             | /groups/explore                      | Page to explore and join groups                                 |
| Create Group               | /groups/create.action                | Form to create a new group                                      |
| Group Overview             | /groups/{groupId}/overview           | Page with an overview of the group                              |
| Group Members              | /groups/{groupId}/members            | Section for managing group members                              |
| Group Chat                 | /groups/{groupId}/chat               | Chat interface for group conversations                          |

[Additional groups features continue...]

### Media Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Media Upload               | /media/upload.action                 | Page to upload new media items                                  |
| Explore Media              | /media/explore                       | Page to explore and discover media items                        |
| Media Item                 | /media/{mediaId}                     | Page to view a specific media item                              |
| Like Media                 | /media/{mediaId}/like.action         | Action to like a media item                                     |
| Comment on Media           | /media/{mediaId}/comment.action      | Form to comment on a media item                                 |

[Additional media features continue...]

### Search Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Search Users               | /search/users                        | Page to search for users                                        |
| Search Groups              | /search/groups                       | Page to search for groups                                       |
| Search Media               | /search/media                        | Page to search for media items                                  |
| Recommended Users          | /search/users.recommended.action     | List of recommended users                                       |
| Popular Media              | /search/media.popular.action         | List of popular media items                                     |

[Additional search features continue...]

### Notifications Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Unread Notifications       | /notifications/unread                | Page to view unread notifications                               |
| All Notifications          | /notifications/all                   | Page to view all notifications                                  |
| Notification Settings      | /notifications/settings              | Section for managing notification settings                      |
| Email Notifications        | /notifications/settings.email.action | Form to manage email notifications                              |

[Additional notifications features continue...]

### Settings Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Privacy Settings           | /settings/privacy                    | Section for managing privacy settings                           |
| Account Settings           | /settings/account                    | Section for managing account settings                           |
| Notifications Settings     | /settings/notifications              | Section for managing notification settings                      |
| Language Settings          | /settings/account.language.action    | Form to set preferred language                                  |

[Additional settings features continue...]

### Safety Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Blocklist                  | /safety/blocklist.action             | List and manage blocked users for safety purposes               |
| Report Content             | /safety/report.action                | Form to report suspicious or harmful content                    |
| Safety Resources           | /safety/resources                    | Page with resources related to safety guidelines                |
| Verification               | /safety/verification.action          | Action to verify user identity for safety purposes              |

### Explore Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Explore People             | /explore/people                      | Page to explore and connect with people                         |
| Explore Groups             | /explore/groups                      | Page to explore and join groups                                 |
| Explore Media              | /explore/media                       | Page to explore and discover media items                        |
| Nearby People              | /explore.people.nearby.action        | List of nearby people based on location                         |

### Stories Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Create Story               | /stories/create.action               | Form to create a new story                                      |
| View Story                 | /stories/{storyId}                   | Page to view a specific story                                   |
| Like Story                 | /stories/{storyId}/like.action       | Action to like a story                                         |
| Comment on Story           | /stories/{storyId}/comment.action    | Form to comment on a story                                      |

### Ads Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| Ad Policies                | /ads/policies                        | Page with policies related to advertisements                    |
| Ad Feedback                | /ads/feedback.action                 | Form to provide feedback on ads                                 |
| Viewed Ads                 | /ads/viewed.action                   | List of viewed ads                                             |
| Recommended Ads            | /ads/recommendations.action          | Recommendations for relevant ads                                |

### Help Features

| Feature                    | Path                                  | Description                                                     |
|---------------------------|---------------------------------------|-----------------------------------------------------------------|
| FAQ                        | /help/faq                            | Page with frequently asked questions and answers                |
| Contact Support            | /help/contact                        | Form to contact customer support                                |
| Terms of Service           | /help/terms                          | Page with terms of service                                      |
| Privacy Policy             | /help/privacy                        | Page with privacy policy                                        |
| Community Guidelines       | /help/community-guidelines           | Page with community guidelines and rules                        |
