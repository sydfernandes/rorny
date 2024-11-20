# Rorny Application Schema Documentation

## Table of Contents
1. [Component Hierarchy](#component-hierarchy)
2. [Feature Relationships](#feature-relationships)
3. [Data Models](#data-models)
4. [Route Structure](#route-structure)

## Component Hierarchy

```mermaid
graph TD
    A[Rorny Application] --> B[Auth]
    A --> C[Home]
    A --> D[Profile]
    A --> E[Messages]
    A --> F[Groups]
    A --> G[Media]
    A --> H[Search]
    A --> I[Notifications]
    A --> J[Settings]
    A --> K[Safety]
    A --> L[Explore]
    A --> M[Stories]
    A --> N[Ads]
    A --> O[Help]

    %% Auth Component
    B --> BA[Login]
    B --> BB[Register]
    B --> BC[Reset Password]
    B --> BD[Verify Email]

    %% Home Component
    C --> CA[Feed]
    C --> CB[Trending]
    C --> CC[Nearby]
    CA --> CA1[Latest]
    CA --> CA2[Favorites]
    CC --> CC1[Users]
    CC --> CC2[Groups]

    %% Profile Component
    D --> DA[View]
    D --> DB[Edit]
    D --> DC[Photos]
    D --> DD[Settings]
    DB --> DB1[Bio]
    DB --> DB2[Interests]
    DB --> DB3[Preferences]
    DC --> DC1[Upload]
    DC --> DC2[Edit]
    DC --> DC3[Delete]
    DD --> DD1[Privacy]
    DD --> DD2[Notifications]
    DD --> DD3[Account]
```

## Feature Relationships

```mermaid
erDiagram
    USER ||--o{ PROFILE : has
    USER ||--o{ POST : creates
    USER ||--o{ STORY : creates
    USER ||--o{ GROUP : joins
    USER ||--o{ MESSAGE : sends
    
    PROFILE {
        string userId
        string bio
        string[] interests
        object preferences
        string[] photos
    }
    
    POST {
        string id
        string userId
        string content
        string[] media
        datetime created
    }
    
    GROUP {
        string id
        string name
        string[] members
        string[] admins
        object settings
    }
    
    MESSAGE {
        string id
        string senderId
        string receiverId
        string content
        string[] media
        datetime sent
    }
    
    STORY {
        string id
        string userId
        string content
        string[] media
        datetime expires
    }
```

## Data Models

```mermaid
classDiagram
    class User {
        +string id
        +string email
        +string password
        +Profile profile
        +Settings settings
        +DateTime createdAt
        +createPost()
        +sendMessage()
        +joinGroup()
    }

    class Profile {
        +string userId
        +string bio
        +string[] interests
        +object preferences
        +string[] photos
        +updateBio()
        +addPhoto()
        +updatePreferences()
    }

    class Post {
        +string id
        +string userId
        +string content
        +string[] media
        +DateTime created
        +like()
        +comment()
        +share()
    }

    class Group {
        +string id
        +string name
        +string[] members
        +string[] admins
        +object settings
        +addMember()
        +removeMember()
        +updateSettings()
    }

    User "1" -- "1" Profile
    User "1" -- "*" Post
    User "1" -- "*" Group
```

## Route Structure

```mermaid
graph LR
    %% Auth Routes
    auth[/auth] --> login[/login]
    auth --> register[/register]
    auth --> reset[/reset-password]
    auth --> verify[/verify-email]

    %% Profile Routes
    profile[/profile] --> view[/view/:userId]
    profile --> edit[/edit/*]
    profile --> photos[/photos/*]
    profile --> settings[/settings/*]

    %% Messages Routes
    messages[/messages] --> inbox[/inbox]
    messages --> conversation[/conversation/:id]
    conversation --> media[/media]
    conversation --> details[/details]

    %% Groups Routes
    groups[/groups] --> explore[/explore]
    groups --> create[/create]
    groups --> groupId[/:groupId]
    groupId --> members[/members]
    groupId --> chat[/chat]
    groupId --> settings2[/settings]
```

## Component Properties

### Auth Component
```typescript
interface AuthComponent {
    features: {
        login: {
            path: '/auth/login'
            methods: ['POST']
            inputs: {
                email: string
                password: string
            }
        }
        register: {
            path: '/auth/register'
            methods: ['POST']
            inputs: {
                email: string
                password: string
                name: string
            }
        }
        resetPassword: {
            path: '/auth/reset-password'
            methods: ['POST']
            inputs: {
                email: string
            }
        }
        verifyEmail: {
            path: '/auth/verify-email'
            methods: ['GET', 'POST']
            inputs: {
                token: string
            }
        }
    }
}
```

### Profile Component
```typescript
interface ProfileComponent {
    features: {
        view: {
            path: '/profile/view/:userId'
            methods: ['GET']
            params: {
                userId: string
            }
        }
        editBio: {
            path: '/profile/edit/bio'
            methods: ['PUT']
            inputs: {
                bio: string
                interests: string[]
            }
        }
        photos: {
            path: '/profile/photos'
            methods: ['GET', 'POST', 'DELETE']
            inputs: {
                photoId?: string
                photo?: File
            }
        }
        settings: {
            path: '/profile/settings'
            methods: ['GET', 'PUT']
            sections: {
                privacy: PrivacySettings
                notifications: NotificationSettings
                account: AccountSettings
            }
        }
    }
}
```

### Messages Component
```typescript
interface MessagesComponent {
    features: {
        inbox: {
            path: '/messages/inbox'
            methods: ['GET']
            filters: {
                unread?: boolean
                archived?: boolean
            }
        }
        conversation: {
            path: '/messages/:conversationId'
            methods: ['GET', 'POST']
            params: {
                conversationId: string
            }
            features: {
                media: {
                    path: '/media'
                    methods: ['GET', 'POST']
                    types: ['photos', 'videos', 'files']
                }
                settings: {
                    path: '/settings'
                    methods: ['GET', 'PUT']
                    actions: ['block', 'mute', 'report']
                }
            }
        }
    }
}
```

### Groups Component
```typescript
interface GroupsComponent {
    features: {
        explore: {
            path: '/groups/explore'
            methods: ['GET']
            filters: {
                new?: boolean
                popular?: boolean
                nearby?: boolean
            }
        }
        create: {
            path: '/groups/create'
            methods: ['POST']
            inputs: {
                name: string
                description: string
                privacy: 'public' | 'private'
                settings: GroupSettings
            }
        }
        manage: {
            path: '/groups/:groupId'
            methods: ['GET', 'PUT', 'DELETE']
            features: {
                members: {
                    path: '/members'
                    actions: ['list', 'add', 'remove', 'promote']
                }
                media: {
                    path: '/media'
                    actions: ['upload', 'view', 'edit', 'delete']
                }
                chat: {
                    path: '/chat'
                    features: ['messages', 'pinned', 'search']
                }
            }
        }
    }
}
```
