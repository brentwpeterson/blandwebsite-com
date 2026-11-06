# blandwebsite.com

A completely bland, AI-made company website. Every word and every Jack Russell is AI-generated. Want words a human wrote? https://contentcucumber.com/

- Theme: [Astro Wellness](https://github.com/DomeT99/astro-wellness) by Domenico Tenace, MIT (see `THEME-LICENSE`). Forced to dark mode, theme toggle removed. The footer carries no theme or Astro credit (it reads "A Pre-Pickle Production 🥒"); the MIT notice the license requires lives in `THEME-LICENSE`.
- Content lives in `src/data/*.ts` and `src/content/blog/`. Images in `src/assets/images/`.
- Hosting: AWS Amplify, auto-deploys on push to `main`. Node 24 via `amplify.yml`.
- Local: `npm run dev -- --port 3013` (or `/run-local bland`).

## Blog

Posts come from two places, merged newest first by `src/utils/posts.ts`:

- Markdown files in `src/content/blog/`
- RequestDesk, agent "Bland Website" (`6ae9f063d82dfbd2fd3daeb7`), read from `/api/astro-proxy/blog-posts` at build time

Publishing a post in RequestDesk fires the Amplify webhook on the "Bland Website" Astro site record, which rebuilds the site. The build needs `AGENT_API_KEY` and `BACKEND_URL` (Amplify branch env vars; `.env` locally, gitignored) and fails loudly without them, so a broken key never ships a blog with the RequestDesk posts silently missing. A slug used by both sources also fails the build.

### Signed by the AI and model

Every post says which AI and which exact model wrote it, for example "Written by Claude (claude-opus-5-5)". RequestDesk posts carry the `aw-ai-byline` paragraph in their HTML (the daily job reads the model from the CLI run itself). Markdown posts set `writtenBy: { llm, model }` in frontmatter and the post page prints the byline. A post without one fails the build.

### Q&A and structured data

Every post has BlogPosting and FAQPage structured data, and the FAQPage is built from the same Q&A the page shows under the post. A post with no Q&A fails the build, naming the slug.

- Markdown post: a `qa` list of `question` and `answer` in frontmatter.
- RequestDesk post: a `<section class="aw-qa" data-qa>` at the end of the HTML, holding `<h3>` question and `<p>` answer pairs. `src/utils/posts.ts` takes the section out of the body and the post page renders it. The daily job asks the model for 3 Q&As in the same run and writes this section; to add one to an existing post, PATCH its `content` with the section appended.

### Best used AI terms

`/best-used-ai-terms/` lists the readable (term and phrase) entries from RequestDesk's public feed `/api/public/content-terms?term_type=avoid`, the same feed as requestdesk.ai/over-used-ai-terms. `src/utils/terms.ts` reads it at build time with the same `BACKEND_URL` and `AGENT_API_KEY`. A failed fetch or an empty list fails the build.

### Featured images

Every post has one. Images from 2026-11-05 on use a Wes Anderson look (symmetrical, pastel, staged), always include a Jack Russell, and never contain text.

- A ChatGPT post gets its image from codex too (image generation is on in codex-cli): `codex exec --skip-git-repo-check --ephemeral -s workspace-write -C public/blog "<scene, style, 'no text', save as <slug>.jpg>"`. Look at the image before committing it.
- Markdown post: put the file at `public/blog/<slug>.jpg` and set `image` and `imageAlt` in frontmatter.
- RequestDesk post: put the file at `public/blog/<slug>.jpg` too, not in the RequestDesk S3 upload. The `cb-content-storage` bucket archives objects to Glacier after 90 days, and the image URL then returns 403. Then `PATCH /api/astro-proxy/blog-posts/<postId>` with `featured_image: "/blog/<slug>.jpg"` and `featured_image_alt`. The path takes `postId` (`post-xxxxxxxx-<timestamp>`), not the Mongo `id`; a Mongo `id` returns 404. Push the image so the build includes it.

## Daily AI posts

`.claude/local/bland-autopost.py` (CB-Workspace) runs on the Mac Mini every day at 07:00 (launchd `com.brent.bland-autopost`, installed with `schedule-task.sh --on mini`). It rotates Claude (`claude -p`), ChatGPT (`codex exec`, must be signed in with ChatGPT, never an API key) and Gemini (`agy`), picks the top unused Google Search Console query that fits the theme "Humans writing content is dead", publishes through the RequestDesk agent above with a "Written by" byline, and fires the Amplify webhook. No human edit, no voice gate. A failure posts nothing, raises a notification, and opens the `bland-autopost-failed` fix row. The public explanation is `/experiment/`.
