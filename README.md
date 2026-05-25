# Lead Management Dashboard

A production-ready full-stack Lead Management Dashboard designed to demonstrate scalable application architecture, secure authentication, API integrations, relational database design, deployment readiness, CI/CD automation, and AI-assisted application functionality.

---

## Live Application

Frontend  
https://lead-management-dashboard-chi.vercel.app/

Backend API  
https://lead-management-dashboard-jdif.onrender.com

GitHub Repository  
https://github.com/Sangamesh191097/lead-management-dashboard

---

## Project Overview

The Lead Management Dashboard is a CRM-style web application built to manage lead workflows through a modern dashboard interface.

The application enables authenticated users to manage lead records, monitor activity history, generate AI-powered follow-up communication, and interact with real-world API integrations in a production-hosted environment.

This implementation focuses on production engineering practices including modular architecture, layered backend design, cloud deployment, CI/CD automation, environment-based configuration, secure authentication, and scalable code organization.

---

## Business Objectives

This implementation demonstrates engineering capability across:

- Full-stack application development
- Scalable project architecture
- API integration and third-party service consumption
- Relational database design and persistence
- Secure authentication and protected route access
- Production deployment and cloud hosting
- CI/CD automation
- AI-assisted application workflows
- Ownership and problem-solving execution

---

## Core Features

### Authentication

A secure JWT-based authentication system protects application access.

Capabilities include:

- User login
- User logout
- JWT token authentication
- Protected route access
- Authorization middleware
- Secure password hashing using bcrypt

Authentication flow:

```text
User Login
   ↓
Credential Validation
   ↓
JWT Token Generation
   ↓
Token Stored on Client
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

This serves as the operational overview of the CRM workflow.

---

### Lead Management

The lead management module supports full lifecycle CRUD operations.

Capabilities:

- Lead creation
- Lead editing
- Lead deletion
- Search functionality
- Status-based filtering
- Pagination
- Form validation

Lead data includes:

- Name
- Email
- Phone Number
- Company
- Status
- Notes
- Created Date

This module forms the core CRM functionality.

---

### AI Follow-Up Message Generator

An AI-powered communication assistant has been integrated to support outreach workflows.

This feature generates contextual follow-up messaging using lead data.

Use cases include:

- Sales follow-up communication
- Outreach drafting
- Lead nurturing workflows
- Quick communication generation

Implementation details:

- Backend AI API integration
- Prompt-driven contextual generation
- Modal-based frontend interaction
- Dynamic response generation

AI provider:

Groq API

The provider was selected for low-latency inference and developer-friendly API access.

---

### Activity Tracking

A structured audit trail records lead lifecycle activity.

Tracked events:

- Lead creation
- Lead updates
- Lead deletion

Example activity logs:

```text
Rahul was added as a new lead
Rahul: company changed from ABC to XYZ
Rahul was deleted
```

This improves transparency, operational traceability, and audit visibility.

---

### External API Integration

Public third-party API integrations are used to demonstrate real-world service consumption.

#### OpenWeather API

Used for:

- Live weather data retrieval
- Dashboard enhancement
- Real-time API integration demonstration

Displayed data includes:

- Temperature
- Weather condition
- City information

---

## APIs Used

### Internal REST APIs

Authentication:

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

Dashboard:

```http
GET /api/dashboard
```

Lead Management:

```http
GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id
```

AI:

```http
POST /api/ai/followup
```

---

### External APIs

OpenWeather API  
Used to fetch live weather information displayed on the dashboard.

Groq API  
Used to generate AI-powered follow-up messaging.

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
- Dashboard analytics aggregation
- AI API integration
- Activity logging
- Business validation
- API orchestration

---

### Database

Database platform:

PostgreSQL (Neon)

Database responsibilities:

- Persistent lead storage
- User authentication data
- Audit trail persistence
- Relational integrity management

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

Pipeline validation includes:

- Frontend build validation
- Frontend lint validation
- Backend type checking
- Prisma client generation

Trigger conditions:

- Push to main branch
- Pull requests

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

The backend follows a layered architecture.

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

- Separation of concerns
- Maintainability
- Scalability
- Easier debugging
- Cleaner business logic boundaries
- Extensibility

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

Stores authenticated users.

Fields:

- id
- name
- email
- password
- role
- createdAt

---

### Lead

Stores CRM lead records.

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

Stores audit activity for lead lifecycle events.

Fields:

- id
- action
- description
- leadId
- createdAt

---

## Initial Access

The application currently does not include a dedicated frontend registration interface.

Initial user creation should be performed through the backend registration endpoint using Postman or any API client.

Hosted registration endpoint:

```http
POST https://lead-management-dashboard-jdif.onrender.com/api/auth/register
```

Example request body:

```json
{
  "name": "Sangamesh",
  "email": "test@example.com",
  "password": "123456"
}
```

After successful registration:

1. Open the frontend application
2. Log in using the registered credentials
3. Access the dashboard

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

## Deployment Steps

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

Deployment process:

- Connect GitHub repository
- Configure root directory
- Add environment variable
- Deploy production build

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

Deployment process:

- Connect GitHub repository
- Configure backend service
- Add environment variables
- Deploy production API

---

### Database Deployment

Platform:

Neon PostgreSQL

Deployment process:

- Create hosted PostgreSQL instance
- Copy connection string
- Configure DATABASE_URL in backend environment

---

## Security Design

Security implementation includes:

- JWT authentication
- Protected route access
- Authorization middleware
- Password hashing using bcrypt
- Environment variable secret management
- Token-based API request authorization
- Production environment API separation

---

## Validation Coverage

Validation implemented across:

- Authentication payloads
- Lead creation
- Lead updates
- Protected endpoint access
- Token verification
- Required field enforcement

---

## Testing Coverage

Manual validation completed for:

- User registration
- Login
- Logout
- Protected route access
- Dashboard loading
- Lead creation
- Lead updates
- Lead deletion
- Search functionality
- Status filtering
- Pagination
- AI follow-up generation
- Weather API integration
- Hosted deployment verification

---

## Assumptions / Notes

- The application assumes a single-user CRM workflow for assessment scope
- Initial user creation is performed via backend registration endpoint
- Protected application functionality requires authentication
- AI response generation depends on external provider availability
- Weather data depends on OpenWeather API uptime
- Environment variables are required for both local and hosted execution
- Cloud-hosted PostgreSQL is used for production persistence

---

## Engineering Decisions

Implementation decisions:

- Prisma ORM selected for type-safe database access
- Layered backend architecture chosen for maintainability
- React Query selected for API state management
- Groq selected for efficient AI inference
- Neon PostgreSQL used for hosted relational persistence
- Render and Vercel selected for deployment simplicity and production hosting
- GitHub Actions introduced for automated validation and deployment confidence

---

## Author

Sangamesh N

LinkedIn  
https://www.linkedin.com/in/sangameshn191097

---

## Closing Note

This project was developed as a practical demonstration of production-oriented full-stack engineering, combining secure authentication, modular architecture, cloud deployment, third-party integrations, AI-assisted workflows, CI/CD automation, and maintainable application design.
