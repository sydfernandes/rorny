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

| Component                | Description                                                                 | Implementation                                          | Features Reference |
|--------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------|-------------------|
| Auth                     | Authentication-related functionalities                                      | Firebase Authentication with social providers           | [Auth Features](./features/FEATURES.md#authentication-features) |
| Home                     | Main home page and feed                                                    | Firestore for content, Realtime DB for live updates    | [Home Features](./features/FEATURES.md#home-features) |
| Profile                  | User profile management                                                    | Firestore for data, Storage for media                  | [Profile Features](./features/FEATURES.md#profile-features) |
| Messages                 | Messaging system                                                           | Realtime Database for instant messaging                | [Messages Features](./features/FEATURES.md#messages-features) |
| Groups                   | Group functionalities                                                      | Firestore for data, Realtime DB for active users      | [Groups Features](./features/FEATURES.md#groups-features) |
| Media                    | Media management                                                           | Firebase Storage with Firestore metadata               | [Media Features](./features/FEATURES.md#media-features) |
| Search                   | Global search                                                              | Firestore queries with proper indexing                 | [Search Features](./features/FEATURES.md#search-features) |
| Notifications            | Notification system                                                        | Realtime Database with Cloud Functions                 | [Notifications Features](./features/FEATURES.md#notifications-features) |
| Settings                 | User preferences                                                           | Firestore with client-side caching                     | [Settings Features](./features/FEATURES.md#settings-features) |
| Safety                   | Content moderation                                                         | Cloud Functions with ML integration                    | [Safety Features](./features/FEATURES.md#safety-features) |
| Explore                  | Content discovery                                                          | Firestore queries with pagination                      | [Explore Features](./features/FEATURES.md#explore-features) |
| Stories                  | Temporary content                                                          | Storage for media, Realtime DB for views              | [Stories Features](./features/FEATURES.md#stories-features) |
| Ads                      | Advertising system                                                         | Firestore for targeting, Analytics for tracking        | [Ads Features](./features/FEATURES.md#ads-features) |
| Help                     | Support resources                                                          | Static content with dynamic FAQ from Firestore         | [Help Features](./features/FEATURES.md#help-features) |

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
