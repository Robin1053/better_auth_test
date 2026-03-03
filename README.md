[![Last Commit](https://img.shields.io/github/last-commit/Robin1053/better_auth_test)](https://github.com/Robin1053/better_auth_test/commits/main)
[![Open Issues](https://img.shields.io/github/issues/Robin1053/better_auth_test)](https://github.com/Robin1053/better_auth_test/issues)
[![Repo Size](https://img.shields.io/github/repo-size/Robin1053/better_auth_test)](https://github.com/Robin1053/better_auth_test)
[![Top Language](https://img.shields.io/github/languages/top/Robin1053/better_auth_test)](https://github.com/Robin1053/better_auth_test)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)

# better_auth_test

`better_auth_test` ist ein Auth-Demo-Projekt mit **Next.js 16**, **Better Auth** und **Prisma (SQLite)**.
Der Fokus liegt auf modernen Login-Flows (inkl. OAuth, Passkeys und 2FA) mit einer UI auf Basis von React/MUI.

## ✅ Aktueller Projektaufbau

```text
./
├── src/
│   ├── app/                 # Next.js App Router Seiten & API Routes
│   ├── Components/          # UI- und Auth-Komponenten
│   └── lib/                 # Auth-/Mail-/Prisma-nahe Logik
├── prisma/
│   └── schema.prisma        # Prisma Schema (SQLite)
├── better-auth_migrations/  # Better Auth Migrationen
└── README.md
```

## Hauptfunktionen

- E-Mail/Passwort-Authentifizierung
- Social Login über Google und GitHub
- Passkey-Unterstützung
- Two-Factor Authentication (2FA)
- Better-Auth-Plugins (`admin`, `oneTap`, `lastLoginMethod`, `twoFactor`)

## Voraussetzungen

- Node.js 20+
- npm

## Entwicklung (lokal)

1. Abhängigkeiten installieren:

   ```bash
   npm ci
   ```

2. Prisma Client generieren:

   ```bash
   npx prisma generate
   ```

3. Umgebungsvariablen in `.env` setzen:

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

Danach ist die App unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Verfügbare Scripts

- `npm run dev` – Entwicklungsserver starten
- `npm run build` – Production-Build erstellen
- `npm run start` – Production-Build starten
- `npm run lint` – ESLint ausführen
- `npm run db:ps` – Prisma Studio öffnen

## Konfiguration & Hinweise

- Datenbank: SQLite via Prisma
- Prisma-Client-Ausgabe: `generated/prisma`
- Mail-Verifizierung ist auf lokalen SMTP-Host (`localhost:1025`) ausgelegt
