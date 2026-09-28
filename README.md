# otp-auth-task

A secure authentication backend built with Node.js, Express.js, MongoDB, JWT, OTP verification, and Nodemailer.

Features

- User Registration
- User Login
- OTP Generation
- Email OTP Verification
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Input Validation
- Rate Limiting
- Centralized Error Handling
- MongoDB Database
- Email Service using Nodemailer
- Postman API Collection

Tech Stack

- Node.js — JavaScript runtime
- Express.js — Backend framework
- MongoDB — Database
- Mongoose — MongoDB ODM
- bcrypt — Password hashing
- JWT — Authentication
- Nodemailer — Email/OTP sending
- Postman — API testing

Project Structure

otp-auth-task/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── mailer.js
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── rateLimit.middleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.routes.js
│   ├── services/
│   │   └── email.service.js
│   ├── utils/
│   │   └── otp.js
│   ├── validators/
│   │   └── auth.validator.js
│   ├── app.js
│   └── server.js
├── postman/
│   └── auth-api.postman_collection.json
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

Installation

1. Clone the repository

git clone <your-github-repository-url>

2. Go to the project folder

cd otp-auth-task

3. Install dependencies

npm install

4. Create ".env"

Create a ".env" file in the root directory.

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

5. Start the server

For development:

npm run dev

For production:

npm start

The server will run on:

http://localhost:5000

API Endpoints

Authentication

Method| Endpoint| Description
POST| "/api/auth/register"| Register a new user
POST| "/api/auth/verify-otp"| Verify OTP
POST| "/api/auth/login"| Login user
POST| "/api/auth/logout"| Logout user
GET| "/api/auth/profile"| Get authenticated user

«The exact endpoints may vary depending on the routes implemented in the project.»

Authentication Flow

User Registration
       ↓
Input Validation
       ↓
Check Existing User
       ↓
Hash Password
       ↓
Generate OTP
       ↓
Save User
       ↓
Send OTP via Email
       ↓
Verify OTP
       ↓
Account Verified

Login Flow

User
 ↓
Login Request
 ↓
Validate Input
 ↓
Find User in MongoDB
 ↓
Compare Password
 ↓
Generate JWT
 ↓
Send Token
 ↓
Access Protected Routes

Security

This project implements several security practices:

- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- Sensitive values are stored in environment variables.
- Rate limiting is used to reduce excessive requests.
- Input validation is implemented for authentication requests.
- Authentication middleware protects private routes.
- ".env" is excluded from Git using ".gitignore".

Testing with Postman

The project includes a Postman collection- otp auth task.postman_collection.json

Import this file into Postman to test the API endpoints.

Example request:

POST http://localhost:5000/api/auth/register

Example JSON body:

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

Environment Variables

Variable| Description
"PORT"| Port on which the server runs
"MONGO_URI"| MongoDB connection string
"JWT_SECRET"| Secret key used for JWT
"EMAIL_USER"| Email account used for sending OTP
"EMAIL_PASSWORD"| Email authentication credential

Error Handling

The API uses centralized error handling through:

src/middleware/error.middleware.js

This helps maintain consistent error responses across the application.

Project Architecture

The project follows a modular
