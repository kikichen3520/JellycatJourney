# Jellycat Journeys

A small full-stack web app for tracking a personal Jellycat plushie collection — search for plushies by name, add them to your collection, and manage quantities. Built as a portfolio project to practice full-stack development: auth, relational schema design, and a modern React/Next.js frontend.

## Tech Stack

- **Frontend/Backend**: Next.js (App Router, TypeScript)
- **Database**: Neon (PostgreSQL)
- **ORM**: Prisma
- **Auth**: Auth.js (NextAuth) with Google OAuth
- **Hosting**: Vercel

## Features

- [x] Sign in with Google
- [x] Search plushies by name
- [x] Add/remove plushies from your personal collection
- [x] Track quantity per item
- [x] Wishlist toggle
- [x] Responsive collection grid view

*(Checklist reflects current build status — update as features land.)*

## Live Demo

Not yet deployed. Link will go here once the project is live on Vercel.

## Getting Started

### Prerequisites

- Node.js
- A Postgres DB [Neon](https://neon.tech) account (PostgreSQL database)
- A [Google Cloud](https://console.cloud.google.com/) OAuth client ID/secret

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/jellycat-journeys.git
cd jellycat-journeys
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```bash
# Database
DATABASE_URL="your-neon-connection-string"

# Auth.js
AUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

### 4. Set up the database

```bash
npx prisma migrate dev
npx prisma db seed
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── auth/       # Auth.js route handler
│   │   ├── collection/ # CRUD endpoints for user collection
│   │   └── skus/       # SKU search endpoint
│   ├── component/
│   │   ├── AddCard.tsx         # "Add a Jelly" card in collection grid
│   │   ├── CollectionCard.tsx  # Individual plushie card
│   │   ├── CollectionList.tsx  # Owned + wishlist grid with modal
│   │   └── SkuSearch.tsx       # Search modal for finding plushies
│   └── page.tsx        # Sign-in screen + authenticated home
├── lib/
│   ├── api.ts          # Shared fetch helpers
│   ├── prisma.ts       # Prisma client singleton
│   └── types.ts        # Shared TypeScript types
└── prisma/
    ├── schema.prisma   # Database schema (User, Sku, UserCollection)
    └── seed.ts         # Seed script with Jellycat SKUs
```

## Roadmap

- [x] Phase 1: Google auth + base schema
- [x] Phase 2: Core CRUD (search, add, remove, update collection)
- [x] Phase 3: Wishlist toggle, quantity tracking
- [ ] Phase 4: Deploy to Vercel with custom domain

## License

Personal portfolio project — not for commercial use.
