# Remie Website

Responsive web prototype built from `../REMIE_WEBSITE_PRD.md`.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The compiled website is written to `dist/`.

## Free hosting

The site deploys to GitHub Pages whenever `main` is updated. GitHub Pages is
configured for the custom domain `remiekitchen.com` through `public/CNAME`.

After creating and pushing the GitHub repository:

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. At the domain registrar, point the apex domain to GitHub Pages and add a
   `www` CNAME pointing to the repository's `github.io` hostname.
4. Enable **Enforce HTTPS** after GitHub verifies the DNS records.

## Included

- Public marketing landing page
- Responsive desktop, tablet, and mobile application shell
- Kitchen presence scene and friend feed
- Search and personalized results
- Diary and recipe-version treatment
- Saved recipes
- Cookbook bookshelf and list views
- Compact Me profile structure
- Recipe detail and friend-profile overlays
- Interactive likes, comments, saves, navigation, profile editing, and view toggles

This first website build uses local seeded data. Authentication, database persistence, uploads, realtime presence, AI calls, and video infrastructure are the next backend integration layer.
