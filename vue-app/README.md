# Ticket Management Application (Vue Version)

A Vue.js implementation of the ticket management system, allowing users to create, manage and track tickets.

## Features

- User authentication (login/signup)
- Per-user ticket management
- Real-time form validation
- Toast notifications for user feedback
- Responsive design
- Accessibility features

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. Clone the repository
2. Navigate to the vue-app directory:
```bash
cd vue-app
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

## Usage

### Authentication

- Register a new account with email and password
- Login with your credentials
- Each user has their own private ticket workspace

### Managing Tickets

- Create new tickets with title and description
- View all your tickets in a list
- Edit existing tickets
- Delete tickets you no longer need
- All changes are saved to localStorage

### User Interface

- Toast notifications for success/error feedback
- Form validation with error messages
- Responsive design works on all devices
- Accessible UI with ARIA attributes

## Project Structure

```
vue-app/
├── src/
│   ├── components/     # Reusable Vue components
│   ├── lib/           # Utilities and helpers
│   ├── pages/         # Page components
│   ├── App.vue        # Root component
│   └── main.js        # Application entry point
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Development

### Key Files

- `src/lib/auth.js` - Authentication logic
- `src/lib/storage.js` - Local storage management
- `src/components/Toast.vue` - Toast notification system
- `src/pages/*.vue` - Individual page components

### State Management

- Uses Vue's Composition API for state management
- Local storage for data persistence
- Component props for data flow
- Event emitters for component communication

### Styling

- CSS variables for theming
- Responsive design principles
- Accessible color contrast
- Consistent spacing and typography

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License
