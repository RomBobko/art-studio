# ArtStudio

A small React frontend for an online art platform. Visitors can browse curated
artworks, explore categories, discover featured artists, and find beginner
tutorials on the Learn page.

This project is a learning / portfolio piece focused on clean component
structure, routing, and a consistent design system built with CSS Modules and
CSS custom properties.

## Tech stack

- React 19
- React Router 7
- Vite
- CSS Modules + `modern-normalize`
- `react-icons`
- ESLint (with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`)

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview

# lint the project
npm run lint
```

The dev server is served by Vite. Open the URL it prints in your terminal
(default: <http://localhost:5173>).

## Folder structure

```
src/
├── App.jsx              # Routes
├── main.jsx             # App entry point
├── assets/              # Images, logo, backgrounds
├── components/
│   ├── sections/        # Page-specific sections (grouped by page)
│   │   ├── home/
│   │   ├── discover/
│   │   └── learn/
│   └── shared/          # Reusable UI (Header, Footer, Logo, Navigation, ...)
├── data/                # Static data (artworks, artists, categories, ...)
├── layouts/
│   └── MainLayout.jsx   # Header + <Outlet /> + Footer
├── pages/               # One file/folder per route
└── styles/
    ├── variables.css    # Design tokens (colors, spacing, typography, ...)
    └── global.css       # Base/reset + container + section utilities
```

## Pages

- `/` — Home
- `/discover` — Discover (categories, trending artworks, featured artists)
- `/discover/:categorySlug` — Category page with filters + sort
- `/artworks/:artworkSlug` — Single artwork
- `/artists/:artistSlug` — Artist profile
- `/learn` — Tutorials with category filter
- `/challenges` — Placeholder ("Coming soon")
- `*` — 404 Not Found
