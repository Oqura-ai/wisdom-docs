// The vocabulary belongs to the wisdom repo, where it changes with the code. Each build pulls it
// from there instead of keeping a copy here. Offline, the last pulled copy is kept.
import fs from 'node:fs';

const source = 'https://raw.githubusercontent.com/Oqura-ai/wisdom/main/docs/vocabulary.md';
const blob = 'https://github.com/Oqura-ai/wisdom/blob/main/';
const target = new URL('../src/content/docs/reference/vocabulary.md', import.meta.url);

try {
	const response = await fetch(source);
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	const text = (await response.text())
		.replace(/^# .*\r?\n/, '') // Starlight shows the title from the frontmatter
		.replace(/\]\(\.\.\/([^)]+)\)/g, `](${blob}$1)`) // links into the code repo
		.replace(/\]\((?!https?:|#)([^)]+\.md)(#[^)]*)?\)/g, `](${blob}docs/$1$2)`); // other docs there
	fs.writeFileSync(target, `---
title: Vocabulary
description: Every word and position a glance or open answer can contain.
sidebar:
  order: 2
editUrl: https://github.com/Oqura-ai/wisdom/edit/main/docs/vocabulary.md
---

<!-- Pulled from ${source} by scripts/sync-vocabulary.mjs. Edit it there. -->
${text}`);
	console.log('vocabulary: pulled from the wisdom repo');
} catch (error) {
	if (!fs.existsSync(target)) throw new Error(`vocabulary: could not pull ${source} (${error.message}), and there is no earlier copy.`);
	console.warn(`vocabulary: could not pull (${error.message}); keeping the last copy.`);
}
