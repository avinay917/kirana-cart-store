# 🛒 Kirana Cart (किराना कार्ट)

> **Aapki Apni Online Dukaan** — Modern, High-Performance Grocery & Kirana Store Web Application built with React, Vite, and Tailwind CSS. Designed specifically for Indian retail shops, daily grocery needs, instant cart management, WhatsApp ordering, and printable GST/Kacha bills.

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Key Features

- ⚡ **Lightning Fast UI**: Built on Vite 6 + React with smooth transitions and zero lag.
- 📦 **Authentic Indian Kirana Catalog**:
  - Dals & Pulses (Unpolished Arhar, Moong, Chana, Rajma)
  - Atta, Basmati Rice & Whole Grains
  - Whole Spices & Seasonings
  - Pure Desi Cow Ghee & Cold Pressed Oils
  - Dairy, Tea & Breakfast Essentials
  - Household Essentials & Cleaning Supplies
- 🛒 **Smart Cart & Sliding Drawer**:
  - Real-time price and discount calculations (MRP vs Selling Price in ₹ INR)
  - Free delivery threshold meter (Default: Free above ₹499)
  - Coupon Code Engine (`KIRANA10` for 10% off, `BACHATPAY` for ₹50 off)
  - Persistent cart state saved via `localStorage`
- 💬 **Direct WhatsApp Order Generator**:
  - Automatically formats the user's cart into a clean, itemized WhatsApp message for the store owner.
  - One-click ordering without complex payment gateways.
- 🚚 **Delivery Slots & Checkout Modal**:
  - 30-Minute Express Delivery, Evening Slot, or Next Morning Slot.
  - Cash on Delivery (COD), UPI (QR/GPay/PhonePe), and Dukaan Khata (Monthly Book).
- 🧾 **Printable Cash Memo / Invoice Generator**:
  - Printable Dukaan Kacha Bill / GST Cash Memo with Order ID, customer address, item breakdown, and savings summary.
  - Instant WhatsApp sharing of the invoice.
- 📱 **100% Mobile Responsive**:
  - Sticky mobile checkout pill bar, touch-friendly stepper controls, and clean layout.

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Clone the Repository
```bash
git clone https://github.com/avinay917/kirana-cart-store.git
cd kirana-cart-store
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to view the store.

### 4. Build for Production
```bash
npm run build
```
The optimized production build will be generated in the `dist` folder, ready for deployment on Vercel, Netlify, or GitHub Pages.

---

## 📁 Project Architecture

```
kirana-cart-store/
├── index.html                  # HTML entrypoint with Plus Jakarta Sans typography
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite bundler configuration
├── tailwind.config.js          # Tailwind CSS theme & color configuration
├── postcss.config.js           # PostCSS setup
├── .gitignore                  # Git ignore rules
└── src/
    ├── main.jsx                # Application root mounting CartProvider
    ├── App.jsx                 # Primary layout, filtering & responsive views
    ├── index.css               # Global Tailwind styles & custom scrollbars
    ├── data/
    │   └── products.js         # Grocery catalog, store details, categories & pricing
    ├── context/
    │   └── CartContext.jsx     # Cart state, wishlist, coupons, and localStorage sync
    └── components/
        ├── Navbar.jsx          # Header with search bar, delivery pin & cart counter
        ├── Banner.jsx          # Promotional hero banner & quick coupon buttons
        ├── CategoryFilter.jsx  # Horizontal category scrolling pills with Hindi labels
        ├── ProductCard.jsx     # Product image, discount badge, rating, & quantity stepper
        ├── CartDrawer.jsx      # Slide-over cart, free delivery progress bar & WhatsApp order
        ├── CheckoutModal.jsx   # Customer details, delivery slots & payment methods
        ├── InvoiceModal.jsx    # Printable Cash Memo (Kacha Bill) & WhatsApp bill share
        └── Footer.jsx          # Store address, contact number & accepted payment badges
```

---

## 🏷️ Demo Coupon Codes

| Coupon Code | Discount | Description |
| :--- | :--- | :--- |
| `KIRANA10` | 10% OFF | 10% instant discount across all grocery items |
| `BACHATPAY` | ₹50 OFF | Flat ₹50 instant bachat on total order |

---

## 🛠️ Customization & Configuration

To customize store details (Store Name, Phone, Address, Free delivery limits), simply edit `src/data/products.js`:

```javascript
export const STORE_INFO = {
  name: 'Kirana Cart',
  tagline: 'Aapki Apni Dukaan - Fresh Groceries in 30 Mins',
  address: 'Shop No. 4, Main Market, Sector 14, New Delhi - 110001',
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  freeDeliveryThreshold: 499,
  deliveryFee: 35,
};
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
