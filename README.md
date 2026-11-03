# blandwebsite.com

A completely bland, AI-made company website. Every word and every Jack Russell is AI-generated. Want words a human wrote? https://contentcucumber.com/

- Theme: [Astro Wellness](https://github.com/DomeT99/astro-wellness) by Domenico Tenace, MIT (see `THEME-LICENSE`). Forced to dark mode, theme toggle removed.
- Content lives in `src/data/*.ts` and `src/content/blog/`. Images in `src/assets/images/`.
- Hosting: AWS Amplify, auto-deploys on push to `main`. Node 24 via `amplify.yml`.
- Local: `npm run dev -- --port 3013` (or `/run-local bland`).
