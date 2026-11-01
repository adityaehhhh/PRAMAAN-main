# MEMORY.md — Brain--Byte SIH-2026 Project Log
> Auto-maintained by Gemini/Antigravity. Update this file after every session.
> **Project:** APAAR/PRAMAAN Student Data & Verification System (SIH 2026)
> **Workspace:** `c:\Users\adity\Desktop\SIH-2026-2-_TEAM_OMEGA_CODERS-main`
> **Team:** Brain--Byte | **Lead:** Vanshika Grover

---

## 🏗️ Project Architecture

| Layer | Tech | Path |
|-------|------|------|
| Frontend | React 18 + TypeScript + Vite + Tailwind CSS | `frontend/` |
| Backend | Python FastAPI + SQLite | `backend/` |
| Database | SQLite | `backend/asdvs.db` |
| Styles | Tailwind + custom `index.css` | `frontend/src/index.css` |

**Key ports:**  
- Frontend dev server: `http://localhost:5173`  
- Backend API: `http://localhost:8000`

**Start frontend:** `cd frontend; npm run dev` (needs BypassSandbox: true to be reachable)  
**Start backend:** `$env:PYTHONPATH="backend"; uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload`  
**Re-seed DB:** `$env:PYTHONPATH="backend"; python -c "from app.seed_data import seed_database; seed_database()"`

---

## 🎨 Color Theme

| Old Color | New Color | Usage |
|-----------|-----------|-------|
| `#064e3b` (emerald green) | `#0b2545` (deep navy) | Primary brand color |
| — | `#133863` | Hover / active states |
| — | `#0a192f` | TopGovStrip / Footer bg |
| — | Amber `#d97706` | Accent / icons |

**Files changed for color:**
- `frontend/tailwind.config.js`
- `frontend/src/index.css`
- `frontend/src/components/Navigation.tsx`
- `frontend/src/components/Header.tsx`
- `frontend/src/components/Footer.tsx`
- `frontend/src/components/TopGovStrip.tsx`
- `frontend/src/pages/AicteDashboardPage.tsx`
- `frontend/src/components/StateCollegeLocator.tsx`

---

## 🔤 Title / Branding

| Where | Old Text | New Text |
|-------|----------|---------|
| Header `h1` | "APAAR Student Data & Verification System" | **PRAMAAN** |
| Header subtitle | — | "Platform for Reliable Academic Monitoring, Authentication & Admissions Network" |
| Login card | "APAAR Student Data & Verification System" | **PRAMAAN** + full expansion |
| Hindi | "अपार छात्र डेटा एवं सत्यापन प्रणाली" | "प्रमाण – शैक्षणिक निगरानी एवं प्रमाणीकरण मंच" |

**Files changed:**
- `frontend/src/components/Header.tsx` — h1 now shows "PRAMAAN" + subtitle line below
- `frontend/src/pages/LoginPage.tsx` — card header updated

---

## 👤 Names & People

| Role | Username | Full Name |
|------|----------|-----------|
| AICTE Admin | `AICTE_ADMIN` | **Dr. Vanshika Grover** |
| Institution | `INST_10021` | Prof. Ajay Kumar Sharma (BPIT) |
| Verifier | `VERIFIER_004` | Alok Srivastava (TCS) |

**All student names** are North Indian only — defined in `backend/app/seed_data.py` (`FIRST_NAMES` + `LAST_NAMES` lists).  
**Forbidden names:** Iyer, Nair, Rao, Reddy, Deshmukh, Joshi (south Indian), Das, Patil, Joshi.  
**Vanshika Grover** appears: Login demo tile, Header user info, Auth context, seed DB row 1, CSV row 1.

---

## 🏫 Institutions in Database

| ID | Name | AICTE ID | State |
|----|------|----------|-------|
| 1 | **Bhagwan Parshuram Institute of Technology** (BPIT) | AICTE/DEMO/10021 | Delhi |
| 2 | Indian Institute of Engineering & Technology | AICTE/INST/10001 | Maharashtra |
| 3 | Delhi National College of Engineering | AICTE/INST/10002 | Delhi |
| 4 | Chandigarh Technical Institute | AICTE/INST/10003 | Punjab |
| 5 | Uttar Pradesh Technical Academy | AICTE/INST/10004 | Uttar Pradesh |
| 6 | Jaipur Institute of Engineering & Technology | AICTE/INST/10005 | Rajasthan |
| 7 | Haryana College of Technology & Management | AICTE/INST/10006 | Haryana |
| 8 | Uttarakhand Engineering College | AICTE/INST/10007 | Uttarakhand |
| 9 | Himachal Institute of Advanced Technology | AICTE/INST/10008 | Himachal Pradesh |
| 10 | National Institute of Science & Technology | AICTE/INST/10009 | Uttar Pradesh |

Total: **10 institutions**, 553 students seeded.

---

## 🗺️ GIS State College Locator

- Component: `frontend/src/components/StateCollegeLocator.tsx`
- Data: `frontend/src/data/stateCollegesData.ts`
- BPIT is the **featured college** in Delhi (`featured: true`)
- Accessible from: AICTE Dashboard → GIS tab, Institution Dashboard → GIS tab, Nav → "GIS State Locator"
- Route: `/geo-colleges`

---

## 🐛 Bugs Fixed

### Session 1 (2026-11-01)
| Bug | Root Cause | Fix |
|-----|-----------|-----|
| Red lines everywhere in VSCode | `node_modules` missing | Ran `npm install` in `frontend/` (BypassSandbox: true) |
| `isHighContrast` errors | Removed from `LanguageContextType` | Cleaned all references; `TopGovStrip.tsx` fixed |
| High contrast mode visible | `toggleHighContrast` in TopGovStrip | Removed button + context value entirely |

### Session 2 (2026-11-02)
| Bug | Root Cause | Fix |
|-----|-----------|-----|
| Verifier (TCS) crashes whole page | `VerificationPortalPage` used in `App.tsx` but NOT imported | Added `import { VerificationPortalPage } from './pages/VerificationPortalPage'` to `App.tsx` |
| Audit button on Dashboard opens blank page | `handleNavigate()` reset `selectedInstitutionId` to null; `InstitutionProfilePage` never rendered | Fixed `handleNavigate` to parse `/institutions/:id` from route and set `selectedInstitutionId` |
| Title was "APAAR Student Data…" | Needed rebrand to PRAMAAN | Updated `Header.tsx` + `LoginPage.tsx` |

### Session 3 (2026-11-02)
| Bug | Root Cause | Fix |
|-----|-----------|-----|
| Text cutting off (e.g. `Verification Porta...` in navbar) | Navbar had 11 wide buttons with `px-3.5 whitespace-nowrap` exceeding container width, coupled with `overflow-x-auto` & hidden scrollbar without right padding | Shortened labels to concise terms (e.g. "Registry", "Validation", "Verification"), streamlined padding (`px-2.5 sm:px-3 py-2.5`), added `pr-6` scroll area so words are never cut off |
| "A new dashboard adding up again and again" when coming back from Verifier TCS | In `Navigation.tsx`, item 0 (Dashboard) and item 8 (Verification) both resolved to `id: '/verification'` with duplicate React keys (`key={item.id}`). React's reconciliation corrupted, creating duplicate DOM buttons on every switch | Assigned immutable unique `key` strings to each nav item (`item.key`), hid the redundant `Dashboard` button for `VERIFIER` role (`visible: !isVerifier`), and handled role switching atomically |
| KPI card squishing on medium laptop screens | `lg:grid-cols-6` created tight columns (~145px) at 1024px width | Updated to `sm:grid-cols-3 xl:grid-cols-6` for clean wrapping and zero clipping |
| Text truncation in Institution summary | `truncate` class in `InstitutionDashboardPage.tsx` was cutting off compliance status | Removed `truncate` to let text wrap cleanly |

---

## 📋 All Prompts / Tasks Log

### Session 1 Prompts (2026-11-01)
1. "Change the color code so it looks a different website" → Navy `#0b2545` replaces emerald `#064e3b`
2. "Change all names to North India, Avoid Iyer and all south names" → FIRST_NAMES + LAST_NAMES updated
3. "Add a new tab to dashboard use geojson to locate college in that particular state" → `StateCollegeLocator.tsx` + GEO_LOCATOR tab in both dashboards
4. "Add Bhagwan Parshuram Institute of Technology as one of the college" → BPIT featured in Delhi, also main institution in DB
5. "Remove high contrast mode" → `LanguageContext.tsx` cleaned, TopGovStrip button removed
6. "Change Team Omega Coders to Brain--Byte" → README, docs, Header, Footer, LoginPage
7. "Add Vanshika Grover in Login and everywhere" → AuthContext, LoginPage, seed_data.py, CSVs
8. "There is some problems in frontend its showing red line" → `npm install` ran

### Session 2 Prompts (2026-11-02)
1. "Change text style that looks professional and dont overlap" → Layout improvements in Header, LoginPage
2. "Check Verifier TCS and Portal on taskbar they crashes" → Fixed missing `VerificationPortalPage` import in `App.tsx`
3. "Defaulters list audit button doesn't open" → Fixed `handleNavigate` to parse institution ID from route
4. "Change title from APAAR to PRAMAAN = Platform for Reliable Academic Monitoring..." → Header + LoginPage title updated
5. "Make a Memory.md file" → Created this file

### Session 3 Prompts (2026-11-02)
1. "yeh kat rha hai aise hi same kaafi jagah kat rhe hai fix that" → Resolved text clipping in navbar and cards (compact nav buttons, right padding, responsive grid).
2. "when i am coming back from verifier tcs there's a new dashboard adding up again and again and again" → Fixed duplicate React key bug in `Navigation.tsx` and hid redundant Dashboard tab for Verifier role.
3. "continue the leftover read memory,md" → Read and fully synchronized `MEMORY.md` with all fixes and logs.
4. "readme md ko change kro project ke hisaab se team change kro Team Omega Coders likha hai use htaao and ab yeh btao iss pure ko host kaise kre" → Updated README.md (removed all Team Omega Coders references, updated to PRAMAAN & Team Brain--Byte Lead: Vanshika Grover, updated demo credentials, added step-by-step free cloud hosting guide).
5. "ashoka chakra logo ko hatao and add india.webp as logo and favicon" → Replaced the SVG Ashoka Chakra with `india.webp` in `Header.tsx`, added `india.webp` to `LoginPage.tsx`, copied to `frontend/public/india.webp`, and set as browser tab `<link rel="icon">` in `index.html`.
6. "ab check kro" → Verified Git identity successfully updated to Aditya Tiwari (`adityatiwari8008@gmail.com`), Git repository initialized, zero TypeScript errors, and both servers running smoothly.
7. "Failed to fetch AICTE summary (404 on Vercel)" → Root cause: Vercel requests were missing `/api` prefix (e.g. `/dashboard/aicte-summary` instead of `/api/dashboard/aicte-summary`). Fixed both ends: (a) Backend `main.py` now registers routes with dual prefix (`/api` and `""` root) returning 200 on both, and (b) Frontend `client.ts` now auto-normalizes `VITE_API_URL` to ensure `/api` is cleanly appended if missing.

---

## 🔧 Key Files Quick Reference

| File | Purpose |
|------|---------|
| `frontend/src/App.tsx` | Main router, role switching, navigation handlers |
| `frontend/src/context/AuthContext.tsx` | Demo users (Vanshika Grover, Ajay Kumar Sharma, Alok Srivastava) |
| `frontend/src/context/LanguageContext.tsx` | i18n (en/hi), font size — NO high contrast |
| `frontend/src/components/Header.tsx` | Logo, title (PRAMAAN), role switcher pills, demo strip |
| `frontend/src/components/Navigation.tsx` | Tab bar below header |
| `frontend/src/components/TopGovStrip.tsx` | Gov of India strip, language toggle, font size |
| `frontend/src/components/Footer.tsx` | Brain--Byte attribution |
| `frontend/src/pages/LoginPage.tsx` | Login form, demo credentials, Vanshika Grover, Brain--Byte footer |
| `frontend/src/pages/AicteDashboardPage.tsx` | AICTE admin dashboard + GEO_LOCATOR tab |
| `frontend/src/pages/InstitutionDashboardPage.tsx` | Institution dashboard + GEO_LOCATOR tab |
| `frontend/src/pages/VerificationPortalPage.tsx` | TCS verifier portal (APAAR lookup) |
| `frontend/src/components/StateCollegeLocator.tsx` | GIS map component |
| `frontend/src/data/stateCollegesData.ts` | College data per state (BPIT featured in Delhi) |
| `backend/app/seed_data.py` | DB seeder — institutions, students, names |
| `backend/app/main.py` | FastAPI app |
| `backend/asdvs.db` | SQLite database (re-seed to reset) |
| `frontend/src/locales/en.json` | English translation strings |
| `frontend/src/locales/hi.json` | Hindi translation strings |

---

## ⚠️ Constraints & Rules
- **Never use south Indian names** (Iyer, Nair, Rao, Reddy, Deshmukh, Patil, Das, Joshi)
- **Team name is exactly `Brain--Byte`** (double dash, capital B both sides)
- **Vanshika Grover** must be visible on login page + as AICTE admin user
- **BPIT** must remain featured (`featured: true`) in Delhi state data
- **High contrast mode is removed** — do not add it back
- **No layout overlap** — all text must be readable, no clipping
- **Backend institution names must match** — BPIT is institution ID 1
- **Do not change backend API logic**, only data/UI
- **npm install** requires `BypassSandbox: true` on this machine (pnpm not installed)

---

## 📁 Sample Data Files
- `sample_upload_data/sample_student_batch_127.csv` — 127 North Indian students, row 1 = Vanshika Grover
- `frontend/public/sample_upload_data/sample_student_batch_127.csv` — same (public copy)

