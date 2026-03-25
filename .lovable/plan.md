

## MNH × MétaCoaching Santé — Dossiers Page

### Overview
Pixel-perfect recreation of the "Dossiers" health articles page with hardcoded French content, visual-only navigation, and interactive hover states.

### Layout & Structure

**Header (sticky)**
- Left: MNH + MétaCoaching Santé logos (text-based with brand colors: navy + teal/orange)
- Center: Nav links — ThéraSéréna, LineCoaching, TheraSomnia, LineCoaching Forme, ThéraFémina, Dossiers (underlined/active)
- Right: User avatar icon + "Syl" with chevron dropdown (visual only)
- Responsive: collapses to hamburger menu on mobile

**Page Content**
- "Retour tableau de bord" breadcrumb link at top
- **"Sommaire des dossiers"** heading in navy
- Accordion/collapsible table of contents with 3 categories, each with a colored left border:
  - Alimentation et Forme
  - Sommeil
  - Stress
- Clicking a category scrolls to that section

**Article Sections** (×3 categories)
- Each section: bold navy heading + 3 article cards in a row (single column on mobile)
- **Article Card**: rounded image on top, "Article | Category tag" label, bold title, subtle card shadow
- Hover: slight scale-up + shadow transition
- "Voir plus d'articles" link after each row (navy/blue text)

### Design Tokens
- Primary navy: ~`#1e2a5a`
- Accent blue for links/headings: ~`#2d3a8c`
- Teal accent for category borders
- Background: white/light gray `#f8f8f8`
- Cards: white with soft border-radius and shadow
- Font: clean sans-serif, strong hierarchy (large bold headings, medium card titles, small labels)

### Interactivity
- Accordion open/close for table of contents
- Hover states on cards (scale + shadow), nav links (underline), and buttons
- Smooth scroll to sections from accordion
- Responsive grid: 3 columns → 2 → 1

### Components
- `Header` — logo, nav, user menu
- `TableOfContents` — accordion with category links
- `ArticleSection` — section heading + grid of cards + "voir plus" link
- `ArticleCard` — image, labels, title with hover animation
- All on a single `Dossiers` page (Index route)

