# Section Eight - Modern Tech Marketplace

A Next.js e-commerce app for Nigerian tech products with secure payments and an affiliate program.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** - dark modern UI
- **Zustand** - cart, auth, affiliate state (persisted)
- **React Hot Toast** - notifications
- **Korapay Checkout Standard** - frontend modal checkout

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Payment Setup

Add your Korapay **public** key and site URL to `.env.local`:

```
NEXT_PUBLIC_KORAPAY_PUBLIC_KEY=pk_live_your_public_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get the public key from [Korapay Dashboard → Settings → API Configuration](https://dashboard.korapay.com).

Checkout uses the Korapay collections script in the browser (`Korapay.initialize`). No secret key is required for this flow.

On Netlify, set the same variables in **Site settings → Environment variables**.
Use your production URL for `NEXT_PUBLIC_APP_URL` (for example `https://sectioneight.ng`).

After changing any `NEXT_PUBLIC_*` variable, trigger a new deploy so the client bundle picks it up.

## Features

- Browse tech products (premium + budget)
- Cart with persistent storage
- Sign up / Sign in (local storage, no backend DB)
- Secure checkout modal (card, bank transfer, pay-with-bank)
- Affiliate program with 3 tiers (Starter ₦15K, Pro ₦35K, Enterprise ₦75K)
- Signed-in UI with distinct visual shell
- Optional external product API route (`/api/products/external` via Fake Store API)
