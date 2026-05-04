# ArtStudio

ArtStudio is a React portfolio project for discovering artworks, browsing artists, learning creative skills, joining art challenges, and trying a local cart and checkout flow.

This project is built as a frontend-only demo. It uses local mock data and public JSON data so the app can feel realistic without requiring a backend.

## Main Features

- Home page with hero content, featured sections, curated artworks, artist spotlight, and newsletter signup.
- Discover page with artwork search, category browsing, trending artworks, and featured artists.
- Category pages with sorting, filters, price range, and load-more behavior.
- Artwork detail pages with related artworks and local add-to-cart behavior.
- Artist profile pages with local follow/unfollow state.
- Learn page that loads tutorial data asynchronously from `public/data/tutorials.json`.
- Challenges page with a current challenge, local submission modal, submissions gallery, and past challenges.
- Login and sign-up demo pages with Formik/Yup validation.
- Cart drawer and checkout page with local order success state.
- Artist dashboard with local upload draft and profile form behavior.
- Light/dark theme toggle saved in local storage.
- Playwright e2e coverage for key pages and user flows.

## Tech Stack

- React
- Vite
- React Router
- CSS Modules
- Formik
- Yup
- React Toastify
- React Icons
- Embla Carousel
- Playwright
- ESLint

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal. Vite usually uses:

```bash
http://localhost:5173
```

On Windows PowerShell, if `npm` is blocked by script execution policy, use `npm.cmd` instead:

```bash
npm.cmd run dev
```

## Checks and Tests

Run lint:

```bash
npm run lint
```

Run a production build:

```bash
npm run build
```

Run Playwright e2e tests:

```bash
npm run test:e2e
```

Windows PowerShell alternative:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run test:e2e
```

## Demo-only Behavior

This project does not include a backend, real accounts, real payments, uploaded file storage, email delivery, or persisted server data.

The following features are local/demo-only:

- Login and sign-up forms validate locally and do not create or authenticate real users.
- Checkout and payment fields validate locally and do not process real payments or store card details.
- Cart state is local to the running app session.
- Dashboard uploads create local draft artworks only; selected files are used for the current preview/session only.
- Dashboard profile saves update local UI state only.
- Artist follow/unfollow actions are local UI state only.
- Newsletter signup validates locally and does not send emails or join a mailing list.
- Challenge submissions are added locally for the current session and are not saved to a server.

These choices are intentional for a first serious React portfolio project. The goal is to demonstrate frontend structure, routing, UI state, forms, validation, async loading, responsive styling, accessibility basics, and e2e testing.
