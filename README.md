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
git clone <repository-url>
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

> **Note:** This is a demo application with mock authentication. In a real application, never store passwords in plain text or client-side code.

## 🎨 Theme System

The application supports three theme modes:

- **Light** - Clean, bright interface
- **Dark** - Easy on the eyes for low-light environments
- **Auto** - Automatically follows system preference

Theme preference is persisted and respects system changes.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── login/
│   │   ├── LoginForm/           # Main login form component
│   │   ├── components/          # Form field components
│   │   └── ThemeSwitcher/       # Theme switching component
│   ├── success/                 # Success page with confetti
│   └── ThemeProvider/           # Theme context and logic
├── lib/
│   ├── api.ts                   # Mock API implementation
│   └── validation.ts            # Zod schemas for form validation
└── __tests__/                   # Test files
```

## 🧩 Key Components

### LoginForm

- **Validation**: Real-time validation with Zod schemas
- **Accessibility**: Full ARIA support, proper focus management
- **UX**: Loading states, clear error messages, responsive design

### ThemeSwitcher

- **Dropdown interface** with keyboard navigation
- **System preference detection** for auto mode
- **Accessible**: Full ARIA support with proper roles

### Form Fields

- **CheckboxField**: Accessible checkbox with proper labeling
- **Validation**: Integrated error states and messages
- **Consistency**: Uniform styling and behavior

## 🔧 Technologies Used

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Zod** - Runtime type validation for forms
- **Vitest** - Fast unit testing framework
- **Testing Library** - Component testing utilities
- **React Router** - Client-side routing
- **CSS Modules** - Scoped styling
- **Lucide React** - Beautiful, customizable icons
- **js-confetti** - Celebration animations

## 📱 Responsive Design

The form is fully responsive and works seamlessly across:

- **Desktop** - Full-featured experience
- **Tablet** - Optimized touch interactions
- **Mobile** - Thumb-friendly form fields and buttons

## ♿ Accessibility Features

- **Screen reader support** - Proper ARIA labels and roles
- **Keyboard navigation** - Full keyboard accessibility
- **Focus management** - Logical focus flow and visible focus indicators
- **Color contrast** - WCAG AA compliant color combinations
- **Error announcement** - Screen readers announce form errors
- **Semantic HTML** - Proper heading hierarchy and landmarks

**Built with ❤️ and best practices in mind**
