# AGENTS.md — landing-page

## Overview

Marketing website for infinidream.ai. Next.js static site with sections for features, gallery, team, roadmap, and contact.

## Stack

- **Framework:** Next.js 15 with Turbopack
- **Language:** TypeScript, React 19
- **Styling:** Tailwind CSS 4, PostCSS
- **UI:** Radix UI, Lucide React icons, FontAwesome
- **Animation:** Motion library
- **Code Quality:** Biome (linting/formatting)
- **Package Manager:** pnpm

## Project Structure

```
src/
  app/              # Next.js app directory (layout.tsx, page.tsx)
  components/
    ui/             # Base UI components (Radix-based)
    layout/         # Container, Footer, NavBar
    VideoModal/     # Video modal functionality
  sections/         # Page sections (hero, gallery, team, roadmap, etc.)
  contexts/         # React context providers
  hooks/            # Custom React hooks
  lib/              # Utility functions
  constants/        # Application constants
public/             # Static assets, images, videos
```

## Commands

```bash
pnpm install          # Install dependencies
pnpm run dev          # Dev server with Turbopack
pnpm run build        # Production build (static export to out/)
pnpm run start        # Production server
pnpm run biome:lint   # Lint and auto-fix
pnpm run biome:format # Format code
pnpm run biome:check  # Run all checks (lint + format)
```

## Key Patterns

- Server components by default, client components where needed
- Section-based page architecture
- React context for modal state management
- Responsive Tailwind CSS design with custom animations

## Deployment

Cloudflare — auto-deploy on push to `main`.
