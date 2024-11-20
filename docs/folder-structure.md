# Folder Structure

This document outlines the organization of the Rorny project codebase.

```
rorny/
├── src/                        # Source code
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── login/         # Login page
│   │   │   ├── register/      # Registration page
│   │   │   ├── verify-email/  # Email verification page
│   │   │   └── reset-password/# Password reset page
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── (marketing)/       # Public marketing pages
│   │   ├── fonts/            # Font assets
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components (shadcn/ui)
│   │   └── auth/             # Authentication components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Library code
│   │   ├── api/             # API implementation
│   │   │   ├── auth/        # Authentication API
│   │   │   └── routes/      # Other API routes
│   │   ├── firebase/        # Firebase configuration
│   │   │   └── auth.ts      # Firebase auth utilities
│   │   ├── auth.ts          # Auth utilities
│   │   ├── email.ts         # Email service
│   │   ├── prisma.ts        # Database client
│   │   ├── session.ts       # Session management
│   │   ├── tokens.ts        # Token utilities
│   │   └── utils.ts         # Helper functions
│   ├── middleware/          # Middleware components
│   │   ├── auth.ts         # Auth middleware
│   │   └── rate-limit.ts   # Rate limiting middleware
│   ├── middleware.ts       # Root middleware configuration
│   ├── types/              # TypeScript type definitions
│   └── validations/        # Form validation schemas
│
├── docs/                     # Documentation
│   ├── auth-flow.md         # Authentication flow documentation
│   ├── email-verification.md# Email verification documentation
│   ├── database-schema.md   # Database schema documentation
│   └── folder-structure.md  # This file
│
├── public/                  # Static files
│   ├── images/             # Image assets
│   └── icons/             # Icon assets
│
├── prisma/                 # Prisma database configuration
│   └── schema.prisma      # Database schema
│
├── .env.local             # Local environment variables
├── .gitignore            # Git ignore rules
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.mjs    # PostCSS configuration
├── README.md            # Project README
├── recommendations.md   # Project recommendations
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Directory Details

### `/src/app`
Next.js app directory using the App Router architecture:
- `/(auth)`: Authentication pages (login, register, etc.)
- `/(dashboard)`: Protected application routes
- `/(marketing)`: Public marketing pages
- `fonts/`: Font assets
- `globals.css`: Global styles
- `layout.tsx`: Root layout component
- `page.tsx`: Home page component

### `/src/lib`
Core library code and utilities:
- `/api`: API implementation
  - `/auth`: Authentication API endpoints
  - `/routes`: Other API route handlers
- `/firebase`: Firebase configuration and utilities
- `auth.ts`: Authentication utilities
- `email.ts`: Email service implementation
- `prisma.ts`: Database client configuration
- `session.ts`: Session management
- `tokens.ts`: Token generation and validation
- `utils.ts`: Common utility functions

### `/src/middleware`
Middleware components and configurations:
- `auth.ts`: Authentication middleware
- `rate-limit.ts`: Rate limiting implementation
- `../middleware.ts`: Root middleware configuration

### `/src/components`
Reusable React components:
- `/ui`: Shadcn UI components
- `/auth`: Authentication-specific components

### `/src/hooks`
Custom React hooks for shared functionality

### `/src/types`
TypeScript type definitions:
- Shared types
- API types
- Component props types

### `/src/validations`
Form and data validation:
- Zod schemas
- Validation utilities

## Best Practices

1. Keep components small and focused
2. Use appropriate folder structure for scaling
3. Maintain clear separation of concerns
4. Follow consistent naming conventions
5. Keep documentation up-to-date

## Adding New Features

When adding new features:
1. Create appropriate directories under `/src/app` for new pages
2. Add reusable components to `/src/components`
3. Place API implementations in `/src/lib/api`
4. Update documentation in `/docs`
5. Update types in `/src/types`
6. Add tests in appropriate `__tests__` directories
