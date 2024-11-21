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

2. **Email Verification** _(for new registrations)_
   - System sends verification email
   - User must verify email before proceeding
   - Unverified users cannot access protected features

3. **Profile Check**
   - System verifies profile completion status in Firestore
   - New users → Profile Wizard
   - Incomplete profiles → Profile Wizard

4. **Profile Wizard**
   - Multi-step guided process with progress indicators
   - All fields are required for completion
   - Required completion before app access
   - Progress saved between sessions
   - Completion status stored in Firestore (`profileWizardCompleted: boolean`)

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

5. **Access Grant**
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
    
    I -->|Success| N{New Registration?}
    I -->|Fail| K[Show Error]
    K --> B
    
    N -->|Yes| O[Send Verification Email]
    O --> P{Email Verified?}
    P -->|No| Q[Show Verification Required]
    P -->|Yes| J[Check Profile]
    N -->|No| J
    
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
    I -->|Yes| J[Mark Complete in Firestore]
    J --> K[Redirect to App Home]
```

## Navigation
- **Auth Page** → Login/Register options
- **Profile Wizard** → Step-by-step profile setup
- **App-Home** → Main application access (verified users only)
