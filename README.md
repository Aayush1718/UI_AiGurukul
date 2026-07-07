# Frontend Setup Guide

## Prerequisites

Make sure the following are installed:

- Node.js (get latest version)
- npm

Verify installation:

```bash
node -v
npm -v
```

---

## Clone the Repository

```bash
git clone <repo-url>
cd <project-folder>
```

---

## Install Dependencies

Install all project dependencies:

```bash
npm install
```

If setting up manually, install the required packages:

```bash
npm install react react-dom react-router-dom
```

### Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

---

## Run the Development Server

Start the application:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Development Workflow

Start the development server:

```bash
npm run dev
```

The application supports hot reloading, so changes will automatically appear in the browser.

---

## Mobile Testing

Open Chrome DevTools:

```text
F12 → Toggle Device Toolbar
```
---




### Port Already in Use

```bash
npm run dev -- --host
```

or update the Vite configuration to use a different port.
