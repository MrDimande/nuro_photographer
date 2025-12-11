# 📸 Nuro De Sousa — Editorial Photography Portfolio

A cinematographic, scroll-driven portfolio experience inspired by Apple.com, featuring premium motion design, editorial layout, and full backend integration.

![Nuro Photographer](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)

## Features

### Frontend

- **Apple-style Smooth Scrolling** — Lenis integration for natural inertia
- **Scroll-driven Animations** — Framer Motion parallax and reveals
- **Editorial Layout** — Asymmetric, dynamic visual rhythm
- **Premium CSS Effects** — Light sweep, glass morphism, subtle glow
- **60fps Performance** — GPU-accelerated, optimized animations
- **Responsive Design** — Mobile-first, fluid typography

### Backend

- **Contact Form** — Submissions stored in Supabase
- **Email Notifications** — Automatic email via Resend API
- **Availability Calendar** — Dynamic, synced with admin panel
- **Google Calendar Sync** — Events created when dates marked busy
- **Admin Dashboard** — Manage contacts and availability

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React, Vite, Framer Motion, Tailwind CSS |
| **Smooth Scroll** | Lenis |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Email** | Resend API |
| **Calendar** | Google Calendar API |
| **Deploy** | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Resend account (for emails)

### Installation

```bash
# Clone repository
git clone https://github.com/your-repo/nuro-photographer.git
cd nuro-photographer

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create `.env.local` with:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Resend)
RESEND_API_KEY=re_xxxxx

# Google Calendar (optional)
GOOGLE_CALENDAR_ID=your_email@gmail.com
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
```

### Database Setup

Run `supabase/schema.sql` in Supabase SQL Editor to create:

- `contact_submissions` table
- `availability` table
- Row Level Security policies

## 📁 Project Structure

```
├── api/                    # Vercel Serverless Functions
│   ├── contact.js          # Contact form submission
│   ├── availability.js     # Get availability data
│   ├── send-email.js       # Email notifications
│   └── calendar-sync.js    # Google Calendar sync
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer
│   │   ├── ui/             # Reusable UI components
│   │   └── editorial/      # Editorial layout components
│   ├── hooks/
│   │   ├── useLenis.js     # Smooth scroll
│   │   ├── useAvailability.js  # Fetch availability
│   │   └── useContactForm.js   # Form submission
│   ├── lib/
│   │   └── supabase.js     # Supabase client
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── Portfolio.jsx   # Gallery
│   │   ├── About.jsx       # About page
│   │   ├── Contact.jsx     # Contact + Calendar
│   │   └── Admin.jsx       # Admin dashboard
│   └── App.jsx             # Main router
├── supabase/
│   └── schema.sql          # Database schema
└── vercel.json             # Vercel configuration
```

## 🔐 Admin Panel

Access: `/admin`

Features:

- **Login** — Supabase Auth
- **Contacts Table** — View and manage form submissions
- **Availability Manager** — Click dates to mark busy/free/partial
- **Google Calendar Sync** — Auto-sync when changing availability

## 🎨 Design Philosophy

### Motion Rules

1. **If the user notices the animation, it's wrong**
2. **Less movement = more luxury**
3. **Performance always 60fps**
4. **Elegance > flashy effects**

### CSS Effects

- `light-sweep` — Subtle shimmer on titles
- `glass` / `glass-light` — Frosted glass panels
- `card-editorial` — Premium hover effects
- `appleEase` — [0.25, 0.1, 0.25, 1] cubic bezier

## � Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect GitHub repo at [vercel.com/new](https://vercel.com/new)

### Environment Variables (Vercel Dashboard)

Add all variables from `.env.local` to:
**Settings → Environment Variables**

## 📧 Email Template

Contact form submissions send styled HTML emails with:

- Client details (name, email, phone)
- Service requested
- Preferred date
- Message content
- Quick reply buttons (WhatsApp, Email)

## 📅 Google Calendar Setup

1. Create Service Account in Google Cloud Console
2. Enable Google Calendar API
3. Download JSON key
4. Share calendar with service account email
5. Add key to `GOOGLE_SERVICE_ACCOUNT_KEY`

## 🔧 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## 📄 License

© 2025 Nuro De Sousa. All rights reserved.

---

**Crafted with precision and attention to detail by Mr. Dimande.**

Proudly powered by **BMC Pro Services** and **BrainyWrite** — Elevating academic and creative excellence through innovative solutions and expert advisory.
