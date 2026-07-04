# Copilot Instructions for AI Agents

## Project Overview

- This is a personal portfolio site built with Angular 21, showcasing work, publications, books, talks, and experiments with i18n, SEO, and accessibility.
- Main technologies: Angular, Bootstrap, Font Awesome, ngx-translate, Vercel, and GitHub Actions.

## Architecture & Structure

- Source code lives in `src/app/` and the app is still module-based.
- Root wiring is in `src/app/app.module.ts` and routing is centralized in `src/app/app-routing.module.ts`.
- Feature areas live in folders such as `home/`, `portfolio/`, `secondary-components/`, and `m-home/`.
- Shared models are in `src/app/models/`.
- Services and directives live in `src/app/services/`.
- Static content lives in `src/assets/static_data/`.
- Translation files live in `src/assets/i18n/`.
- Environment configs live in `src/environments/`.

## Developer Workflows

- **Local development:**
  - Install dependencies: `npm install --force`
  - Start frontend: `npm start`
  - The start script serves on `127.0.0.1` with `proxy.conf.json` and the `local` Angular configuration.
- **Testing:**
  - Run unit tests: `npm test` or `ng test` (Karma + Jasmine)
  - Run e2e tests: `npm run e2e` or `ng e2e` (Protractor config in `e2e/`)
- **Linting:**
  - Run lint: `npm run lint` or `ng lint`
  - Fix lint issues: `npm run lint:fix`
  - The project uses `@angular-eslint`, not TSLint.
- **Build:**
  - Production build: `npm run build` or `ng build --configuration=production`

## Project-Specific Patterns

- **Routing:** Keep route changes in `src/app/app-routing.module.ts`.
- **Component organization:**
  - Major features have their own folders under `src/app/`.
  - Reusable UI elements live in `secondary-components/`.
- **Current Angular style:**
  - The codebase is not fully migrated to standalone components yet.
  - Follow the existing module-based structure unless the task is explicitly a migration.
- **Services:**
  - API, SEO, canonical URL, scroll, and utility logic are separated into Angular services.
- **Static data:**
  - Use TypeScript files in `src/assets/static_data/` for lists and constants.
- **Internationalization:**
  - JSON translation files per language live in `src/assets/i18n/`.
- **Accessibility and SEO:**
  - Keep accessibility and metadata updates aligned with the existing `SeoService`, `CanonicalService`, and offline UX directive.

## Integration Points

- External APIs are handled through `src/app/services/api.service.ts` and related services.
- Font Awesome, Bootstrap, normalize.css, animate.css, jQuery, Popper, and particles.js are loaded through Angular build configuration and component usage.
- Deployment is automated via Vercel and GitHub Actions.

## Conventions

- Use Angular CLI for generating components and services.
- Prefer the existing feature-based folder structure.
- Keep static data and translations outside of code so updates stay simple.
- Follow the project’s TypeScript and `@angular-eslint` conventions.
- Prefer the current app patterns over introducing a new architectural style in isolated changes.

## Examples

- To add a new publication: update the relevant file in `src/assets/static_data/` and the matching model in `src/app/models/` if needed.
- To add a new language: create a new JSON file in `src/assets/i18n/` and update the translation logic in the relevant services or components.
