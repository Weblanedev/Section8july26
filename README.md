# Section Eight - Modern Tech Marketplace

A Next.js e-commerce app for Nigerian tech products with secure payments and an affiliate program.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** - dark modern UI
- **Zustand** - cart, auth, affiliate state (persisted)
- **React Hot Toast** - notifications
- **KoraPay** - checkout redirect integration

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## KoraPay Setup

1. Create a merchant account at [Kora Dashboard](https://dashboard.korapay.com)
2. Copy your secret key into `.env.local`:

```
KORAPAY_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Without a real key, the app runs in **demo mode** - payments simulate success locally.

See [KoraPay Checkout docs](https://developers.korapay.com/docs/checkout-redirect).

## Features

- Browse 24+ products (premium + budget tech products from at affordable prices)
- Cart with persistent storage and Pay Now drawer
- Sign up / Sign in (local storage, no backend DB)
- Checkout via KoraPay (card, bank transfer, pay-with-bank)
- Affiliate program with 3 tiers (Starter ₦15K, Pro ₦35K, Enterprise ₦75K)
- Signed-in UI with distinct visual shell
- Optional external product API route (`/api/products/external` via Fake Store API)

## Legacy App

The previous version lives in `/legacy` for reference.
