# Rorny Application Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Architecture](#architecture)
   - [Core Components](#core-components)
   - [Application Components](#application-components)
4. [Features](#features)
5. [Directory Structure](#directory-structure)
6. [Configuration](#configuration)
7. [Development](#development)
8. [Additional Resources](#additional-resources)

## Project Overview

Rorny is a Next.js-based social media application with TypeScript support, utilizing modern tools and practices. The application provides a comprehensive platform for social interaction, media sharing, and community engagement.

## Technical Stack

- **Framework**: Next.js with TypeScript
- **Authentication**: Firebase Authentication
- **Database**: 
  - Firebase Firestore (main database)
  - Firebase Realtime Database (real-time features)
- **Storage**: Firebase Storage
- **Styling**: Tailwind CSS
- **Development Tools**: ESLint, PostCSS
- **Environment Management**: Dotenv

## Architecture

### Core Components

| Component    | Description                                                          | Path                    |
|-------------|----------------------------------------------------------------------|------------------------|
| App         | Core application routes and pages                                     | `/src/app`             |
| Components  | Reusable UI components                                                | `/src/components`      |
| Hooks       | Custom React hooks for shared functionality                           | `/src/hooks`           |
| Lib         | Utility functions and shared libraries                                | `/src/lib`             |
| Middleware  | Request/response middleware functions                                  | `/src/middleware`      |

### Application Components

| Component                | Description                                                                 | Implementation                                          |
|--------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------|
| Auth                     | Authentication-related functionalities                                      | Firebase Authentication with social providers           |
| Home                     | Main home page and feed                                                    | Firestore for content, Realtime DB for live updates    |
| Profile                  | User profile management                                                    | Firestore for data, Storage for media                  |
| Messages                 | Messaging system                                                           | Realtime Database for instant messaging                |
| Groups                   | Group functionalities                                                      | Firestore for data, Realtime DB for active users      |
| Media                    | Media management                                                           | Firebase Storage with Firestore metadata               |
| Search                   | Global search                                                              | Firestore queries with proper indexing                 |
| Notifications            | Notification system                                                        | Realtime Database with Cloud Functions                 |
| Settings                 | User preferences                                                           | Firestore with client-side caching                     |
| Safety                   | Content moderation                                                         | Cloud Functions with ML integration                    |
| Explore                  | Content discovery                                                          | Firestore queries with pagination                      |
| Stories                  | Temporary content                                                          | Storage for media, Realtime DB for views              |
| Ads                      | Advertising system                                                         | Firestore for targeting, Analytics for tracking        |
| Help                     | Support resources                                                          | Static content with dynamic FAQ from Firestore         |

## Features

For detailed feature documentation, please refer to [FEATURES.md](./features/FEATURES.md).

### Development Features

| Feature                 | Description                                                |
|------------------------|------------------------------------------------------------|
| TypeScript Support     | Full TypeScript integration for better type safety         |
| ESLint Configuration   | Code quality and consistency enforcement                   |
| Tailwind CSS          | Utility-first CSS framework for styling                    |
| Environment Variables  | Configuration management via `.env` files                  |
| Firebase Integration   | Full Firebase services integration                         |

## Directory Structure

```
rorny/
├── src/
│   ├── app/              # Next.js app directory (routes and pages)
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and shared code
│   └── middleware/      # Request/response middleware
├── firebase/            # Firebase configuration and functions
├── public/              # Static assets
├── docs/               # Documentation
│   ├── technical/      # Technical documentation
│   ├── features/       # Feature documentation
│   └── schemas/        # Data schemas
└── certificates/       # SSL certificates and security
```

## Configuration

### Environment Files

| File                | Purpose                                                    |
|--------------------|----------------------------------------------------------|
| `.env`             | Environment variables for production                       |
| `.env.local`       | Local environment variables                               |

### Development Configuration

| File                | Purpose                                                    |
|--------------------|----------------------------------------------------------|
| `.eslintrc.json`   | ESLint configuration                                      |
| `components.json`   | Component configuration                                   |
| `next.config.ts`    | Next.js configuration                                     |
| `postcss.config.mjs`| PostCSS configuration for Tailwind                        |
| `tailwind.config.ts`| Tailwind CSS configuration                               |
| `tsconfig.json`     | TypeScript configuration                                  |

## Development

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Firebase project and credentials
4. Configure environment variables
5. Run development server: `npm run dev`

### Firebase Setup

1. Create a Firebase project
2. Enable required services:
   - Authentication
   - Firestore
   - Realtime Database
   - Storage
   - Cloud Functions
3. Configure security rules
4. Set up Firebase configuration in the application

For detailed Firebase implementation guidelines, refer to [Firebase Guide](./technical/firebase-guide.md).

## Additional Resources

- [API Reference](./technical/api-reference.md)
- [Real-time Features](./technical/websocket.md)
- [Deployment Guide](./technical/deployment.md)
- [Component Library](./src/components)

For more detailed information about specific components or features, please refer to the respective documentation in the `/docs` directory.
