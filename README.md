# Anime Stats for MyAnimeList

Monorepo for the application.

Structure:
  * Two applications (`./apps`):
    * `api` -- Hono + Vite-based backend
    * `frontend` -- React 19 + Vite-based frontend
  * Shared packages (`./packages`):
    * `schema` -- Zod schemas shared between the frontend and backend to keep things DRY

This application is designed and architected to be deployed to Cloudflare Pages and is automatically built and deployed via a Git hook.

## Running locally

Use `pnpm dev`, which uses Turbo and launches both the `api` and `frontend`, simultaneously.

## Building

Use `pnpm build`, which uses Turbo and builds both the `api` and `frontend` in parallel.
