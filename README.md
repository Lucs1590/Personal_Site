# Personal Site - Lucas de Brito Silva

[![CodeFactor](https://www.codefactor.io/repository/github/lucs1590/personal_site/badge)](https://www.codefactor.io/repository/github/lucs1590/personal_site)

Welcome to my [personal website](https://lucasbrito.com.br/) repository! This project is not only about showcasing my work but also serves as a learning platform where I explore different architectures, i18n concepts, accessibility (a11y), frontend techniques, and more. The site is built on Angular and is constantly updated to keep up with the latest advancements.

Feel free to use this repository as a template or contribute to it. 😊

## Technologies Used

- Main Framework: [Angular](https://angular.io/)
- Frontend Framework: [Bootstrap](https://getbootstrap.com/)
- Icons: [Font Awesome](https://fontawesome.com/)
- Deployment: [Vercel](https://vercel.com/)
- CI/CD: [GitHub Actions](https://github.com/features/actions)
- Linting: [ESLint](https://eslint.org/)

## Features

- [About](https://lucasbrito.com.br/)
- [Publications](https://lucasbrito.com.br/publications)
- [404 Page](https://lucasbrito.com.br/404)
- [Books](https://lucasbrito.com.br/books)

Coming soon...

- Hobbies -> <https://lucasbrito.com.br/hobbies>
- Contact -> <https://lucasbrito.com.br/contact>
- Videos and Events -> <https://lucasbrito.com.br/videos-and-events>

## Navbar

The navigation bar has been built for usability, accessibility, and responsiveness across all device sizes.

### Responsive Behaviour

| Screen size | Layout |
|---|---|
| Desktop (≥ 992 px) | Horizontal link list to the right of the language toggle |
| Tablet / Mobile (< 992 px) | Hamburger button; tapping it reveals a full-width slide-down menu |

### Mobile Menu

- **Hamburger button** with animated X transition when open.
- Menu closes automatically when:
  - a navigation link is tapped,
  - the user presses **ESC**, or
  - the user clicks/taps outside the navbar.
- Touch targets are at least 44 × 44 px.

### Sticky Navbar & Scroll Behaviour

- The navbar uses `position: sticky` so it stays at the top of its scrollable container without causing layout shifts.
- **Glass / blur effect** (`backdrop-filter: blur`) is applied once the user scrolls past 60 px, giving a modern translucent appearance that degrades gracefully in unsupported browsers.
- **Smart visibility**: the navbar slides out of view when scrolling down (maximising content space) and reappears instantly when the user scrolls up.

### Active Section Tracking

Navigation links receive the `active-page` CSS class (via Angular's `routerLinkActive`) to highlight the current route at all times.

### Accessibility

- Semantic `<nav>` wrapper with `aria-label="Main navigation"`.
- Proper `<ul>` / `<li>` list structure.
- Hamburger `<button>` with `aria-expanded` and `aria-controls` attributes.
- `aria-hidden` on the collapsed mobile menu.
- `aria-current="page"` on the active link.
- Visible focus rings on all interactive elements.
- Keyboard-navigable; ESC closes the mobile menu.

### Performance

- `ChangeDetectionStrategy.OnPush` minimises unnecessary change-detection cycles.
- Scroll tracking uses a native DOM scroll listener on the closest scrollable ancestor (not a costly `window` polling loop).
- Scroll updates are gated by a minimum delta threshold to avoid repainting on micro-movements.

## Running Locally

To run this application locally, ensure that you have Node.js installed on your machine. Then, follow these steps:

```bash
git clone git@github.com:Lucs1590/Personal_Site.git
cd Personal_Site
npm install --force
npm start # or ng serve
```

For IP geolocation functionality setup (optional), see [IPGEOLOCATION_SETUP.md](IPGEOLOCATION_SETUP.md).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Lucs1590/Personal_Site/blob/master/LICENCE) for more details.

## Disclaimer

1. You are free to use this code as inspiration.
2. Please refrain from copying it directly.
3. Giving credit to the author is appreciated.

Before using this code, make sure to remove any personal information, blog posts, images, etc.
