# TicketApp — React (Vite)

This repository is the React implementation of a small ticket management demo. It focuses on a consistent layout (wave hero, decorative circles, card boxes), mock authentication (localStorage), and a full ticket CRUD UI.

Quick facts
- Framework: React 19 + Vite
- Router: react-router-dom
- Styling: plain CSS in `src/styles.css`

Getting started

1. Install deps:

```powershell
npm install
```

2. Start dev server:

```powershell
npm run dev
```

3. Build for production:

```powershell
npm run build
```

4. Preview a production build:

```powershell
npm run preview
```

Test credentials
- email: `test@ticket.app`
- password: `password`

Project structure (important files)
- `src/App.jsx` — top-level routes and global toast state
- `src/components/Layout.jsx` — container, navbar and footer (max-width: 1440px)
- `src/components/Navbar.jsx` — navigation and logout (clears `ticketapp_session`)
- `src/components/ProtectedRoute.jsx` — redirects to `/auth/login` when no session
- `src/components/Toast.jsx` — global toast UI (accepts `type`)
- `src/pages/Landing.jsx` — hero with wave and decorative circles
- `src/pages/AuthLogin.jsx`, `src/pages/AuthSignup.jsx` — auth forms (mocked)
- `src/pages/Dashboard.jsx` — stats overview
- `src/pages/Tickets.jsx`, `src/pages/TicketForm.jsx` — Ticket CRUD UI
- `src/lib/auth.js` — mock auth, session handling using `ticketapp_session`
- `src/lib/storage.js` — localStorage ticket persistence

Design and behavior notes
- Max width: the app uses `--max-w: 1440px` and centers content inside `.container`.
- Hero: implemented via `Landing.jsx` + `public/hero-wave.svg` (referenced as `/hero-wave.svg`).
- Auth: simulated with `src/lib/auth.js` and stores session under `ticketapp_session` (6-hour expiry). Protected routes use `ProtectedRoute`.
- Tickets: persisted to `localStorage` under `ticketapp_tickets`. `TicketForm.jsx` enforces required `title` and `status` (allowed: `open`, `in_progress`, `closed`).
- Toasts: `App.jsx` exposes `showToast(msg, type)` and components call it; `Toast.jsx` displays variants for `success`, `error`, and `info`.

Accessibility
- Forms include labels and `aria-describedby` for inline errors.
- Toasts use `aria-live` (errors announced assertively).

Known issues and next improvements
- Mobile navigation is a simple inline nav; a collapsible/hamburger nav would improve mobile UX.
- Storage errors are surfaced via toast when ticket loading fails, but a visual retry UI could be added.
- No automated tests included — add a small test suite for forms and storage usage if required.

If you want, I can implement the mobile collapsible nav or convert to TypeScript and add tests.
