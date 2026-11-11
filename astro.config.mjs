// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';

// GitHub Pages: https://oqura-ai.github.io/wisdom-docs/
export default defineConfig({
	site: 'https://oqura-ai.github.io',
	base: '/wisdom-docs',
	// Astro's dev toolbar pops up over the page while previewing; the docs don't need it.
	devToolbar: { enabled: false },
	integrations: [
		starlight({
			title: 'Wisdom',
			description: 'The intent behind every change your coding agent makes, readable by you and by any agent.',
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			favicon: '/favicon.svg',
			customCss: ['./src/styles/theme.css'],
			components: { PageTitle: './src/components/PageTitle.astro' },
			// /llms.txt, /llms-full.txt and /llms-small.txt: these docs as plain text for coding agents.
			plugins: [
				starlightLlmsTxt({
					projectName: 'Wisdom',
					description: 'Wisdom records Claude Code, Codex and Pi sessions on your own machine and lets people and agents read them with two commands, wisdom glance and wisdom open.',
					details: [
						'- Install: `npm install -g @oqura/wisdom` (Node.js 24 or newer). Then run `wisdom connect` in a project and start the agent as usual.',
						"- Recordings stay in the project's `.wisdom/` folder, unredacted. Nothing is uploaded and no model summarizes them.",
						'- To read a recorded session, run `wisdom glance` to list sessions and `wisdom open <position> --capture <session>` to read one turn in full.',
					].join('\n'),
				}),
			],
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap' } },
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Oqura-ai/wisdom' },
				{ icon: 'npm', label: 'npm', href: 'https://www.npmjs.com/package/@oqura/wisdom' },
			],
			editLink: { baseUrl: 'https://github.com/Oqura-ai/wisdom-docs/edit/main/' },
			lastUpdated: true,
			expressiveCode: {
				// Muted, near-monochrome highlighting; terminal windows only where a page asks for one.
				themes: ['github-dark-default', 'github-light-default'],
				defaultProps: { frame: 'code' },
				styleOverrides: {
					borderRadius: '1rem',
					borderColor: 'var(--sl-color-gray-5)',
					codeFontFamily: "'JetBrains Mono', ui-monospace, Consolas, monospace",
					uiFontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
				},
			},
			sidebar: [
				{ label: 'Getting started', items: [{ autogenerate: { directory: 'getting-started' } }] },
				{ label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
				{ label: 'Concepts', items: [{ autogenerate: { directory: 'concepts' } }] },
				{ label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
			],
		}),
	],
});
