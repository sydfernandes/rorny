# User Profile Structure (Ad-Supported, Free App)

## Personal Information
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| displayName         | string     | Public name or alias (0-500 characters).                 |
| username            | string     | Unique username (Instagram, Tinder).                     |
| bio                 | string     | Bio/about me (up to 255 characters or more).             |
| email               | string     | The user's email address.                               |
| emailVerified       | boolean    | Whether the user's email is verified.                    |
| birthdate           | timestamp  | User’s birthdate (for age calculation).                  |
| gender              | string     | Gender identity (58+ options for Tinder).                |
| pronouns            | string     | User’s preferred pronouns.                               |
| location            | string     | The user's location (city, region).                      |
| ethnicity           | string     | User's ethnicity (optional for some apps).               |
| height              | string     | User’s height (optional).                               |
| weight              | string     | User’s weight (optional).                               |
| bodyType            | string     | User’s body type (e.g., slim, average, toned, muscular). |
| sexualOrientation   | string     | Sexual orientation (e.g., straight, gay, bi).            |
| relationshipStatus  | string     | User’s current relationship status (single, married, etc.).|
| lookingFor          | string     | What the user is looking for (e.g., chat, dates, friends, relationships, hookups).|
| sexualPosition      | string     | Sexual position preference (e.g., top, bottom, versatile).|
| HIVStatus           | string     | HIV status (optional).                                  |
| lastTestedDate      | timestamp  | Last HIV testing date.                                   |
| vaccinationStatus   | map        | Vaccination status (e.g., COVID-19, Mpox, etc.).         |

## Profile Picture
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| profilePictureUrl   | string     | URL of the user's profile picture.                       |

## Social Media Links
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| socialLinks         | map        | Social media links (e.g., Instagram, Twitter, TikTok).    |

## Photos & Media
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| albums              | array      | List of albums containing photos (e.g., public, private). Each album has metadata like visibility, creation date, etc.|
| photos              | array      | Photos linked to albums, with metadata like URL, size, format, visibility, and timestamps.|
| photosCount         | number     | Count of photos uploaded.                                |
| videos              | array      | User-uploaded videos (up to 3 for Tinder, unlimited for Scruff).|

## Social Attributes
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| followers           | array      | List of user IDs who follow this user.                    |
| following           | array      | List of user IDs that this user follows.                  |
| likes               | array      | List of liked profiles, posts, or content.                |
| favorites           | array      | List of favorited profiles, posts, or content.            |

## Interaction Settings
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| blockList           | array      | List of users who have been blocked by this user.        |
| mutedUsers          | array      | List of users who have been muted for notifications.     |

## Messaging & Communication
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| messages            | array      | List of message threads the user is involved in.         |
| videoChat           | boolean    | Whether video chat is enabled.                           |
| voiceMessages       | boolean    | Whether voice messages are enabled.                      |
| groupChats          | boolean    | Whether the user is part of any group chats.             |
| stories             | array      | User’s stories (Instagram-like feature).                  |

## Notifications
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| notifications       | map        | Notification preferences (e.g., push, email, marketing).  |
| readReceipts        | boolean    | Whether read receipts are enabled.                       |

## Account Settings
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| language            | string     | Language preference (e.g., English).                      |
| timezone            | string     | Timezone (e.g., "Europe/Madrid").                         |
| provider            | string     | Authentication provider used (e.g., Google, Facebook).   |
| accountStatus       | string     | Account status (active, suspended, etc.).                |
| profileSetup        | boolean    | Whether the user has completed profile setup.            |

## Privacy Settings
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| profileVisibility   | string     | Profile visibility (e.g., public, private, friends).     |
| showLastActive      | boolean    | Whether to show the user’s last active time.             |
| showOnlineStatus    | boolean    | Whether to show the user’s online status.                |
| incognitoMode       | boolean    | Whether the user is using an incognito mode.             |
| discreetAppIcon     | boolean    | Whether the app icon is discreet (e.g., Grindr’s feature).|
| PINLock             | boolean    | Whether the user has enabled PIN or biometric lock for the app (Grindr, Scruff).|

## Safety Features
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| block               | boolean    | Block users feature.                                     |
| report              | boolean    | Report users or content feature.                         |
| photoVerification   | boolean    | Whether the user has undergone photo verification (Tinder, Bumble, Hinge).|
| videoVerification   | boolean    | Whether the user has undergone video verification (Tinder, Bumble, Hinge).|

## Advanced Features
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| superLikes          | number     | Number of super likes the user has (Tinder, Bumble).     |
| boost               | boolean    | Whether the user has used a profile boost (Tinder, Bumble, Grindr).|
| undoAction          | boolean    | Whether the user has the ability to undo an action (Tinder, Bumble, Hinge).|

## Timestamp Data
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| createdAt           | timestamp  | Account creation date.                                   |
| updatedAt           | timestamp  | Last profile update timestamp.                           |

## Account Deletion
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| accountDeletion     | boolean    | Whether the user can delete their account (all apps).    |

## Miscellaneous
| Attribute           | Type       | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| verifiedProfile     | boolean    | Whether the profile is verified (Tinder, Bumble, Scruff, Instagram).|
| zodiacSign          | string     | User's zodiac sign (optional for some apps).             |
| pets                | boolean    | Whether the user has pets (Bumble, Hinge).                |
| dietPreferences     | string     | User's diet preferences (e.g., vegetarian, vegan, etc.).  |
Feel free to reach out if you need any further adjustments!