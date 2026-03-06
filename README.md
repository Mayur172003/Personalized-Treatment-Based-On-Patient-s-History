# MyFitness - React, Node.js, Express, MongoDB

This document describes the new stack (React + Node/Express + MongoDB) that replicates the original PHP/MySQL MyFitness application.

## Folder Structure

```
├── backend/                 # Node.js + Express API
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js         # Patient (registration)
│   │   ├── Admin.js
│   │   ├── Doctor.js
│   │   ├── Diabetes.js
│   │   ├── Diet.js
│   │   ├── Exercise.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── analysisRoutes.js
│   │   ├── dietRoutes.js
│   │   ├── exerciseRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── visualizationRoutes.js
│   ├── utils/
│   │   └── predictionLogic.js   # Rule-based prediction (ported from PHP)
│   ├── scripts/
│   │   └── seedAdmin.js
│   ├── server.js
│   └── package.json
│
├── client/                  # React (Vite) frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README-NEW-STACK.md
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env: MONGO_URI, JWT_SECRET, PORT, CLIENT_URL
npm install
node scripts/seedAdmin.js   # Creates admin user: admin / admin
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2. Client

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and proxies `/api` to the backend.

### 3. MongoDB

Ensure MongoDB is running. Default connection: `mongodb://localhost:27017/myfitness`.

### 4. Optional: Same UI images as original

Copy the `myfitness/images` folder (e.g. `logo2.jpg`) into `client/public/images` so the header logo and login/register page images match the original PHP site.

## API Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | - | Patient register |
| POST | /api/auth/login | - | Patient login |
| POST | /api/admin/login | - | Admin login |
| GET  | /api/admin/doctors | Admin | List doctors |
| POST | /api/admin/doctors | Admin | Add doctor |
| POST | /api/doctors/login | - | Doctor login |
| GET  | /api/doctors | Patient | List doctors |
| POST | /api/analysis | Patient | Submit analysis (prediction + diet + exercise) |
| GET  | /api/analysis/history | Patient | Analysis history |
| GET  | /api/diet | Patient | Diet plans |
| GET  | /api/exercise | Patient | Exercise plans |
| GET  | /api/appointments | Patient | My appointments |
| POST | /api/appointments | Patient | Book appointment |
| GET  | /api/appointments/doctor | Doctor | All appointments |
| GET  | /api/visualization/diet | Patient | Diet data for charts |
| GET  | /api/visualization/diabetes | Patient | Diabetes records for charts |

Auth: send `Authorization: Bearer <token>` for protected routes.

## Logic Preserved

- **Prediction:** Rule-based (same thresholds as PHP): Diabetic / Prediabetic / Healthy.
- **Diet & Exercise:** Same if/else rules by age, height, weight, insulin, glucose, BP, A1C, OGTT; stored per analysis.
- **Roles:** Patient, Admin, Doctor with separate login and routes.
- **Admin:** Add doctors; Doctor: view all appointments; Patient: analysis, history, diet, exercise, visualization, book appointment.

## Default Admin

After running `node scripts/seedAdmin.js`: **username:** `admin`, **password:** `admin`. Change password in production.
