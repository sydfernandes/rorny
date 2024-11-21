# Rorny Technical Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Development](#development)
6. [Security](#security)
7. [Performance](#performance)
8. [Testing](#testing)

## Project Overview

Rorny is a Next.js-based social media application with TypeScript support, utilizing modern tools and practices. The application provides a comprehensive platform for social interaction, media sharing, and community engagement.

## Technical Stack

- **Framework**: Next.js with TypeScript
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Real-time Features**: Firebase Realtime Database
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS with tailwindcss-animate
- **Form Handling**: React Hook Form with Zod validation
- **Development Tools**: ESLint, PostCSS
- **Environment Management**: Dotenv

## Architecture

### Core Components

| Component  | Description                                 | Path              | Documentation |
| ------------ | --------------------------------------------- | ------------------- | -------------- |
| App        | Core application routes and pages           | `/src/app`        | [App Guide](./technical/app-guide.md) |
| Components | Reusable UI components                      | `/src/components` | [Components](./components/README.md) |
| Hooks      | Custom React hooks for shared functionality | `/src/hooks`      | [Hooks Guide](./technical/hooks.md) |
| Lib        | Utility functions and shared libraries      | `/src/lib`        | [Libraries](./technical/libraries.md) |
| Middleware | Request/response middleware functions       | `/src/middleware` | [Middleware](./technical/middleware.md) |

### Firebase Implementation

#### Authentication
- Social authentication providers
- Custom authentication flows
- Session management
- Security rules

#### Database
- Firestore collections structure
- Data relationships
- Indexing strategy
- Query optimization

#### Storage
- Media storage organization
- Access control
- Upload/download flows
- Optimization strategies

#### Real-time Features
- WebSocket implementation
- Real-time updates
- Presence system
- Message synchronization

## Features

See [Features Documentation](./features/FEATURES.md) for detailed feature specifications.

### Core Features
- User authentication and profiles
- Social interactions (posts, comments, likes)
- Media sharing and management
- Real-time messaging
- Groups and communities
- Content discovery
- Notifications

## Development

### Setup and Configuration
1. Environment setup (see [setup.md](./development/setup.md))
2. Firebase configuration
3. Development tools configuration
4. Local development workflow

### Best Practices
- Code organization
- Error handling
- State management
- Component design
- Testing approach

## Security

### Authentication Security
- OAuth implementation
- Token management
- Session handling
- Password policies

### Data Security
- Firebase security rules
- Access control
- Data validation
- Input sanitization

### API Security
- Rate limiting
- Request validation
- Error handling
- CORS policies

## Performance

### Optimization Strategies
- Code splitting
- Image optimization
- Caching strategies
- Bundle optimization

### Monitoring
- Performance metrics
- Error tracking
- Usage analytics
- Load testing

## Testing

### Testing Strategy
- Unit testing
- Integration testing
- End-to-end testing
- Performance testing

### Test Implementation
- Test organization
- Test coverage
- Testing tools
- CI/CD integration

## Directory Structure

```
rorny/
├── src/
│   ├── app/              # Next.js app directory (routes and pages)
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and shared code
│   └── middleware/      # Request/response middleware
├── firebase/            # Firebase configuration and services
├── public/              # Static assets
├── docs/               # Documentation
│   ├── technical/      # Technical documentation
│   ├── features/       # Feature documentation
│   └── schemas/        # Data schemas
└── certificates/       # SSL certificates and security
```

## Configuration

### Environment Files

| File         | Purpose                              |
| -------------- | -------------------------------------- |
| `.env`       | Environment variables for production |
| `.env.local` | Local environment variables          |

### Development Configuration

| File                 | Purpose                            |
| ---------------------- | ------------------------------------ |
| `.eslintrc.json`     | ESLint configuration               |
| `components.json`    | Component configuration            |
| `next.config.ts`     | Next.js configuration              |
| `postcss.config.mjs` | PostCSS configuration for Tailwind |
| `tailwind.config.ts` | Tailwind CSS configuration         |
| `tsconfig.json`      | TypeScript configuration           |
