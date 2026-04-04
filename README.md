# Personal Site - Lucas de Brito Silva

[![CodeFactor](https://www.codefactor.io/repository/github/lucs1590/personal_site/badge)](https://www.codefactor.io/repository/github/lucs1590/personal_site)

Personal portfolio built with Angular, focused on showcasing projects, publications, books, presentations, and professional recommendations. The codebase is also used as a playground for frontend architecture, i18n, accessibility, SEO, and performance practices.

Live site: [https://lucasbrito.com.br](https://lucasbrito.com.br)

## Current Features and Routes

| Feature | Route |
|---|---|
| Home | `/home` |
| Publications | `/publications` |
| Portfolio | `/portfolio` |
| Project details | `/portfolio/project/:id` |
| Books | `/books` |
| Presentations | `/presentations` |
| Recommendations | `/recommendations` |
| Contact | `/contact` |
| Privacy Policy | `/privacy-policy` |
| Not Found | `/404` |

The root route `/` redirects to `/home`.

## Tech Stack

- Angular 21
- TypeScript
- Bootstrap 5 + Animate.css + Normalize.css
- Font Awesome
- ngx-translate (English and Portuguese)
- ngx-ui-loader
- Vercel Analytics + Vercel Speed Insights

## Project Structure

```text
src/
  app/
    home/
    m-home/
    portfolio/
    secondary-components/
    services/
    models/
  assets/
    i18n/
    static_data/
```

Main points:

- Feature code lives under `src/app/`.
- Reusable sections (navbar, footer, books, publications, etc.) are in `src/app/secondary-components/`.
- Translations are in `src/assets/i18n/en.json` and `src/assets/i18n/pt.json`.
- Static datasets are in `src/assets/static_data/`.

## Local Development

### Prerequisites

- Node.js (LTS recommended)
- npm
- Angular CLI (optional globally, available via scripts)

### Install and Run

```bash
git clone git@github.com:Lucs1590/Personal_Site.git
cd Personal_Site
npm install --force
npm start
```

`npm start` uses:

- local Angular configuration (`--configuration=local`)
- local host binding (`127.0.0.1`)
- proxy config from `proxy.conf.json`

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start dev server with local environment and proxy |
| `npm run build` | Production build (`dist/personal-site`) |
| `npm run test` | Unit tests with Karma |
| `npm run lint` | Lint Angular TS/HTML with Angular ESLint |
| `npm run lint:fix` | Run lint with auto-fixes |
| `npm run e2e` | End-to-end tests with Protractor |
| `npm run release` | Standard-version release automation |

## Environment and Secrets

This project uses IP geolocation in the API service.

- Local development variables are defined in `src/environments/environment.local.ts`.
- Production uses `src/environments/environment.prod.ts` with `${IPGEOLOCATION_API_KEY}` placeholder.
- During Vercel builds, `build-vercel.sh` replaces the placeholder with the value from the `IPGEOLOCATION_API_KEY` environment variable.

See `IPGEOLOCATION_SETUP.md` for setup details.

## Deployment

Deployment target: Vercel.

- Vercel build command comes from `vercel.json` and runs `build-vercel.sh`.
- Output directory is `dist/personal-site/browser`.

## CI and Automation

GitHub Actions workflows currently include:

- CodeQL analysis (`.github/workflows/codeql-analysis.yml`)
- Lighthouse CI checks (`.github/workflows/lighthouse.yml`)
- Automated books data refresh (`.github/workflows/update-books.yml`)
- First-time contributor greeting (`.github/workflows/greatings.yml`)

## SEO and Documentation

SEO and metadata implementation notes are available in:

- `docs/SEO_METADATA_GUIDE.md`
- `docs/SEO_IMPLEMENTATION_SUMMARY.md`

## Contributing

Contributions are welcome.

1. Open an issue to discuss changes when possible.
2. Create a branch and submit a pull request.
3. Keep commits clear and scoped.

## License

This project is licensed under the MIT License.

See `LICENCE` for details.

## Disclaimer

You can use this repository as inspiration, but please avoid direct copy/paste of personal content (texts, images, profile data, and links) without adaptation and attribution.
