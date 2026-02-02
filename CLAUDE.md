# LP Astro Template

Static landing page template for embedding into external websites.

## Tech Stack

- **Astro**: Static site generator for HTML pages
- **Vite**: Build tool with IIFE output format (avoids global scope pollution)
- **Tailwind CSS**: Utility-first CSS framework

## Project Structure

```
src/
├── components/common/   # Shared components (Header, Footer)
├── css/style.css        # Tailwind entry (scoped under #project-name)
├── layouts/Layout.astro # Base layout
├── pages/{project}/     # Page routes
└── scripts/main.ts      # JS entry point

util/
├── config.mjs           # ★ Project configuration (change for each project)
├── assets.ts            # Asset path helpers
└── settings.ts          # Environment detection

public/{project}/assets/ # Static assets (images, etc.)
```

## Configuration

All project settings are centralized in `util/config.mjs`:

```js
PROJECT_NAME   // URL path and container ID (e.g., 'my-project')
SITE_URL       // For OGP images
SITE_NAME      // Page title
SITE_DESCRIPTION
```

When starting a new project, update:
1. `util/config.mjs` - All ★ marked values
2. `src/css/style.css` - Container ID selector
3. `src/pages/` and `public/` - Directory names

## Commands

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run preview # Preview build
```

## Build Output

```
dist/{project-name}/
├── index.html
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── images/
```
