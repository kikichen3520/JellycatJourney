# JellycatJourney

Jellycat collection tracker -- a small full-stack web app for tracking a personal Jellycat plushie collection — search for plushies by name, add them to your collection, and manage quantities. Built as a portfolio project to practice full-stack development: auth, relational schema design, and a modern React/Next.js frontend.

## Tech Stack

- **Frontend/Backend:** Next.js (App Router, TypeScript)
- **Database:** Neon (Postgres)
- **ORM:** Prisma
- **Auth:** NextAuth.js with Google OAuth
- **Image storage:** Cloudinary
- **Hosting:** Vercel

## Features

- [ ] Sign in with Google
- [ ] Search plushies by name (Postgres full-text search)
- [ ] Add/remove plushies from your personal collection
- [ ] Track quantity and date acquired
- [ ] Responsive collection grid view

*(Checklist reflects current build status — update as features land.)*

## Live Demo

Not yet deployed. Link will go here once the project is live on Vercel.

## Getting Started

### Prerequisites

- Node.js 18+
- A free [Neon](https://neon.tech) account (Postgres database)
- A [Google Cloud](https://console.cloud.google.com/) OAuth client ID/secret
- A free [Cloudinary](https://cloudinary.com) account (if using image upload)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
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

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary (optional, for image upload)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
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
├── app/              # Next.js App Router pages and API routes
├── prisma/
│   ├── schema.prisma # Database schema (User, Sku, UserCollection)
│   └── seed.ts       # Seed script with sample Jellycat SKUs
├── components/       # React components
└── lib/              # Shared utilities (Prisma client, auth config)
```

## Roadmap

- [ ] Phase 1: Google auth + base schema
- [ ] Phase 2: Core CRUD (search, add, remove, update collection)
- [ ] Phase 3: Full-text search, image upload, wishlist toggle
- [ ] Phase 4: Deploy to Vercel with custom domain

## License

Personal portfolio project — not for commercial use.
