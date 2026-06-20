# Naira Threads — Architecture & Application Documentation

## Overview

Naira Threads is a full-featured e-commerce storefront for a premium Nigerian streetwear brand. It is built as a demo/interview project showcasing modern frontend architecture: a cinematic 3D landing page, a full shopping flow (browse → product detail → cart → checkout → order tracking), and a customer dashboard — all without a backend or real payment processor.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| 3D Graphics | React Three Fiber + Three.js + Drei |
| Animation | Framer Motion |
| State Management | Zustand (with localStorage persistence) |
| Icons | Lucide React |
| Font | Inter (Google Fonts via `next/font`) |
| Deployment | Vercel |

---

## Project Structure

```
naira-threads/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout — Navbar + Footer wrap every page
│   ├── page.tsx                # Home page (/, landing)
│   ├── shop/
│   │   ├── page.tsx            # Shop listing page with category/sort filters
│   │   └── [slug]/
│   │       ├── page.tsx        # Product detail — static generation
│   │       └── ProductDetailClient.tsx  # Client-side size selection + add to cart
│   ├── cart/page.tsx           # Cart review page
│   ├── checkout/page.tsx       # Checkout — address form + delivery estimate
│   └── dashboard/
│       ├── page.tsx            # Order history dashboard
│       └── orders/[id]/page.tsx  # Individual order status tracking
│
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx          # Fixed nav with mobile hamburger drawer
│   │   ├── CinematicHero.tsx   # 3D WebGL hero section (lazy-loaded)
│   │   ├── FeaturedCollection.tsx  # Product grid on the landing page
│   │   ├── BrandStory.tsx      # Brand narrative + imagery section
│   │   └── Footer.tsx          # Site footer with nav links
│   ├── shop/
│   │   ├── FilterBar.tsx       # Category pills + sort dropdown
│   │   ├── ProductCard.tsx     # Product thumbnail with image + price
│   │   └── ProductGrid.tsx     # Responsive grid of ProductCards
│   ├── checkout/
│   │   ├── AddressForm.tsx     # Shipping address input fields
│   │   ├── DeliveryEstimate.tsx  # Renders calculated delivery window
│   │   └── OrderSummary.tsx    # Line-item summary at checkout
│   ├── dashboard/
│   │   ├── OrderList.tsx       # Lists all past orders
│   │   └── OrderStatusTimeline.tsx  # Step-by-step order progress tracker
│   └── ui/
│       ├── Button.tsx          # Reusable button (primary / outline / ghost)
│       ├── Input.tsx           # Reusable text input
│       └── Badge.tsx           # Status label chip
│
├── store/
│   ├── cartStore.ts            # Zustand cart store (persisted to localStorage)
│   └── authStore.ts            # Zustand mock auth store (pre-authenticated demo user)
│
├── lib/
│   ├── products.ts             # Product filtering and sorting logic
│   ├── orders.ts               # In-memory order management (add, get, list)
│   ├── delivery.ts             # Delivery zone calculator (country/state → ETA)
│   ├── formatPrice.ts          # Nigerian Naira formatter (₦)
│   └── utils.ts                # cn() — class name merge utility (supports object syntax)
│
├── data/
│   ├── products.json           # Static product catalogue (8 products)
│   ├── orders.json             # Seed order data for the dashboard
│   └── locations.json          # Country/state data for checkout dropdowns
│
├── types/
│   └── index.ts                # All shared TypeScript interfaces and types
│
└── public/
    └── images/                 # Product and brand photography
        ├── clothe-1.jpg
        ├── clothe-2.jpg
        ├── clothe-3.jpg
        ├── clothe-4.jpg
        └── clothe-5.jpg
```

---

## Pages & Routing

### `/` — Home (Landing)
The root page is a server component that lazy-loads three sections:

1. **CinematicHero** — A full-screen WebGL scene built with React Three Fiber. It renders a rotating torus knot sculpture, a gold particle field, and an accent ring, all lit with point lights and an environment map. Text overlay (headline + CTA) sits on top using absolute positioning. The component is loaded with `next/dynamic` and `ssr: false` because Three.js uses browser APIs unavailable during server rendering.

2. **FeaturedCollection** — Pulls the four products marked `featured: true` from `products.json` and renders them in a 2×2 (mobile) / 4-column (desktop) grid using animated `ProductCard` components.

3. **BrandStory** — A two-column narrative section with brand copy on the left and a photo collage on the right, using real product images.

---

### `/shop` — Shop Listing
A client component that reads `?category=` from the URL via `useSearchParams` (wrapped in `<Suspense>` for Next.js static export compatibility). Users can filter by category (All / Tops / Bottoms / Outerwear / Accessories) and sort by newest, price low–high, or price high–low. Filtering and sorting are handled client-side by `lib/products.ts`.

---

### `/shop/[slug]` — Product Detail
The page shell (`page.tsx`) is a server component that statically generates all product pages at build time using `generateStaticParams`. It reads the product from `products.json` by slug and passes it down to `ProductDetailClient`, which handles size selection and cart interaction.

---

### `/cart` — Cart
Reads directly from the Zustand cart store. Shows all line items with quantity controls (increment, decrement, remove), a subtotal, and a link to checkout. Cart state is persisted in `localStorage` under the key `naira-threads-cart` so it survives page refreshes.

---

### `/checkout` — Checkout
Collects a shipping address using a country/state dropdown. As the user fills in their country and state, `lib/delivery.ts` instantly calculates a delivery estimate (no API call needed). On "Place Order", a new order object is written to the in-memory order store, the cart is cleared, and the user is redirected to their order confirmation page.

> No real payment is processed — this is a frontend-only demo.

---

### `/dashboard` — Order Dashboard
Displays all orders from the in-memory order store, with the most recent first. Each order links to its detail page.

### `/dashboard/orders/[id]` — Order Detail
Shows the full order summary and a step-by-step status timeline (Processing → Confirmed → Shipped → Out for Delivery → Delivered). The timeline visually marks each completed step.

---

## State Management

State is managed with **Zustand**, a lightweight React state library that avoids boilerplate.

### Cart Store (`store/cartStore.ts`)
The cart store is persisted to `localStorage` using Zustand's `persist` middleware.

| Action | Behaviour |
|---|---|
| `addItem(product, size)` | Adds the item or increments quantity if already in cart |
| `removeItem(id, size)` | Removes the line item entirely |
| `updateQuantity(id, size, qty)` | Updates quantity; removes item if qty ≤ 0 |
| `clearCart()` | Empties the cart (called on successful checkout) |
| `totalItems()` | Returns total item count for the cart badge |
| `subtotal()` | Returns total price in kobo/naira |

### Auth Store (`store/authStore.ts`)
A mock auth store that starts pre-authenticated with a demo user (`Chidi Okonkwo`). No login flow is implemented — this simulates a logged-in session for the dashboard.

---

## Data Layer

All data is static — no database or API calls are made at runtime.

### Products (`data/products.json`)
Eight products with `id`, `slug`, `name`, `price` (in Naira), `category`, `description`, `images[]`, `sizes[]`, `featured`, and `inStock` fields. Filtering and sorting are done in `lib/products.ts`.

### Orders (`data/orders.json`)
Seed order data pre-populated for the dashboard. At runtime, new orders placed through checkout are stored in a module-level array in `lib/orders.ts` (in-memory; resets on page reload).

### Delivery Zones (`lib/delivery.ts`)
A pure function with no external dependencies. It maps a `(countryCode, state)` pair to a delivery estimate:

| Zone | Delivery Time |
|---|---|
| Nigeria — Lagos, Abuja, Kano, Rivers | 1–2 business days |
| Nigeria — all other states | 3–5 business days |
| West Africa (GH, SN, CI, BN, TG, CM) | 5–7 days |
| Rest of Africa (KE, ZA, ET, EG) | 7–10 days |
| International | 10–18 days |

---

## Component Design Principles

- **Server vs Client split**: Pages are server components by default. The `"use client"` directive is added only where browser APIs, hooks, or interactivity are needed.
- **Lazy loading**: The 3D hero (`CinematicHero`) is loaded with `next/dynamic` to keep the initial page bundle small and avoid SSR crashes from Three.js.
- **`next/image`**: All product and brand images use the Next.js `<Image>` component with `fill` + `object-cover` for automatic optimisation and correct aspect ratios.
- **`cn()` utility**: A lightweight class-name merger in `lib/utils.ts` that supports both string and object syntax (similar to `clsx`), used across all components for conditional Tailwind classes.

---

## Mobile Responsiveness

The app is fully responsive with a mobile-first approach:

- **Navbar**: On screens smaller than `md` (768px), the desktop nav links are hidden and replaced with a hamburger (`☰`) icon. Tapping it opens a full-screen drawer overlay with all navigation links.
- **Product grids**: 2-column on mobile, 4-column on desktop (`grid-cols-2 md:grid-cols-4`).
- **Product detail**: Single-column stacked layout on mobile, side-by-side on desktop.
- **Cart & Checkout**: Stack to single column on mobile.
- **Typography**: Headline sizes scale with `md:` and `lg:` breakpoint prefixes throughout.

---

## Deployment

The app is deployed on **Vercel** via the GitHub repository [Dominic2k13/Bomach-group-interview](https://github.com/Dominic2k13/Bomach-group-interview).

### Key Vercel setting
Because the Next.js app lives inside a `naira-threads/` subdirectory of the repo, the **Root Directory** in the Vercel project settings must be set to `naira-threads`. Without this, Vercel runs `npm run build` from the repo root and fails.

### Build output
All pages except `/dashboard/orders/[id]` are statically generated at build time (marked `○` or `●` in the build output). The order detail page is dynamically server-rendered (`ƒ`) because order IDs are generated at runtime.

---

## Known Limitations (Demo Scope)

- **No backend**: Products, orders, and user data are all hardcoded or in-memory. Refreshing the page resets any orders placed during that session (cart state persists via localStorage, but orders do not).
- **No real auth**: The dashboard shows a pre-authenticated mock user. A production version would integrate NextAuth or a similar auth layer.
- **No payment gateway**: The checkout collects an address but does not process payment. Integration with Paystack or Flutterwave would be the natural next step for a Nigerian-market product.
- **No CMS**: Products are managed via `data/products.json`. A production store would connect to a headless CMS (Sanity, Contentful) or a database.
