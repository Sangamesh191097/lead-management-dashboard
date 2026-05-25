# Lead Management Dashboard

A production-ready full-stack Lead Management Dashboard designed to demonstrate scalable application architecture, secure authentication, API integrations, database design, deployment readiness, and AI-assisted feature implementation.

## Live Application

Frontend  
https://lead-management-dashboard-chi.vercel.app/

Backend API  
https://lead-management-dashboard-jdif.onrender.com

GitHub Repository  
https://github.com/Sangamesh191097/lead-management-dashboard

---

## Project Overview

The Lead Management Dashboard is a CRM-style web application built to manage lead workflows efficiently through a modern, responsive dashboard experience.

The platform enables authenticated users to manage lead records, monitor activity, generate AI-powered follow-up communication, and interact with real-world API integrations in a production-hosted environment.

The implementation focuses on engineering best practices including modular architecture, separation of concerns, cloud deployment, CI/CD automation, environment-based configuration, and maintainable backend design.

---

## Business Objectives

This implementation was designed to demonstrate practical engineering capability across the following areas:

- Full-stack application development
- Scalable project architecture
- API integration and third-party service consumption
- Relational database design and persistence
- Secure authentication and route protection
- Production deployment and environment management
- CI/CD automation
- AI-assisted application functionality
- Ownership and problem-solving execution

---

## Core Features

### Authentication

A secure JWT-based authentication system has been implemented to protect application access.

Capabilities include:

- User registration
- User login
- User logout
- Token-based authentication
- Protected route access
- Authorization middleware
- Secure password hashing

Authentication flow:

```text
User Login
   ↓
Credential Validation
   ↓
JWT Token Generation
   ↓
Client Token Storage
   ↓
Authenticated API Access
```

---

### Dashboard

The dashboard provides operational visibility into lead performance and recent system activity.

Dashboard metrics include:

- Total Leads
- Active Leads
- Closed Leads
- Recent Activity Timeline
- Live Weather Data

This module serves as the central operational view for lead management activity.

---

### Lead Management

The lead management module provides full lifecycle CRUD functionality.

Supported capabilities:

- Lead creation
- Lead editing
- Lead deletion
- Search functionality
- Status-based filtering
- Pagination
- Form validation

Lead data model includes:

- Name
- Email
- Phone Number
- Company
- Status
- Notes
- Created Date

This module forms the core CRM workflow of the application.

---

### AI Follow-Up Message Generator

An AI-powered follow-up generation module has been integrated to support communication workflows.

This feature generates contextual follow-up messaging using lead information, helping simulate real-world sales and outreach scenarios.

Use cases include:

- Lead follow-up communication
- Outreach drafting
- Sales engagement messaging
- Time-saving response generation

Implementation details:

- Prompt-based generation
- Backend AI integration
- Modal-driven frontend workflow
- Dynamic contextual responses

AI provider used:

Groq API

This was selected for fast inference performance and developer accessibility.

---

### Activity Tracking

A structured activity logging mechanism provides audit visibility into lead lifecycle actions.

Tracked events include:

- Lead creation
- Lead updates
- Lead deletion

Examples:

```text
Rahul was added as a new lead
Rahul: company changed from ABC to XYZ
Rahul was deleted
```

This improves traceability and operational transparency.

---

### External API Integration

The application integrates public external APIs to demonstrate real-world service consumption.

#### OpenWeather API

Used for:

- Live weather display
- Real-time API consumption
- Dashboard enhancement

Displayed information includes:

- Temperature
- Weather condition
- City context

This integration satisfies the public API requirement while improving practical dashboard utility.

---

## Technology Stack

### Frontend

Built using:

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- Axios
- React Query
- Lucide Icons

Frontend responsibilities:

- UI rendering
- State management
- Protected navigation
- API communication
- Authentication token handling
- Modal workflows
- User interaction logic

---

### Backend

Built using:

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT
- bcrypt

Backend responsibilities:

- Authentication logic
- Authorization
- Lead CRUD operations
- Dashboard aggregation
- AI integration endpoints
- Activity logging
- API orchestration
- Validation handling

---

### Database

Database platform:

PostgreSQL (Neon)

Database responsibilities:

- Persistent lead storage
- User account storage
- Authentication support
- Activity audit persistence
- Relational data integrity

---

### Cloud Infrastructure

Frontend Hosting:

Vercel

Backend Hosting:

Render

Database Hosting:

Neon PostgreSQL

---

### CI/CD

Automation platform:

GitHub Actions

Pipeline coverage:

- Frontend build validation
- Frontend lint validation
- Backend type validation
- Prisma client generation

---

## Architecture

### High-Level System Architecture

```text
                ┌──────────────────────────────┐
                │ Frontend Application         │
                │ Next.js / React / TypeScript │
                │ Hosted on Vercel             │
                └──────────────┬───────────────┘
                               │
                               │ HTTPS API Calls
                               │
                               ▼
                ┌──────────────────────────────┐
                │ Backend API                  │
                │ Node.js / Express / Prisma   │
                │ Hosted on Render             │
                └──────────────┬───────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
 PostgreSQL Database     OpenWeather API         Groq AI API
      (Neon)             External Service        AI Service
```

---

### Backend Architectural Design

The backend follows a layered architecture to improve maintainability and scalability.

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Prisma ORM
   ↓
PostgreSQL
```

Benefits:

- Clear separation of concerns
- Scalable code organization
- Easier debugging
- Maintainable business logic
- Improved readability
- Better extensibility

---

## Project Structure

```bash
lead-management-dashboard/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   └── utils/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── repositories/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       └── types/
│
└── .github/
    └── workflows/
        └── ci.yml
```

---

## Database Design

### User

Stores authenticated platform users.

Fields:

- id
- name
- email
- password
- role
- createdAt

---

### Lead

Stores CRM lead information.

Fields:

- id
- name
- email
- phone
- company
- status
- notes
- createdAt
- userId

---

### Activity

Stores audit activity related to lead actions.

Fields:

- id
- action
- description
- leadId
- createdAt

---

## API Endpoints

### Authentication

Register

```http
POST /api/auth/register
```

Login

```http
POST /api/auth/login
```

Logout

```http
POST /api/auth/logout
```

---

### Dashboard

Dashboard Statistics

```http
GET /api/dashboard
```

---

### Lead Management

Get Leads

```http
GET /api/leads
```

Create Lead

```http
POST /api/leads
```

Update Lead

```http
PUT /api/leads/:id
```

Delete Lead

```http
DELETE /api/leads/:id
```

---

### AI

Generate Follow-Up Message

```http
POST /api/ai/followup
```

---

## Local Development Setup

### Clone Repository

```bash
git clone https://github.com/Sangamesh191097/lead-management-dashboard.git
cd lead-management-dashboard
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create:

`.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

Frontend available at:

```text
http://localhost:3000
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create:

`.env`

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
GROQ_API_KEY=your_groq_api_key
OPENWEATHER_API_KEY=your_openweather_api_key
```

Generate Prisma client:

```bash
npx prisma generate
```

Apply schema:

```bash
npx prisma db push
```

Run backend:

```bash
npm run dev
```

Backend available at:

```text
http://localhost:5000
```

---

## Deployment Configuration

### Frontend Deployment

Platform:

Vercel

Configuration:

- Framework: Next.js
- Root Directory: frontend

Environment variable:

```env
NEXT_PUBLIC_API_URL=https://lead-management-dashboard-jdif.onrender.com/api
```

---

### Backend Deployment

Platform:

Render

Configuration:

Root Directory:

```text
backend
```

Build Command:

```bash
npm install && npx prisma db push && npx prisma generate && npm run build
```

Start Command:

```bash
npm start
```

Environment Variables:

```env
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=7d
GROQ_API_KEY=
OPENWEATHER_API_KEY=
```

---

### Database Deployment

Platform:

Neon PostgreSQL

Purpose:

Production relational database hosting.

---

## Security Design

Security controls implemented:

- JWT authentication
- Protected API access
- Authorization middleware
- Password hashing using bcrypt
- Environment variable secret management
- Production API URL isolation
- Token-based request interception

---

## Validation Coverage

Validation has been implemented across:

- Authentication payloads
- Lead creation
- Lead updates
- Protected route access
- Token validation
- Required field enforcement

---

## Testing Coverage

Manual validation completed across:

- User registration
- Login
- Logout
- Protected route access
- Dashboard loading
- Lead creation
- Lead updates
- Lead deletion
- Search functionality
- Filtering
- Pagination
- AI message generation
- Weather API integration
- Production deployment validation

---

## Engineering Notes

Key implementation decisions:

- Prisma ORM selected for type-safe database access
- Layered backend architecture chosen for maintainability
- React Query used for API state management
- Groq API selected for efficient AI inference
- Neon PostgreSQL used for cloud-hosted persistence
- Render and Vercel selected for production deployment simplicity
- CI/CD introduced for deployment confidence and automation

---

## Author

Sangamesh N

LinkedIn  
https://www.linkedin.com/in/sangameshn191097

---

## Closing Note

This project was developed as a practical demonstration of production-oriented full-stack engineering, combining secure authentication, modular architecture, cloud deployment, third-party integrations, AI functionality, and maintainable application design.
