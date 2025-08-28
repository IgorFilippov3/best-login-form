# Best Login Form 🔐

This project demonstrates modern React development patterns, comprehensive testing strategies, and accessibility-first design principles.

## ✨ Features

- **Modern React 19** with TypeScript
- **Comprehensive form validation** with Zod schema validation
- **Full accessibility support** (WCAG compliant)
- **Dark/Light/Auto theme switcher** with system preference detection
- **Responsive design** that works on all devices
- **Comprehensive test coverage** with Vitest and Testing Library
- **Confetti celebration** on successful login 🎉
- **Error handling** with user-friendly messages
- **Clean, semantic HTML** structure

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/IgorFilippov3/best-login-form.git
cd best-login-form

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI interface
npm run test:run     # Run tests once
npm run lint         # Run ESLint
```

## 🧪 Testing

The project includes comprehensive test coverage for all components:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:run -- --coverage

# Run tests with UI
npm run test:ui

# Run specific test file
npm test LoginForm.test.tsx
```

### Test Coverage Includes:

- **Form validation** - Email format, required fields, error states
- **User interactions** - Form submission, field interactions, keyboard navigation
- **Theme switching** - Light/dark/auto themes with proper ARIA attributes
- **Accessibility** - Screen reader support, keyboard navigation, focus management
- **API integration** - Mock API calls and error handling
- **Success page** - Confetti animation and cleanup

## 🔑 Mock User Credentials

For testing purposes, use these predefined user accounts:

| Email               | Password   | Description           |
| ------------------- | ---------- | --------------------- |
| `test@example.com`  | `1234`     | Standard test user    |
| `admin@example.com` | `admin`    | Admin test account    |
| `user@test.com`     | `password` | Alternative test user |

> **Note:** This is a demo application with mock authentication.

## 🎨 Theme System

The application supports three theme modes:

- **Light** - Clean, bright interface
- **Dark** - Easy on the eyes for low-light environments
- **Auto** - Automatically follows system preference

Theme preference is persisted and respects system changes.

## ♿ Accessibility Features

- **Screen reader support** - Proper ARIA labels and roles
- **Keyboard navigation** - Full keyboard accessibility
- **Focus management** - Logical focus flow and visible focus indicators
- **Color contrast** - WCAG AA compliant color combinations
- **Error announcement** - Screen readers announce form errors
- **Semantic HTML** - Proper heading hierarchy and landmarks

**Built with ❤️ and best practices in mind**
