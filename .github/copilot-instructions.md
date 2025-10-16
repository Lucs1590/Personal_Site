# Copilot Instructions for AI Agents

## Project Overview
- This is a personal portfolio site built with Angular, showcasing work, publications, and experiments with modern frontend techniques, i18n, and accessibility.
- Main technologies: Angular, Bootstrap, Font Awesome. Deployed via Vercel, CI/CD with GitHub Actions.

## Architecture & Structure
- Source code is in `src/app/` with feature modules (e.g., `home/`, `portfolio/`, `publications/`, `secondary-components/`).
- Shared models are in `src/app/models/`.
- Services (API, utilities, scroll, etc.) are in `src/app/services/`.
- Static data (icons, publications) is in `src/assets/static_data/`.
- i18n files are in `src/assets/i18n/`.
- Environment configs: `src/environments/`.

## Developer Workflows
- **Local development:**
  - Install dependencies: `npm install --force`
  - Start frontend: `npm start` or `ng serve`
- **Testing:**
  - Run tests: `ng test` (uses Karma)
  - E2E tests: `ng e2e` (Protractor config in `e2e/`)
- **Linting:**
  - Use TSLint: `ng lint` (config in `tslint.json`)
- **Build:**
  - Production build: `ng build --prod`

## Project-Specific Patterns
- **Routing:** Centralized in `app-routing.module.ts`.
- **Component organization:**
  - Major features have their own folders under `src/app/`.
  - Reusable UI elements in `secondary-components/` (e.g., navbar, footer, modal).
- **Services:**
  - API calls and business logic are separated into Angular services.
  - Utility functions are in `utils.service.ts`.
- **Static data:**
  - Use TypeScript files in `assets/static_data/` for lists and constants.
- **Internationalization:**
  - JSON translation files per language in `assets/i18n/`.
- **Accessibility:**
  - Custom directive: `disable-when-offline.directive.ts` for offline UX.

## Integration Points
- External APIs: See `api.service.ts` for integration logic.
- Font Awesome and Bootstrap are loaded via npm and referenced in Angular components.
- Deployment is automated via Vercel and GitHub Actions (see `.github/workflows/` if present).

## Conventions
- Use Angular CLI for generating components/services.
- Prefer feature-based folder structure.
- Keep static data and translations outside of code for easy updates.
- Follow TypeScript strictness and TSLint rules.

## Examples
- To add a new publication: update `assets/static_data/sciPublications.ts` and relevant model in `models/`.
- To add a new language: create a new JSON file in `assets/i18n/` and update i18n logic in components/services.
