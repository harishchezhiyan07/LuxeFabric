# LuxeFabric™ — Premium Garment & Textile Care Web Application

A modern, responsive, and dynamic web application for luxury dry cleaning, artisanal laundry, and specialized fabric care. Built with **React 19**, **Vite**, **Tailwind CSS**, and **React Router DOM**.

---

## 🚀 Technology Stack

- **Framework & Tooling**: [React.js 19](https://react.dev) with [Vite 8](https://vite.dev)
- **Language**: JavaScript (ESNext, Modern Modular Architecture)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) with `@tailwindcss/vite`
- **Routing**: [React Router DOM v7](https://reactrouter.com)
- **State & Lifecycle Hooks**: `useState`, `useEffect`, `useRef`, and Custom Hooks (`useLocalStorage`, `useAuth`, `useBookings`)
- **Data Persistence**: `localStorage` (Client credentials, active orders, and booking records)
- **Icons**: [Lucide React](https://lucide.dev)

---

## ✨ Features & Architecture

### 1. 🌟 Dynamic Hero Carousel (`HeroSlider.jsx`)
- Utilizes `useState`, `useEffect`, and `useRef` for timing and DOM swipe handling.
- Auto-play with smooth 4.5-second interval timer.
- Pause on hover, resume on mouse leave.
- Responsive touch swipe gesture detection for mobile devices.
- Interactive dots, prev/next buttons, and pause/play controls.

### 2. 🧺 Comprehensive Services Showcase (`ServicesPage.jsx` & `ServiceCard.jsx`)
- 6 Fabric-First Care Services with high-resolution photography:
  - **Artisan Dry Cleaning** (Eco-hydrocarbon solvent)
  - **Steam Ironing & Pressing** (Wrinkle-free micro-steam)
  - **Wash & Fold Laundry** (Botanical hypoallergenic detergents)
  - **Curtain & Drapery Care** (Deep extraction without fiber shrinkage)
  - **Blanket & Comforter Care** (Down rejuvenation & ozone sanitization)
  - **Sneaker & Shoe Restoration** (Artisan hand detail & unyellowing)
- Dynamic category filters (`All`, `Delicates`, `Everyday`, `Home Care`, `Footwear`).
- Real-time search query filtering by service name and fabric keywords.
- Responsive toggle between **Split Detailed View** and **Grid View**.
- Fabric Care Knowledge Guide for Silk, Wool, Cotton, and Synthetics.

### 3. 🧮 Interactive Price Estimator (`PriceEstimator.jsx`)
- Real-time calculation based on service type, unit rate, and quantity/weight slider.
- Express 12-Hour Priority rush toggle (+30%).
- Botanical organic conditioner add-on.
- Single-click action to pass the calculated estimate directly into the booking checkout.

### 4. 📅 Advanced Doorstep Booking System (`BookingPage.jsx`)
- Pre-fills client information automatically from `AuthContext` when logged in.
- Date picker with minimum validation and 2-hour pickup window slot selector.
- Express Turnaround toggle.
- Special stain and garment care instructions input.
- Real-time order summary calculation.
- Animated confirmation modal displaying a unique tracking number (e.g. `LUX-8492`).
- Saves all bookings persistently to `localStorage`.

### 5. 📦 Real-time Order Tracking (`TrackOrderPage.jsx`)
- Search by Order Tracking ID or Phone Number.
- 5-Stage visual progress stepper:
  1. *Booking Confirmed*
  2. *Garments Collected*
  3. *Artisan Textile Wash*
  4. *Steam Press & QC*
  5. *Doorstep Delivered*
- Assigned concierge driver details and vehicle info.
- Quick 1-click test links to sample bookings.

### 6. 📋 Client Dashboard & History (`MyBookingsPage.jsx`)
- View all bookings stored in `localStorage`.
- Status filter tabs (`All`, `Active`, `Completed`, `Cancelled`).
- Color-coded real-time status badges.
- Printable digital invoice / receipt modal.
- Order cancellation modal.

### 7. 🔐 User Authentication & Persistence (`AuthContext.jsx` & `AuthModal.jsx`)
- Modal with **Sign In** and **New Client Registration** tabs.
- Form validation with inline error messaging.
- Simulated authentication feedback.
- Demo credentials 1-click autofill helper for easy testing.
- Profile greeting in sticky header with user dropdown.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
