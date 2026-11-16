# Pistacia storefront preview

A responsive, custom-coded storefront concept for Pistacia, ready to review locally and host as a static GitHub Pages site. This is a standalone preview, not an installed Shopify theme.

## Run locally

With Node.js installed:

```sh
npm run dev
```

Open http://localhost:4173. No dependency installation or build is required. `npm run check` checks JavaScript syntax.

## Included

- Responsive landing page, original supplied product photography and packaging artwork.
- Product details and allergen information, quantity selection, persistent local preview bag, and email enquiry draft.
- Three serving-idea dialogs, keyboard navigation, native accessible dialogs, and reduced-motion support.
- No live checkout, payment collection, analytics, or inventory service. Pricing is deliberately on request.

## Content and assets

`assets/pistacia-jars.jpg` is the supplied jar photograph. `assets/pistachio-toast.png` was extracted from the supplied packaging PDF. Product weight, ingredients, origin and contact details come from that packaging. Serving suggestions and editorial copy are website concepts. The conflicting sugar values in the packaging have deliberately not been repeated. Confirm final label claims and nutrition information before launch.

Google Fonts loads DM Sans and Manrope when online; system font fallbacks work offline. All product imagery is local.

## GitHub Pages

After committing and pushing to GitHub, select **Settings → Pages → Deploy from a branch → main → / (root)**. All URLs are relative so project-based GitHub Pages URLs work. The local Node server is only for development.

## Future Shopify migration

Split the page into Online Store 2.0 sections (hero, story, featured product, serving ideas, footer). Move colors/type to theme settings. Replace the local product model with Shopify Liquid product/variant data, use Shopify's cart endpoints and checkout, and connect menu/contact details to store settings. Replace the preview notice with confirmed prices, delivery information, store policies and storage guidance. The current bag uses browser localStorage only and must not be used for production transactions.
