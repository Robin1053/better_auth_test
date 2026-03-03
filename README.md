# better_auth_test

Demo-Projekt mit **Next.js 16**, **Better Auth** und **Prisma (SQLite)**.

## Features

- E-Mail/Passwort-Login
- Social Login (Google, GitHub)
- Passkeys
- Two-Factor Authentication (2FA)
- Better Auth Plugins wie `admin`, `oneTap` und `lastLoginMethod`

## Voraussetzungen

- Node.js 20+
- npm

## Setup

1. Abhängigkeiten installieren:

   ```bash
   npm ci
   ```

2. Prisma Client generieren:

   ```bash
   npx prisma generate
   ```

3. Umgebungsvariablen setzen (z. B. in `.env`):

   ```env
   BETTER_AUTH_BASE_URL=http://localhost:3000
   BETTER_AUTH_SECRET=your-secret

   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=
   ```

4. Development-Server starten:

   ```bash
   npm run dev
   ```

App öffnen unter [http://localhost:3000](http://localhost:3000).

## Verfügbare Scripts

- `npm run dev` – Startet die App im Development-Modus
- `npm run build` – Erstellt ein Production-Build
- `npm run start` – Startet das Production-Build
- `npm run lint` – Führt ESLint aus
- `npm run db:ps` – Öffnet Prisma Studio

## Hinweise

- Das Projekt verwendet SQLite über Prisma.
- Verifizierungs-E-Mails sind auf einen lokalen SMTP-Host (`localhost:1025`) ausgelegt.
