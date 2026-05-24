# DevDash — Sales Analytics Dashboard

A real-time sales analytics dashboard I built to track revenue, conversions, active users, and team performance all in one place. Dark theme, responsive, no backend needed.

## Tech Stack

| What | Why |
|---|---|
| **React ** + **TypeScript** | Main framework, keeps things type-safe |
| **Vite ** | Fast builds and hot reload, way better than CRA |
| **Tailwind CSS ** | Utility-first, all styling is custom classes |
| **GSAP 3** | Page-load animations on the sidebar and layout |

## Project Structure

```
Dashboard/
├── public/                        # Static stuff (favicon)
│   ├── assets/images/             # Placeholder images folder
│   └── favicon.svg                # Little chart icon I made
├── src/
│   ├── App.tsx                    # Routes: / → Dashboard, * → NotFound
│   ├── main.tsx                   # Entry point (ReactDOM + BrowserRouter)
│   ├── vite-env.d.ts             # Vite type references
│   ├── styles/
│   │   └── index.css              # All CSS variables, Tailwind layers, keyframes
│   ├── components/
│   │   ├── AppLayout.tsx          # Wraps sidebar + topbar + page content
│   │   ├── Sidebar.tsx            # Nav links, GSAP mount animation
│   │   ├── Topbar.tsx             # Header with search, notifications, avatar
│   │   ├── ui/
│   │   │   ├── AppIcon.tsx        # Dynamic heroicons wrapper
│   │   │   ├── AppImage.tsx       # Image with fallback handling
│   │   │   └── AppLogo.tsx        # Logo with text fallback
│   │   └── dashboard/
│   │       ├── MetricsBentoGrid.tsx   # 4 metric cards in a grid
│   │       ├── RevenueChart.tsx       # Area chart with gradient fill
│   │       ├── ChannelBarCharts.tsx   # Stacked revenue by channel
│   │       ├── ConcersionFunnel.tsx   # Funnel chart (visitors → sales)
│   │       ├── RepLeaderBoard.tsx     # Sales rep ranking table
│   │       ├── ActivityFeed.tsx       # Scrollable activity timeline
│   │       └── GoalRedialChart.tsx    # Radial goal progress gauge
│   └── pages/
│       ├── Dashboard.tsx          # Main dashboard — imports all widgets
│       └── NotFound.tsx           # 404 page with go-back button
├── index.html                     # HTML entry with root div
├── setup.bat                      # Quick-start script (Windows)
├── package.json
├── tsconfig.json
├── vite.config.ts                 # Path alias @/ → src/, port 4028
├── tailwind.config.js             # Custom color tokens via CSS vars
└── postcss.config.js              # Tailwind + Autoprefixer
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4028](http://localhost:4028). Everything is client-side — no backend, no database, no API keys needed.

## Scripts

- `npm run dev` — Dev server at localhost:4028
- `npm run build` — TypeScript check + production build to `dist/`
- `npm run preview` — Preview the production build
- `npm run lint` — ESLint check
- `npm run format` — Prettier formatting

## Notes

- The sidebar nav links all point to `/` since this is a single-page dashboard. No multi-page routing needed yet.
- All chart data is hardcoded mock data in each component — swap it out with real API calls whenever.
- Images in `public/assets/images/` don't exist yet, so the logo/avatar fall back to text initials gracefully.
- The theme is a teal/violet dark scheme using CSS custom properties — easy to tweak in `src/styles/index.css`.
- Port 4028 because that's what I had open. Change it in `vite.config.ts` if it conflicts.
