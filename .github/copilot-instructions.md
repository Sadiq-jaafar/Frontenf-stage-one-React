# AI Agent Instructions for Ticket App Frontend

This document provides essential information for AI agents working with this React-based ticket management application.

## Project Architecture

- **Framework**: React + Vite with client-side routing (react-router-dom)
- **State Management**: Local state using React hooks (no global state management)
- **Authentication**: Mock authentication system using localStorage (`src/lib/auth.js`)

### Key Components and Files

- `App.jsx`: Root component with route definitions and toast notifications
- `components/Layout.jsx`: Common layout wrapper for all pages
- `components/ProtectedRoute.jsx`: Route guard for authenticated routes
- `pages/*`: Page components for different routes
- `lib/auth.js`: Authentication utilities and mock login logic
- `lib/storage.js`: Local storage utilities

## Development Workflow

1. Start development server:

```bash
npm run dev
```

2. Build for production:

```bash
npm run build
```

3. Preview production build:

```bash
npm run preview
```

## Patterns and Conventions

### Authentication Flow

- Mock authentication using `mockLogin()` in `auth.js`
- Test credentials: email: 'test@ticket.app', password: 'password'
- Session stored in localStorage with 6-hour expiration
- Protected routes wrapped with `<ProtectedRoute>` component

### Toast Notifications

- Global toast system managed in `App.jsx`
- Usage: `showToast(message, type)` where type is 'info' (default), 'error', etc.
- Automatically dismisses after 3.5 seconds

### Routing

- Client-side routing using `react-router-dom`
- Protected routes under `/dashboard` and `/tickets`
- Public routes: `/`, `/auth/login`, `/auth/signup`

## Integration Points

- Authentication state shared via localStorage
- Toast notifications passed down via props
- All API calls currently mocked in `auth.js`

## Development Notes

- ESLint configuration can be expanded for production use
- TypeScript support can be added following the TS template
- Project uses Vite's Fast Refresh via `@vitejs/plugin-react`

When extending the application:

1. Add new routes in `App.jsx`
2. Protected routes must use `<ProtectedRoute>` wrapper
3. Use `showToast` prop for user notifications
4. Authenticate using mock system in development
