# Interactive Web Dashboard UI

This is a code bundle for Interactive Web Dashboard UI. The original project is available at https://www.figma.com/design/mzJ7DoEl0UHVczgDNjgSZl/Interactive-Web-Dashboard-UI.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Features

- **Pest Infestation Intelligence** dashboard with filters: District, Taluka, Crop, Season, Pest, Disease, Timeline
- **Survey Cadence & Action** dashboard with filters: District, Taluka, Officer Level, Season, Plot Type, Timeline
- **Timeline** filter supports preset ranges (7, 14, 21, 28 days) and custom date range picker
- **Sidebar navigation** with expandable Incidence Reports and Survey Reports dropdowns
- Responsive design with Tailwind CSS

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

1. Push to `main` branch → workflow builds and deploys automatically
2. Enable GitHub Pages in repository settings:
   - Go to **Settings → Pages**
   - Set **Source** to **GitHub Actions**
3. Your site will be live at: `https://Aryan0854.github.io/Freelance-Design/`

**Note:** URLs use hash-based routing (e.g., `/Freelance-Design/#/dashboard`) for compatibility with GitHub Pages.

## Manual build

Run `npm run build` to create a production build in the `dist/` folder.
