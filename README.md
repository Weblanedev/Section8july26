# Section Eight - Modern Tech Marketplace

A Next.js e-commerce app for Nigerian tech products with secure payments and an affiliate program.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** - dark modern UI
- **Zustand** - cart, auth, affiliate state (persisted)
- **React Hot Toast** - notifications
- Secure checkout redirect integration

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Payment Setup

Add your payment secret key and public site URL to `.env.local`:

```
KORAPAY_SECRET_KEY=your_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

On Netlify, set the same variables in **Site settings → Environment variables**.
Use your production URL for `NEXT_PUBLIC_APP_URL` (for example `https://sectioneight.ng`).

Payments will not initialize until `KORAPAY_SECRET_KEY` is set.

## Features

- Browse tech products (premium + budget)
- Cart with persistent storage
- Sign up / Sign in (local storage, no backend DB)
- Secure checkout (card, bank transfer, pay-with-bank)
- Affiliate program with 3 tiers (Starter ₦15K, Pro ₦35K, Enterprise ₦75K)
- Signed-in UI with distinct visual shell
- Optional external product API route (`/api/products/external` via Fake Store API)
