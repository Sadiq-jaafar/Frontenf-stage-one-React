# AI Agent Instructions for Ticket App Frontend

This document provides essential information for AI agents working with this React-based ticket management application.

## Project Architecture

- **Framework**: React 19 + Vite with client-side routing (react-router-dom v7)
- **State Management**: Local state using React hooks (no global state management)
- **Authentication**: Mock authentication system using localStorage (`src/lib/auth.js`)
- **Build Tool**: Vite with ESBuild for fast development
- **Code Quality**: ESLint with React Hooks and Refresh plugins

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

## Common Development Patterns

### User Authentication Example

```javascript
// Login with mock system
try {
  const session = await mockLogin({ email, password });
  // Session includes user data and 6-hour expiration
  navigate("/dashboard");
} catch (err) {
  showToast(err.message, "error");
}
```

### Protected Route Pattern

```jsx
// In App.jsx
<Route
  path="/secure"
  element={
    <ProtectedRoute>
      <SecureComponent showToast={showToast} />
    </ProtectedRoute>
  }
/>
```

### Toast Notification Pattern

```jsx
function MyComponent({ showToast }) {
  const handleAction = () => {
    try {
      // Action logic
      showToast("Success!", "info");
    } catch (err) {
      showToast(err.message, "error");
    }
  };
}
```

## Development Notes

- ESLint configuration includes React hooks and refresh plugins
- TypeScript types available for React 19
- Using latest React Router v7 features
- Mock auth system in `auth.js` simulates real-world flows

When extending the application:

1. Add new routes in `App.jsx`
2. Protected routes must use `<ProtectedRoute>` wrapper
3. Use `showToast` prop for user notifications
4. Add actual API integration when moving to production
