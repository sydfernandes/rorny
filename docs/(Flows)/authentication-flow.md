# Authentication Flow

## Directory Structure
- `src/app/(auth)` → Authentication pages (login, register)
- `src/app/(app)` → Protected pages (authenticated users only)
- `src/app` → Public pages

## Entry Points
- Email/password
- Phone number
- SSO (Google, Apple, Facebook)

## Flow Steps
1. **Authentication**
   - User logs in/registers via any entry point
   - System validates credentials

2. **Profile Check**
   - System verifies profile completion
   - New users → Profile Builder
   - Incomplete profiles → Profile Builder

3. **Profile Builder**
   - Collects: username, bio, role, images
   - Mandatory completion before app access
   - Progress saved between sessions

4. **Access Grant**
   - Complete profile → App-Home
   - Incomplete profile → Return to Profile Builder

## Flow Diagrams

### Authentication Process
```mermaid
graph TD
    A[Start] --> B{Choose Auth Method}
    B -->|Email/Password| C[Login Form]
    B -->|Phone Number| D[Phone Verification]
    B -->|SSO| E[Provider Selection]
    E --> F[Google]
    E --> G[Apple]
    E --> H[Facebook]
    
    C --> I{Validate}
    D --> I
    F --> I
    G --> I
    H --> I
    
    I -->|Success| J[Check Profile]
    I -->|Fail| K[Show Error]
    K --> B
    
    J -->|Complete| L[App Home]
    J -->|Incomplete| M[Profile Builder]
```

### Profile Setup Flow
```mermaid
graph TD
    A[Profile Check] --> B{Profile Status}
    B -->|New User| C[Profile Builder]
    B -->|Incomplete| C
    B -->|Complete| D[App Home]
    
    C --> E[Collect Info]
    E --> F[Username]
    E --> G[Bio]
    E --> H[Role]
    E --> I[Images]
    
    F & G & H & I --> J{All Required<br>Fields Complete?}
    J -->|Yes| K[Save Profile]
    J -->|No| L[Save Progress]
    
    K --> D
    L --> M[Exit]
    M --> N[Next Login]
    N --> A
```

## Navigation
- **Auth Page** → Login/Register options
- **Profile Builder** → User data collection
- **App-Home** → Main application access (verified users only)
