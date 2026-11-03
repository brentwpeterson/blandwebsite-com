# blandwebsite.com

A completely bland, AI-made company website. Every word and every Jack Russell is AI-generated. Want words a human wrote? https://contentcucumber.com/

- Theme: [Astro Wellness](https://github.com/DomeT99/astro-wellness) by Domenico Tenace, MIT (see `THEME-LICENSE`). Forced to dark mode, theme toggle removed.
- Content lives in `src/data/*.ts` and `src/content/blog/`. Images in `src/assets/images/`.
- Hosting: AWS Amplify, auto-deploys on push to `main`. Node 24 via `amplify.yml`.
- Local: `npm run dev -- --port 3013` (or `/run-local bland`).

## Blog

Posts come from two places, merged newest first by `src/utils/posts.ts`:

- Markdown files in `src/content/blog/`
- RequestDesk, agent "Bland Website" (`6ae9f063d82dfbd2fd3daeb7`), read from `/api/astro-proxy/blog-posts` at build time

Publishing a post in RequestDesk fires the Amplify webhook on the "Bland Website" Astro site record, which rebuilds the site. The build needs `AGENT_API_KEY` and `BACKEND_URL` (Amplify branch env vars; `.env` locally, gitignored) and fails loudly without them, so a broken key never ships a blog with the RequestDesk posts silently missing. A slug used by both sources also fails the build.
