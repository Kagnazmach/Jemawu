# ጀማዉ FPL — Fantasy Premier League Manager

A production-ready Fantasy Premier League league manager built for Ethiopian
FPL communities and Facebook groups. Combines the professional feel of the
English Premier League with Ethiopian identity and design.

## Stack

- React 18 + Vite
- Tailwind CSS
- lucide-react icons
- Firebase Authentication (email/password, admin only)
- Firebase Firestore (public read, admin write, live snapshot sync)

## Getting started

```bash
npm install
npm run dev
```

The app runs immediately with **no Firebase setup required**: without a
configured Firebase project it automatically falls back to a local demo
mode (data stored in the browser's localStorage, admin login uses a demo
account). This is intentional so you can explore every screen right away.

Local demo admin login:

- Email: `admin@jemawu.local`
- Password: `jemawu-admin`

(Change these in `src/hooks/useAdmin.js` before sharing the demo build.)

## Connecting Firebase (for live multi-device sync)

1. Create a Firebase project at https://console.firebase.google.com.
2. Enable **Authentication → Email/Password**.
3. Create your administrator account manually in the Firebase console
   (Authentication → Users → Add user), then copy that user's UID.
4. Enable **Firestore Database** (production mode).
5. Paste the rules from `firestore.rules` into Firestore → Rules, replacing
   `ADMIN_UID_HERE` with your admin's UID, then publish.
6. Open `src/lib/firebase.js` and replace the placeholder values in
   `firebaseConfig` with your project's real config (Project Settings →
   General → "Your apps" → SDK setup and configuration). The config is
   hardcoded on purpose — there is no `.env` file in this project.
7. Restart the dev server. The app detects the real config automatically
   (`firebaseConfigured` becomes `true`) and switches from local demo mode
   to live Firestore sync.

**Important:** `firebaseConfigured` is a boolean exported from
`src/lib/firebase.js`. Always use it as `if (firebaseConfigured)`, never
`if (firebaseConfigured())`.

## Data model

Everything lives in a single Firestore document: `leagues/jfpl`.

```
leagues/jfpl
├── managers: [{ id, name, teamName, squad[], startingXI[], bench[] }]
├── transfers: [{ id, managerId, playerIn, playerOut, gw, timestamp }]
├── gwScores: { [gw]: { [managerId]: { points, hits, adjusted } } }
├── awards: {
│     manager_of_the_month[], highest_gw_score[], best_transfer[],
│     most_improved[], season_champion, hall_of_fame[], custom[]
│   }
├── currentGameweek
└── lastUpdated
```

The player database (`src/lib/constants.js`) ships as a static, in-code
dataset of 300 players spread across all 20 Premier League clubs with
realistic position distribution and £4.0m–£15.0m pricing. Real rosters and
prices change every transfer window — treat this as a seed dataset and
refresh it each season by editing `PLAYERS` in that file.

## Fantasy rules enforced

- 15-player squads: 2 GKP / 5 DEF / 5 MID / 3 FWD
- £100.0m budget, enforced live while building a squad
- Max 3 players per real-world club
- Starting XI: exactly 1 GKP, at least 3 DEF, at least 1 FWD, 11 total
- Official auto-substitution logic (goalkeeper-for-goalkeeper, then
  bench-order outfield subs that keep the formation legal) — see
  `src/lib/model.js`

## Project structure

```
src/
  main.jsx, App.jsx, index.css
  lib/       firebase.js, constants.js, model.js
  hooks/     useAdmin.js, useLeagueData.js
  components/ Atoms.jsx, AdminLogin.jsx, LeaderboardTab.jsx, SquadsTab.jsx,
              TransfersTab.jsx, SubsTab.jsx, AwardsTab.jsx,
              PlayerValuesTab.jsx, GameweekPointsTab.jsx, ManagerForm.jsx
  assets/    JemawuLogo.jsx
```

## Deployment (GitHub → Vercel)

```bash
npm run build   # outputs to dist/
```

1. Push this project to a GitHub repository.
2. Import the repo in Vercel.
3. Framework preset: **Vite**. Build command: `vite build`. Output
   directory: `dist`.
4. No environment variables are needed — Firebase config is hardcoded in
   `src/lib/firebase.js` as specified.
5. Deploy.

## Future expansion

The architecture (single league document, hook-based data access, static
player database) is deliberately simple to extend toward:

- User registration and user-owned fantasy teams
- Captain / Vice-Captain, Wildcard, Bench Boost, Triple Captain, Free Hit
- Live EPL API integration for automatic gameweek scoring
- Push notifications, match predictions
- English/Amharic language switch, dark mode, offline support (PWA)
