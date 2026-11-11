# Wisdom docs

The documentation site for [Wisdom](https://github.com/Oqura-ai/wisdom), built with
[Starlight](https://starlight.astro.build). Published at https://oqura-ai.github.io/wisdom-docs/.

## Run it

Node.js 24 or newer.

```sh
npm ci
npm run dev        # http://localhost:4321/wisdom-docs/
npm run build      # the site in dist/
```

On Windows PowerShell with scripts blocked, use `npm.cmd`.

## Where things are

| Path | What it holds |
| --- | --- |
| `src/content/docs/` | The pages. Each folder is a sidebar group; `sidebar.order` in a page sets its place. |
| `src/styles/theme.css` | Colours, type and layout. |
| `src/components/` | The page title, flow diagrams and the agent list. |
| `astro.config.mjs` | Site settings, sidebar groups and plugins. |

The Vocabulary page is not kept here. `npm run dev` and `npm run build` pull it from
`docs/vocabulary.md` in the wisdom repo, where it changes together with the code.

Every push to `main` builds the site and publishes it to GitHub Pages
(`.github/workflows/deploy.yml`).
