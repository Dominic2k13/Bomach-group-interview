# Naira Threads — E-Commerce Frontend

A production-quality frontend demo for a premium Nigerian streetwear brand, built as a technical interview project. No real backend — all data is mocked via local JSON files and in-memory state.

---

## Tech Stack & Rationale

| Technology | Why |
|---|---|
| **Next.js 14 (App Router)** | App Router enables per-page server/client boundaries, built-in layouts, and `next/dynamic` for lazy-loading the 3D canvas. Pages Router is legacy — App Router is the current standard. |
| **TypeScript (strict)** | Catches shape mismatches at compile time. All data types (`Product`, `Order`, `Address`, etc.) are defined once in `/types` and imported everywhere — no duplicated inline types. |
| **Tailwind CSS** | Utility-first keeps styles co-located with components. No context-switching between CSS files. The consistent design tokens (color palette, spacing scale) enforce visual consistency across every page. |
| **React Three Fiber + drei** | Declarative Three.js in React JSX. Writing 3D scenes as components makes them composable and readable. `drei` provides ready-made helpers (Float, Environment) that would take hours to write from scratch. |
| **Framer Motion** | Production-grade animation with a clean, declarative API. Handles page transitions, scroll-triggered reveals, and list animations with minimal boilerplate. |
| **Zustand** | Lightweight client state for cart and mock auth. Redux is architecturally overkill for a frontend-only demo — Zustand gives you the same patterns in ~20 lines per store. |

---

## Getting Started

```bash
cd naira-threads
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
/app                        → Routes only (Next.js App Router pages & layouts)
  /shop/[slug]              → Dynamic product detail pages
  /cart                     → Cart page
  /checkout                 → Checkout with delivery estimate
  /dashboard                → Mock user dashboard
  /dashboard/orders/[id]    → Order tracking detail

/components
  /ui                       → Generic reusable atoms: Button, Input, Badge
  /landing                  → Navbar, Footer, CinematicHero, FeaturedCollection, BrandStory
  /shop                     → ProductCard, ProductGrid, FilterBar
  /checkout                 → AddressForm, DeliveryEstimate, OrderSummary
  /dashboard                → OrderList, OrderStatusTimeline

/lib                        → Pure logic, no UI imports
  delivery.ts               → Delivery estimate calculation (pure function)
  formatPrice.ts            → NGN price formatter
  products.ts               → Product filtering and lookup
  orders.ts                 → In-memory order store with seed data
  utils.ts                  → cn() class name utility

/store                      → Zustand stores
  cartStore.ts              → Cart state (persisted to localStorage)
  authStore.ts              → Mock auth state

/data                       → Static mock data
  products.json             → 8 products across 4 categories
  orders.json               → 2 seed orders with full tracking history
  locations.json            → Countries and Nigerian states

/types
  index.ts                  → All shared TypeScript interfaces (Product, Order, Address, etc.)
```

---

## Features

### Landing Page (`/`)
- **Cinematic 3D Hero** — React Three Fiber canvas with a rotating torus knot sculpture, gold particle field, and accent ring. Lazy-loaded with `next/dynamic` to prevent SSR crashes. HTML headline/CTA overlaid with absolute positioning. Dark cinematic lighting via `pointLight` + `Environment`.
- **Featured Collection** — scroll-animated product grid using Framer Motion `whileInView`.
- **Brand Story** — split-layout section with staggered entrance animations.

### Shop / Catalog (`/shop`)
- Product grid with filter by category (tops, bottoms, outerwear, accessories) and sort by price or newest.
- URL param sync: `/shop?category=outerwear` pre-filters the grid. Useful for nav links.
- AnimatePresence in ProductGrid animates items in/out when filters change.

### Product Detail (`/shop/[slug]`)
- Size selector with visual active state.
- Add to cart with 2-second "Added to Cart" confirmation.
- `generateStaticParams` makes these pages statically optimised at build time.

### Cart (`/cart`)
- Line items with quantity controls (+ / - / trash).
- Zustand `persist` middleware saves cart to `localStorage` so it survives page refresh.
- Subtotal calculated from store state, not derived redundantly.

### Checkout (`/checkout`)
- Address form with dynamic country/state selection.
- Delivery estimate updates **live** as the user selects country/state.
- "Place Order" writes a new order to the in-memory order store, clears the cart, and redirects to the order tracking page.

### Client Dashboard (`/dashboard`)
- Mocked authentication via `authStore` — simulates a logged-in user without any real auth flow.
- Lists all orders (seed data + any placed in the current session).

### Order Tracking (`/dashboard/orders/[id]`)
- Full status timeline (Order Placed to Delivered) with visual progress indication.
- Shows delivery estimate zone and expected delivery date.
- Newly placed orders appear immediately — demonstrates session-level state working correctly.

---

## Delivery Estimation Logic

Implemented in `lib/delivery.ts` as a **pure function** with no UI imports or side effects. Takes `countryCode` (ISO 3166-1 alpha-2) and `stateOrRegion` as inputs, returns a `DeliveryEstimate` object.

**Rules:**

| Destination | Estimate |
|---|---|
| Nigeria — Lagos, Abuja (FCT), Kano, Rivers | 1–2 business days |
| Nigeria — all other states | 3–5 business days |
| West Africa (GH, SN, CI, BN, TG, CM) | 5–7 days |
| Rest of Africa (KE, ZA, ET, EG) | 7–10 days |
| International (Europe, US, CA, everywhere else) | 10–18 days |

The function is a pure structure (sets of known codes) — easy to extend, easy to unit test without mounting any component. It is called from the checkout page via a `useEffect` that watches the address fields, so the estimate updates reactively as the user fills in their location.

---

## What's Mocked vs. What Needs a Real Backend

| Feature | Current (Mock) | Production Requirement |
|---|---|---|
| Authentication | Zustand store with hard-coded user | Real auth (NextAuth.js, Supabase Auth, etc.) |
| Product data | `data/products.json` | Database + CMS (Sanity, Contentful) |
| Orders | In-memory array, resets on server restart | Persistent database + order management system |
| Payments | "Place Order" button with no processing | Paystack, Flutterwave, or Stripe |
| Delivery estimates | Rule-based pure function | Real shipping API (DHL, GIG Logistics, etc.) |
| Product images | Placeholder coloured divs | Image CDN (Cloudinary, Vercel Blob) with next/image |
| Inventory | All products always in stock | Real inventory tracking with stock deduction on checkout |

---

## Known Limitations / What I'd Improve With More Time

1. **Real images** — product cards use placeholder divs. Production would use `next/image` with a CDN, optimised WebP delivery, and aspect-ratio skeletons.
2. **Auth guards** — the dashboard is publicly accessible. Production would use Next.js middleware to redirect unauthenticated requests.
3. **Form validation** — checkout checks only for non-empty fields. `react-hook-form` + `zod` would give per-field validation with better error UX.
4. **Accessibility** — the 3D canvas needs `role="img"` and `aria-label`. Focus management on mobile nav needs audit.
5. **Testing** — `lib/delivery.ts` is the natural first unit test target. Component tests with React Testing Library for cart interactions.
6. **Mobile 3D performance** — on low-end mobile, the particle field could be replaced with a static fallback via `prefers-reduced-motion`.
7. **SEO** — product pages need dynamic `generateMetadata` for per-product title/description/OG image tags.
