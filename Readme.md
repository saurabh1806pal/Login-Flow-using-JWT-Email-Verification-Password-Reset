# JWT Email Verification System

A full-stack authentication system with email verification and password reset functionality using JWT tokens. Built with modern web technologies, this project demonstrates secure authentication practices, OTP-based email verification, and password recovery flows.

---

## 📋 Table of Contents

- [Functionalities](#functionalities)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Features in Detail](#features-in-detail)
- [Environment Variables](#environment-variables)

---

## ✨ Functionalities

### Core Authentication Features
1. **User Registration** - Create new user accounts with email and password
2. **User Login** - Authenticate users with email and password
3. **JWT Token Management** - Secure token-based authentication
4. **Email Verification** - OTP-based email verification system
5. **Password Reset** - Secure password recovery via email OTP
6. **Protected Routes** - Role-based access control for authenticated and public routes
7. **Session Management** - Persistent login with cookie-based tokens
8. **Email Notifications** - Automated email sending on registration and OTP requests

### User Features
- View authenticated user profile
- Verify email address with OTP
- Reset forgotten password securely
- Automatic logout on token expiration
- Real-time authentication state management

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | - | JavaScript Runtime |
| **Express.js** | ^5.2.1 | Web Framework & Routing |
| **MongoDB** | ^7.0.0 | NoSQL Database |
| **Mongoose** | ^9.1.5 | MongoDB ODM |
| **JWT (jsonwebtoken)** | ^9.0.3 | Token Authentication |
| **Bcryptjs** | ^3.0.3 | Password Hashing |
| **Nodemailer** | ^7.0.12 | Email Service |
| **Brevo SMTP** | - | Email Provider |
| **Cookie-Parser** | ^1.4.7 | Cookie Management |
| **CORS** | ^2.8.6 | Cross-Origin Requests |
| **Dotenv** | ^17.2.3 | Environment Variables |
| **Nodemon** | ^3.1.11 | Development Server Auto-reload |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | ^19.2.0 | UI Library |
| **React Router DOM** | ^7.13.1 | Client-side Routing |
| **Axios** | ^1.13.5 | HTTP Client |
| **Tailwind CSS** | ^4.0.0 | Styling Framework |
| **React Toastify** | ^11.0.5 | Toast Notifications |
| **Vite** | ^7.3.1 | Build Tool & Dev Server |

---

## 🏗️ Architecture

### Technology Flow Diagram

```
Client (React + Vite)
    ↓ Axios HTTP Requests
Backend API (Express.js)
    ↓ Routes & Controllers
MongoDB Database
    ↓
Nodemailer (Email Service)
    ↓
Brevo SMTP Server
    ↓
User Email
```

### Authentication Flow

```
1. Registration
   User → Register endpoint → Hash password → Store in DB → Send welcome email

2. Login
   User → Login endpoint → Verify password → Generate JWT → Set cookie

3. Email Verification
   User → Request OTP → Send via email → User submits OTP → Verify & update DB

4. Password Reset
   User → Request reset OTP → Send via email → User submits OTP → New password → Update DB
```

---

## 📥 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn
- Brevo/Sendinblue account (for email)

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Create `.env` file)
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   
   # Email Configuration (Brevo)
   SMTP_USER=your_brevo_smtp_user
   SMTP_PASS=your_brevo_smtp_password
   SENDER_EMAIL=your_verified_email@domain.com
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Create `.env` file)
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/register` | Register new user | ❌ No |
| POST | `/login` | Login user | ❌ No |
| POST | `/logout` | Logout user | ✅ Yes |
| POST | `/send-verify-otp` | Send email verification OTP | ✅ Yes |
| POST | `/verify-otp` | Verify email with OTP | ✅ Yes |
| GET | `/is-auth` | Check if user is authenticated | ✅ Yes |
| POST | `/reset-password-otp` | Send password reset OTP | ❌ No |
| POST | `/reset-password` | Reset password with OTP | ❌ No |

### User Routes (`/api/user`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/profile` | Get authenticated user profile | ✅ Yes |

---

## 📁 Project Structure

```
jwt-email-verification/
├── server/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── nodemailer.js      # Email transporter config
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   └── user.controller.js # User operations
│   ├── middleware/
│   │   └── user.middleware.js # JWT authentication middleware
│   ├── models/
│   │   └── user.model.js      # User schema & model
│   ├── routes/
│   │   ├── auth.routes.js     # Auth endpoints
│   │   └── user.routes.js     # User endpoints
│   ├── .env                   # Environment variables
│   ├── index.js               # Server entry point
│   └── package.json
│
├── client/
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/           # Images, fonts, etc.
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Navigation component
│   │   │   ├── ProtectedRoutes.jsx # Route guard for authenticated users
│   │   │   └── PublicRoutes.jsx    # Route guard for public pages
│   │   ├── context/
│   │   │   ├── AppContext.jsx     # Context API setup
│   │   │   └── Context.jsx        # Context creation
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Dashboard (protected)
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Signup.jsx         # Registration page
│   │   │   ├── EmailVerify.jsx    # Email verification page
│   │   │   └── ResetPassword.jsx  # Password reset page
│   │   ├── App.jsx            # Main app component & routing
│   │   ├── index.css          # Global styles
│   │   ├── main.jsx           # React entry point
│   │   └── .env               # Environment variables
│   ├── eslint.config.js       # ESLint configuration
│   ├── vite.config.js         # Vite configuration
│   ├── index.html             # HTML template
│   └── package.json
│
├── alpha.js                   # Utility file
├── Readme.md                  # Original readme
└── README.md                  # This comprehensive documentation
```

---

## 🎯 Features in Detail

### 1. User Registration
- Validates all required fields (firstname, lastname, username, email, password)
- Checks for existing user accounts
- Hashes password using bcryptjs (10 salt rounds)
- Stores user in MongoDB
- Generates JWT token (7-day expiration)
- Sends welcome email via Nodemailer
- Sets HTTP-only, secure cookie with token

### 2. User Login
- Validates email and password presence
- Queries database for user
- Compares provided password with hashed password
- Generates and sets JWT token on success
- Returns user data for frontend

### 3. Email Verification System
- Generates 6-digit OTP
- Stores OTP with expiration time in database
- Sends OTP via email
- Validates OTP on submission
- Marks account as verified
- Clears OTP after successful verification

### 4. Password Reset Flow
- User requests password reset with email
- System generates reset OTP
- Sends OTP to email address
- User submits new password with OTP
- Validates OTP and updates password
- Hashes new password before storage

### 5. Protected Routes (Frontend)
- **ProtectedRoute**: Guards authenticated-only pages (Home, Email Verify)
- **PublicRoute**: Restricts authenticated users from login/signup pages
- Uses context API for authentication state
- Redirects based on authentication status

### 6. Authentication Middleware (Backend)
- Verifies JWT token from cookies
- Decodes token and attaches user info to request
- Returns 401 error if token is missing or invalid
- Used to protect sensitive endpoints

---

## 🔐 Security Features

1. **Password Hashing** - Bcryptjs with 10 salt rounds
2. **JWT Token** - Secure token-based authentication with 7-day expiration
3. **HTTP-Only Cookies** - Prevents XSS attacks
4. **CORS Configuration** - Restricts cross-origin requests
5. **Email Verification** - Validates user email ownership
6. **OTP Expiration** - Time-limited OTP tokens
7. **Input Validation** - Server-side validation on all endpoints
8. **Secure Password Reset** - OTP-based password recovery

---

## 📧 Email Configuration

The project uses **Brevo (formerly Sendinblue)** SMTP server for sending emails:

- **SMTP Host**: smtp-relay.brevo.com
- **Port**: 587
- **Security**: TLS

Emails sent:
- Welcome email on registration
- Verification OTP email
- Password reset OTP email

---

## 🚀 Deployment Considerations

### Backend (Vercel, Heroku, Railway)
- Update `NODE_ENV` to production
- Set `secure: true` for cookies
- Update CORS origin to production URL
- Use production database URI
- Use production email credentials

### Frontend (Vercel, Netlify)
- Update `VITE_API_URL` to production backend URL
- Build: `npm run build`
- Output: `dist/` directory

---

## 🔄 Development Workflow

### Available Scripts

**Backend**
```bash
npm start          # Start development server with auto-reload (nodemon)
```

**Frontend**
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run lint       # Run ESLint checks
npm run preview    # Preview production build
```

---

## 📝 State Management

### Context API (Frontend)
- **AppContext** - Manages global authentication state
- **Stores**: `isLoggedIn`, `userData`, `authLoading`, `API_URL`
- **Methods**: `getAuthState()`, `getUserData()`, `setIsLoggedIn()`

### Database State (Backend)
- User documents store authentication state
- `isAccountVerified` - Email verification status
- `verifyOtp` & `verifyOtpExpires` - Email verification data
- `resetOtp` & `resetOtpExpires` - Password reset data

---

## 🐛 Error Handling

- Comprehensive try-catch blocks in all async operations
- Informative error messages for user feedback
- HTTP status codes: 400 (Bad Request), 401 (Unauthorized), 500 (Server Error)
- Toast notifications for user-facing errors
- Console logging for debugging

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Built with ❤️ as a full-stack authentication project demonstrating modern web development practices.