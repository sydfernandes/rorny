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
   - New users → Profile Wizard
   - Incomplete profiles → Profile Wizard

3. **Profile Wizard**
   - Multi-step guided process with progress indicators
   - All fields are required for completion
   - Required completion before app access
   - Progress saved between sessions
   
   ### Step 1: Personal Information
   - Username (3-30 characters, unique, alphanumeric with dots and underscores)
   - Display Name (16 char limit)
   - Bio Text (240 char limit)
   - Birthdate (with age validation)
   - Gender (customizable selection)
   - Pronouns (customizable selection)
   
   ### Step 2: Sexual Information
   - Sexual Orientation (multi-select)
   - Sexual Position
   - Interested In (multi-select)
   - Relationship Status
   - Looking For (multi-select)

4. **Access Grant**
   - Complete profile → App-Home
   - Incomplete profile → Return to Profile Wizard

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
    J -->|Incomplete| M[Profile Wizard]
```

### Profile Wizard Flow
```mermaid
graph TD
    A[Profile Check] --> B{Profile Status}
    B -->|New User| C[Profile Wizard]
    B -->|Incomplete| C
    B -->|Complete| D[App Home]
    
    C --> E[Step 1: Personal Info]
    E --> E1[Username]
    E --> E2[Display Name]
    E --> E3[Birthdate]
    E --> E4[Gender]
    E --> E5[Pronouns]
    
    E1 & E2 & E3 & E4 & E5 --> F{Step 1<br>Complete?}
    F -->|No| G[Save Progress]
    F -->|Yes| H[Step 2: Sexual Info]
    
    H --> H1[Sexual Orientation]
    H --> H2[Sexual Position]
    H --> H3[Interested In]
    H --> H4[Relationship Status]
    H --> H5[Looking For]
    
    H1 & H2 & H3 & H4 & H5 --> I{Step 2<br>Complete?}
    I -->|No| G
    I -->|Yes| J[Save Profile]
    
    G --> K[Exit]
    K --> L[Next Login]
    L --> A
    
    J --> D
```

## Navigation
- **Auth Page** → Login/Register options
- **Profile Wizard** → Step-by-step profile setup
- **App-Home** → Main application access (verified users only)
