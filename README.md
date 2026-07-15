<img width="1024" height="1024" alt="Gemini_Generated_Image_l5mir6l5mir6l5mi" src="https://github.com/user-attachments/assets/41aa51bd-ac7d-4c3f-b028-e81deac81d25" />

#  Artly — Art Marketplace & Gallery Platform

Artly is a full-stack art marketplace and gallery web application where art lovers can explore artworks and where registered artists can showcase and sell their own creations. Built with a modern TypeScript stack across both frontend and backend, Artly focuses on clean architecture, reusable components, secure APIs, and a polished, responsive UI/UX.

**Live Site:** [artly.vercel.app](#) &nbsp;•&nbsp; **Server Repo:** [artly-typescript-server](#)

---

## 📖 Overview

Artly lets visitors browse and explore artworks without needing an account — public access includes the home page, the Explore Art page, and individual Art Details pages. Logged-in users unlock artist features: registering as an artist, listing their own artworks for sale, and managing (viewing/deleting) their listed items from a personal dashboard.

---

## ✨ Features

### Public (No Login Required)
- 🏠 Fully responsive home page with 7 dedicated sections
- 🖼️ Explore Art page with search, filtering, sorting, and pagination
- 📄 Art Details page with full artwork info and related artworks by the same artist
- 📃 About and Terms & Conditions pages

### Authenticated Users
- 🔐 Secure registration & login via Better Auth
- 🎨 Artist registration flow
- ➕ Add new artwork listings for sale
- 📋 Manage My Artworks — view and delete personal listings
- 🚪 Protected routes with automatic redirect to `/login` for unauthenticated access

### Home Page Sections
1. **Banner / Hero** — animated carousel with clear calls to action
2. **Featured Artwork** — curated highlight pieces
3. **New Arrivals** — most recently listed artworks
4. **Our Promises** — trust & platform value highlights
5. **Reviews** — buyer/collector testimonials
6. **Artist of the Day** — spotlight on a featured artist
7. **Newsletter** — email subscription section

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | Core SPA framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| HeroUI | Accessible, prebuilt UI components |
| Framer Motion | Animations & carousel transitions |
| React Router | Client-side routing (dual layouts: main / auth) |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| TypeScript (ESM) | Type-safe backend logic |
| MongoDB Atlas | Cloud-hosted database |
| Better Auth | Authentication & session management |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend & backend hosting |

---

## 🎨 Design System

Artly follows a warm, gallery-inspired color palette (max 3 primary colors + neutrals), consistent across light and dark modes:

| Token | Light | Dark | Usage |
|---|---|---|---|
| Primary | `#C96B4B` Terracotta | `#D9805F` | Buttons, links, highlights |
| Secondary | `#3B2F2F` Espresso | `#C96B4B` | Headings, accents |
| Accent | `#6B8F71` Sage | `#85AB8B` | Tags, secondary actions |
| Background | `#FAF7F2` Warm Ivory | `#1F2937` Charcoal | Page background |
| Card | `#FFFFFF` | `#2B3543` | Card surfaces |
| Border | `#E5E7EB` | `#3D4A5C` | Dividers, outlines |
| Text | `#1F2937` | `#FAF7F2` | Primary text |
| Muted Text | `#6B7280` | `#9CA6B4` | Secondary/meta text |

All cards share a consistent size, border radius, and layout — 4 per row on desktop, adapting responsively down to a single column on mobile.

---

## 🗂️ Project Structure

```
artly/
├── artly-client/              # Frontend (Vite + React + TS)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── layouts/           # Main & Auth layouts
│   │   ├── pages/             # Route-level pages
│   │   ├── hooks/             # Custom hooks (useServerFetch, useCurrentSession, etc.)
│   │   ├── lib/                # Better Auth client, utils
│   │   └── types/             # Shared TypeScript interfaces
│   └── ...
│
├── artly-typescript-server/   # Backend (Express + TS)
│   ├── src/
│   │   ├── routes/            # API route handlers
│   │   ├── models/            # MongoDB collection interfaces
│   │   ├── lib/                # Better Auth server config
│   │   └── middleware/        # Auth guards, error handling
│   └── ...
│
└── README.md
```

---

## 🔑 Core Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home page with 7 sections |
| `/explore` | Public | Browse all artworks with search, filter & sort |
| `/explore/:id` | Public | Artwork details + related artworks |
| `/about` | Public | About the platform |
| `/terms` | Public | Terms & conditions |
| `/login` | Public | Login with demo login option |
| `/signup` | Public | User registration |
| `/beaseller` | Protected | Register as an artist |
| `/sell` | Protected | Add a new artwork listing |
| `/artistprofile` | Protected | View & delete your listed artworks |

---

## 🔍 Explore Page Functionality

- **Search** — keyword search across artwork titles
- **Filters** — filter by category, featured item, newest and oldest items
- **Pagination** — page-based navigation through results
- **Skeleton loaders** — smooth loading experience while data fetches

---

## 🔐 Authentication

Artly uses **Better Auth** for secure, session-based authentication:
- Email/password registration & login
- Protected routes on both client and server — unauthenticated users are redirected to `/login`

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas connection string
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/mahmud-abdullah-262/Artly---typescript-Assigniment-client.git
cd artly
```

### 2. Install dependencies
```bash
# Client
cd artly-client
npm install

# Server
### 1. Clone the repository
```bash
git clone https://github.com/mahmud-abdullah-262/arty-typescript-server.git
```

### 2. Install dependencies
```bash
# Client
cd artly-client
npm install
```



### 4. Run locally
```bash
# Terminal 1 — server
cd artly-typescript-server
npm run dev

# Terminal 2 — client
cd artly-client
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📦 Deployment

Both the client and server are deployed on **Vercel**. Key production considerations handled:
- Better Auth cookies configured with `SameSite=None; Secure` for cross-site requests
- ESM/CommonJS compatibility resolved for the server build
- Environment variables set per-environment in Vercel project settings

---

## 🧭 Roadmap

- [ ] Payment integration for artwork purchases
- [ ] Wishlist / favorites for buyers
- [ ] Artist analytics dashboard
- [ ] Real-time notifications for new listings

---

## 👤 Author

**Abdullah Al Mahmud**
Full-Stack Web Developer — Dhaka, Bangladesh
- GitHub: [@mahmud-abdullah-262](#)
- LinkedIn: [/in/mahmud-abdullah-webdev/](#)

---

