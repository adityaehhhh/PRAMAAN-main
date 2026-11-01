# PRAMAAN: Platform for Reliable Academic Monitoring, Authentication & Admissions Network
### Smart India Hackathon (SIH 2026) • Problem Statement: SIH26263
> **Team: Brain--Byte** | **Team Lead: Vanshika Grover**  
> *Official Prototype for AICTE APAAR Student Data Governance, Intake Compliance Monitoring, and Authorized Academic Verification.*

---

## 🏛️ Executive Summary

Under the **National Education Policy (NEP 2020)**, the Government of India introduced **APAAR (Automated Permanent Academic Account Registry)** — the "One Nation, One Student ID". 

However, regulatory bodies face a fundamental governance challenge: **mere data collection does not guarantee data integrity or compliance**.

The **PRAMAAN** platform connects AICTE-approved institutions with a central regulatory governance engine. Built adhering strictly to Indian Government Portal Standards (GIGW), the platform automatically:
1. **Validates Student Data in Real-Time** (12-digit numeric APAAR format, age reasonableness, mandatory regulatory attributes).
2. **Detects Cross-Institution Duplicate Enrolments** (flags students actively registered across multiple institutions simultaneously).
3. **Monitors Approved Intake vs. Actual Admissions** (audits sanctioned regular capacity and statutory supernumerary quotas like TFWS, PMSSS, and NRI).
4. **Interactive GIS State College Locator** (GeoJSON-powered interactive map visualizing colleges, intake capacities, and student admissions state-by-state, featuring Bhagwan Parshuram Institute of Technology).
5. **Provides Authorized Third-Party Background Verification** (generates tamper-evident digital verification certificates with QR codes for employers and consular bodies).
6. **Maintains an Immutable Regulatory Audit Trail** (cryptographically timestamped forensic log of all actions, submissions, and interventions).

---

## 🔑 Demo Access Credentials

The prototype features a quick 1-click role-switcher in the header, as well as credentials for manual authentication:

| Role | User ID | Password | Context |
|---|---|---|---|
| **AICTE Central Administrator** | `AICTE_ADMIN` | `admin123` | **Dr. Vanshika Grover**, Director (Approval & Governance), AICTE New Delhi |
| **Institution Administrator** | `INST_10021` | `demo123` | **Prof. Ajay Kumar Sharma**, Dean Academics, Bhagwan Parshuram Institute of Technology (BPIT Delhi) |
| **Authorized Third-Party Verifier** | `VERIFIER_004` | `verify123` | **Alok Srivastava**, Background Verification Cell, TCS Ltd |

---

## 🌐 Full Cloud Deployment & Hosting Guide

The project is structured for effortless zero-cost cloud deployment:
- **Backend (FastAPI):** Hosted on [Render](https://render.com) or [Railway](https://railway.app)
- **Frontend (React + Vite):** Hosted on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

---

### Step 1: Push Repository to GitHub
Make sure your code is pushed to your GitHub account under your team's repository (e.g. `Brain--Byte-PRAMAAN`).

---

### Step 2: Deploy the Backend (Python FastAPI) on Render

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository.
4. Fill in the service configuration:
   - **Name:** `pramaan-backend` (or any unique name)
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt && python -c "from app.seed_data import seed_database; seed_database()"`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** `Free`
5. In **Environment Variables**, add:
   - `ENVIRONMENT` = `production`
   - `PYTHON_VERSION` = `3.11.9`
6. Click **Create Web Service**.
7. Render will build the environment, seed the database with all 10 institutions and students, and launch the API.
8. Once live, copy your backend URL:  
   `https://pramaan-backend.onrender.com` (Example)

---

### Step 3: Deploy the Frontend (React + Vite) on Vercel

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New...** ➔ **Project**.
3. Import your GitHub repository.
4. Configure the project:
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click Edit and select `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Expand **Environment Variables** and add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://pramaan-backend.onrender.com` *(Paste your Render backend URL from Step 2 without trailing slash)*
6. Click **Deploy**.
7. In ~60 seconds, Vercel will give you a live HTTPS link (e.g. `https://pramaan-portal.vercel.app`).

---

### Alternative: All-in-One Single VM Deployment (AWS EC2 / DigitalOcean / Ubuntu VPS)

If you have a Linux VPS:
```bash
# 1. Clone repository
git clone https://github.com/<your-username>/Brain--Byte-PRAMAAN.git
cd Brain--Byte-PRAMAAN

# 2. Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -c "from app.seed_data import seed_database; seed_database()"
# Run backend with systemd or tmux:
uvicorn app.main:app --host 127.0.0.1 --port 8000

# 3. Build frontend
cd ../frontend
npm install
npm run build
# Serve dist/ with Nginx reverse proxy pointing /api to 127.0.0.1:8000
```

---

## 📁 Repository Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI gateway & CORS configuration
│   │   ├── config.py                # Environment & database settings
│   │   ├── database.py              # SQLAlchemy engine & session factory
│   │   ├── models.py                # Database models (Students, Institutions, Intake, Audit)
│   │   ├── schemas.py               # Pydantic validation schemas
│   │   ├── validation_engine.py     # Multi-stage APAAR & intake rule processor
│   │   ├── seed_data.py             # Realistic Indian higher-education seed dataset
│   │   ├── routers/                 # Modular RESTful API controllers
│   │   │   ├── auth.py
│   │   │   ├── dashboard.py
│   │   │   ├── institutions.py
│   │   │   ├── students.py
│   │   │   ├── validation.py
│   │   │   ├── duplicates.py
│   │   │   ├── intake.py
│   │   │   ├── verifications.py
│   │   │   ├── analytics.py
│   │   │   ├── audit.py
│   │   │   ├── reports.py
│   │   │   └── notifications.py
│   │   └── services/                # Integration mock adapters (DigiLocker, NAD, AICTE)
│   ├── requirements.txt
│   ├── Procfile
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/              # Header, TopGovStrip, Navigation, Footer, Modals, StateCollegeLocator
│   │   ├── context/                 # AuthContext, LanguageContext (Bilingual i18n)
│   │   ├── data/                    # stateCollegesData.ts (GeoJSON state colleges with BPIT)
│   │   ├── locales/                 # en.json, hi.json (Full English / हिन्दी translation)
│   │   ├── pages/                   # All regulatory & institution workflow pages
│   │   └── api/client.ts            # Typed API client with VITE_API_URL support
│   ├── public/                      # Static assets & sample demo datasets
│   ├── package.json
│   ├── vite.config.ts
│   └── vercel.json
├── sample_upload_data/
│   └── sample_student_batch_127.csv # Flagship SIH 127-student demo batch (North Indian names)
├── render.yaml                      # Render Blueprint specification
├── vercel.json                      # Vercel Root deployment specification
├── MEMORY.md                        # Auto-maintained development log & system memory
└── .gitignore
```

---

## 💻 Local Quickstart

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Start Backend API
```bash
cd backend
python -m pip install -r requirements.txt
python -c "from app.seed_data import seed_database; seed_database()"
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend runs on `http://127.0.0.1:8000` with interactive Swagger docs at `http://127.0.0.1:8000/docs`.*

### 2. Start Frontend App
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://127.0.0.1:5173`.*

---

## 🏆 Key Architectural Highlights
- **Explainable Rule Engines:** 100% deterministic regulatory checks for intake limits, supernumerary caps, and APAAR verification.
- **Privacy By Design:** Student APAAR IDs are masked as `********1001` across public tables to comply with the DPDP Act.
- **Bilingual Accessibility:** Instant language switching between English and Hindi without page reloads.
- **Forensic Auditability:** Immutable log capturing every transition, user ID, role, and prior state.
- **Interactive State GIS Mapping:** GeoJSON-powered visual state inspection of engineering colleges, capacity utilization, and student intakes.

---
*Built for Smart India Hackathon (SIH 2026) • Team Brain--Byte (Lead: Vanshika Grover)*
