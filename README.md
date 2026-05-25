# Lead Management Dashboard

A production-ready full-stack Lead Management Dashboard built with modern web technologies, featuring authentication, lead tracking, AI-powered follow-up generation, activity monitoring, API integrations, and CI/CD deployment.

## Live Demo

### Frontend
https://lead-management-dashboard-chi.vercel.app/

### Backend API
https://lead-management-dashboard-jdif.onrender.com

### GitHub Repository
https://github.com/Sangamesh191097/lead-management-dashboard

---

## Project Overview

This project is a full-stack CRM-style Lead Management Dashboard developed as part of a technical assessment to demonstrate:

- Full Stack Development
- Scalable Project Architecture
- API Integration
- Database Design
- Deployment & Production Readiness
- CI/CD Pipeline Setup
- AI-Assisted Feature Development
- Problem Solving & Ownership

---

## Features

### Authentication Module
- User Registration
- Login
- Logout
- JWT Authentication
- Protected Routes

---

### Dashboard Module
Displays:

- Total Leads
- Active Leads
- Closed Leads
- Recent Activities
- Weather Widget (Public API Integration)

---

### Lead Management
Full CRUD support:

- Add Lead
- Edit Lead
- Delete Lead
- Search Leads
- Status Filtering
- Pagination

Lead fields:

- Name
- Email
- Phone Number
- Company
- Status
- Notes
- Created Date

---

### AI Follow-up Message Generator
Integrated AI-powered follow-up generation using Groq API.

Features:

- Context-aware follow-up message creation
- Sales outreach assistance
- Quick lead communication support

---

### Activity Tracking
Tracks:

- Lead Created
- Lead Updated
- Lead Deleted

Recent activity is visible in the dashboard for audit/history tracking.

---

### External API Integration
Integrated:

#### OpenWeather API
Used to display live Bengaluru weather data inside dashboard.

---

## Tech Stack

### Frontend
- Next.js
- React.js
- TypeScript
- Tailwind CSS
- React Query
- Axios
- Lucide Icons

---

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- bcrypt

---

### Database
- PostgreSQL (Neon)

---

### AI Integration
- Groq API

---

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → Neon PostgreSQL

---

### CI/CD
- GitHub Actions

Automated pipeline includes:

- Frontend Build Validation
- Frontend Lint Check
- Backend Type Checking
- Prisma Client Generation

---

## Project Architecture

```bash
lead-management-dashboard/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── types/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── types/
│   │
│   └── prisma/
│
└── .github/workflows/
