# Todo App - Internship Assignment

## Introduction

This project was developed as part of the internship qualification process. It demonstrates my ability to create a full-stack web application with modern technologies and best practices.

### Project Overview
A comprehensive Todo application that showcases:
- Full-stack development using Next.js and TypeScript
- Database design and implementation with MySQL
- RESTful API development
- Authentication and authorization
- Clean code architecture and best practices
- Responsive UI/UX design

### Contact Information
- **Developer**: Dinesh Korukonda
- **Email**: dineshkorukonda.dev@gmail.com
- **Phone**: +91 8897617900

## Technical Details

A full-stack Todo application built with Next.js, TypeScript, and MySQL.

## Features

- User authentication (Sign up & Login)
- Task management (Create, Read, Update, Delete)
- Responsive design
- Secure password handling with bcrypt
- JWT-based authentication

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/crud-app.git
cd crud-app/my-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Database Setup

1. Log in to MySQL:
```bash
mysql -u root -p
```

2. Create and configure the database by running the SQL commands in `src/config/setupdb.sql`:
```sql
CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_app

# JWT Configuration
JWT_SECRET=your_jwt_secret
```

Replace `your_password` with your MySQL password and `your_jwt_secret` with a secure random string for JWT token generation.

### 5. Run the Application

Development mode:
```bash
npm run dev
# or
yarn dev
```

Build for production:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

The application will be available at `http://localhost:3000`

## Project Structure and File Explanations

```
my-app/
├── src/                      # Source directory containing all application code
│   ├── app/                 # Next.js 13+ app directory for routing and API
│   │   ├── (pages)/        # Client-side pages grouped in a route group
│   │   │   ├── dashboard/  # Dashboard page for authenticated users
│   │   │   │   └── page.tsx    # Main dashboard interface with todo management
│   │   │   └── auth/      # Authentication pages
│   │   │       └── page.tsx    # Login/Signup form interface
│   │   ├── api/           # API routes for backend functionality
│   │   │   ├── auth/      # Authentication endpoints
│   │   │   │   ├── login/     # Login API endpoint
│   │   │   │   └── signup/    # Signup API endpoint
│   │   │   └── user/      # User-related endpoints
│   │   │       └── profile/   # User profile management
│   │   └── layout.tsx     # Root layout component for the application
│   ├── config/            # Configuration files
│   │   ├── db.ts         # Database connection configuration
│   │   └── setupdb.sql   # SQL schema for database setup
│   └── utils/            # Utility functions and helpers
│       └── auth.ts       # Authentication utility functions (JWT, bcrypt)
├── public/               # Static files served by Next.js
└── package.json         # Project dependencies and scripts
```

### Key Files Explained

1. **Configuration Files:**
   - `src/config/db.ts`: Manages MySQL database connection using mysql2/promise. Sets up connection pool with credentials.
   - `src/config/setupdb.sql`: Contains database schema with tables for users and tasks.

2. **Authentication:**
   - `src/app/api/auth/login/route.ts`: Handles user login, validates credentials, and issues JWT tokens.
   - `src/app/api/auth/signup/route.ts`: Manages user registration with password hashing.
   - `src/utils/auth.ts`: Contains utility functions for JWT generation, password hashing, and authentication middleware.

3. **Frontend Pages:**
   - `src/app/(pages)/auth/page.tsx`: Authentication page with login/signup forms.
   - `src/app/(pages)/dashboard/page.tsx`: Main dashboard for task management.
   - `src/app/layout.tsx`: Root layout with common UI elements and providers.

4. **API Routes:**
   - `src/app/api/user/profile/route.ts`: To Go user profile information
   - Additional API routes for task CRUD operations.

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user information
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Fetch all tasks
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

