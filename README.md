# Adrien Ghosn's website

A static research website built with **Eleventy, Markdown, BibTeX, and plain
CSS**. Node is needed only to develop and build the site. Production pages
do not load an application framework or third-party fonts. A small, local
script reveals the contact email only when requested.

## Run locally

Use Node 24, as specified in `.nvmrc`. With nvm installed:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open **http://localhost:8080**. Content, bibliography, CSS, and resource changes
rebuild automatically. Stop the server with Ctrl-C.

```sh
npm test             # Focused bibliography tests
npm run build        # Generate the static website in _site/
npm run check:links  # Check the generated local links, resources, and anchors
npm run check        # All of the above, in order
```

`node_modules/` and `_site/` are generated and ignored. Keep `package-lock.json`
committed so local installs and GitHub Actions use the same dependencies.

## Repository layout

```text
src/
  content/           Home-page Markdown: bio, CV, community service
  research/          Individual project pages in Markdown
  _includes/         Shared page and redirect layouts
  index.njk          Home-page layout and publication list
  projects.njk       Project directory, populated automatically
  redirects.njk      Compatibility links for old page URLs
  sitemap.njk        Generated sitemap
  style.css          All styling
public/
  images/            Portrait and other images
  icons/             Local social-profile SVGs and their license
  cv/                Downloadable CV
  papers/            Local publication PDFs
  slides/            Presentation slides
  contact.js         Click-to-reveal contact email
  robots.txt         Crawler configuration
bib.tex              Publication metadata and resource links
lib/                 Build-time BibTeX handling
test/                Node's built-in tests
scripts/             Generated-site link checker
eleventy.config.js   Build settings, static-resource copies, site URL
.github/workflows/   GitHub Pages build and deployment
```

Files in `public/` are copied to the output root: for example,
`public/slides/talk.pdf` is available at `/slides/talk.pdf`.
The original paper and CV URLs under `/assets/pdf/` are also generated as
compatibility copies; keep the source files only in `public/`.

The previous Jekyll theme, Ruby/Docker setup, old projects, and checked-in
`docs/` output have been removed. Git history retains the previous site.

## Edit the home page

| Content | Source |
| --- | --- |
| Biography | `src/content/about.md` |
| CV summary | `src/content/cv.md` |
| Community service and committee links | `src/content/service.md` |
| Portrait | `public/images/portrait.jpg` |
| Downloadable CV | `public/cv/aghosn_cv.pdf` |

Keep the front matter at the top of each Markdown file. The section's
`sectionId` supplies its anchor; `order` controls the order of the Markdown
sections. Publications are rendered between the biography and CV.
The CV PDF is still the June 2023 version and is explicitly dated on the site.
Replace it at the same path when an updated CV is available, then update the
date note in `src/content/cv.md`.

To add another home-page section, create a Markdown file in `src/content/`
with `tags: section`, a unique `sectionId`, `title`, `eyebrow`, `order`, and
`permalink: false`. Add its navigation link in `src/_includes/base.njk`.

### Header profiles and contact email

GitHub and LinkedIn links live in `src/_includes/base.njk`. Their locally
hosted icons come from Bootstrap Icons 1.13.1 (MIT); the copyright and license
are retained in `public/icons/LICENSE`.

The home page's `revealEmail: true` loads `public/contact.js`. It replaces the
LinkedIn contact fallback with a **Reveal email** button. Clicking it assembles
the website-tagged Gmail alias and shows a normal mail link. With JavaScript
disabled, the original contact link still works through LinkedIn.

The address is not included in the initial page HTML or as a complete string
in the script. This is lightweight obfuscation, not guaranteed anti-spam:
determined bots can inspect the script or simulate the click. The `+website`
tag helps identify and filter mail sent to this version of the address.
**The existing CV PDF still contains the original email address**, and previous
versions of the website may already have exposed it.

## Add or update a publication

Edit **`bib.tex`**, the single source of publication metadata:

```bibtex
@inproceedings{my-paper-2027,
  author = {First Author and Adrien Ghosn},
  title = {A New Systems Paper},
  booktitle = {Conference Proceedings},
  year = {2027},
  url = {https://example.org/paper},
  venue = {Conference},
  pdf = {/papers/my-paper.pdf},
  slides = {/slides/my-talk.pdf},
  project = {/research/my-project/}
}
```

Required fields: a unique citation key, `author`, `title`, `year`, and `url`
or `doi`. The build groups entries by descending year, then by title.

Optional site fields:

| Field | Use |
| --- | --- |
| `venue` | Short venue label; otherwise the standard venue fields are used |
| `pdf` | Local or external PDF link |
| `slides` | Local or external slide deck |
| `project` | Dedicated project page |

Put local files under the matching `public/` directory and use root-relative
links. Missing PDF links are visibly marked rather than guessed. Zenodo
software artifacts are labeled as artifacts. Edited proceedings remain in
the downloadable bibliography but are not shown as authored publications.

The initial metadata came from
[DBLP](https://dblp.org/pid/244/9344.html?view=bibtex), with local resource links
and short venue labels added. The duplicate Tyche preprint and migrated
scala-xml artifact have intentionally been removed. Preserve these choices
when importing future DBLP updates rather than replacing the file wholesale.
Use Unicode for accented names; the display parser does not typeset arbitrary
LaTeX commands. Braces used for title capitalization are removed for display.

## Add a project page

Create `src/research/my-project.md`:

```markdown
---
layout: base.njk
title: My project
tags: project
navSection: projects
summary: A short description for the Projects directory.
description: A description for search engines.
permalink: /research/my-project/
---
<div class="project-page">

# My project

Write the project description in Markdown here.

[Paper](/papers/my-paper.pdf) / [Slides](/slides/my-talk.pdf)

</div>
```

Leave blank lines around the HTML wrapper so the content inside is parsed as
Markdown. The `project` tag automatically adds the page to **Projects** in the
top navigation. Add its URL to the relevant bibliography entry's `project`
field to link it from Publications.

The old `/cv/`, `/publications/`, `/projects/tyche/`, and selected paper-project
URLs redirect to their replacements. Add further aliases in `src/redirects.njk`.
These are static HTML redirects, not HTTP 301 responses.

## Deploy to GitHub Pages

The site targets the root of **https://aghosn.github.io**. Its root-relative
links are intended for this user-site repository, not a `/repository/` subpath.

One-time repository setup:

1. In **Settings > Pages > Build and deployment**, select **GitHub Actions**
   as the source, rather than a branch or the former `docs/` folder.
2. Merge the website changes into the repository's default branch, currently
   **`source`**. Ensure that branch is allowed by the `github-pages` deployment
   environment if that environment has branch restrictions.
3. Open **Actions > Website** to follow the build and deployment. After the
   workflow exists on the default branch, it can also be started manually
   with **Run workflow**, selecting that branch.

The workflow builds and validates pushes and pull requests using Node 24,
`npm ci`, and `npm run check`. Only a successful non-PR run on the repository's
current default branch uploads and deploys `_site/`. Other branches are
build-only. The default-branch check follows the repository setting, so no
workflow edit is needed if the default branch is renamed.

Deployment uses GitHub's official Pages artifact actions, the `github-pages`
environment, and the built-in `GITHUB_TOKEN` with `pages: write` and
`id-token: write` scoped to the deployment job. No personal access token,
Ruby installation, or generated-output branch is needed.
Only `_site/` is uploaded; requirements, sources, tests, and dependencies are
not part of the published site.

Local checks validate the generated site, but the first remote deployment
still needs to run after the repository setting and branch changes above.
The link checker checks local pages/assets/anchors, not external websites.

For another domain, update `site.url` in `eleventy.config.js`, the sitemap
URL in `public/robots.txt`, and the repository's Pages/custom-domain settings.

Reference: [GitHub's custom Pages workflows documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Future interactive capabilities demo

The site remains static. A future Tyche terminal can lazy-load xterm.js and
connect over HTTPS/WebSocket to a separately hosted service running the
native Rust CLI in a PTY. Give each visitor a fresh isolated session; provide
reset, clean up disconnected sessions, and report/restart crashed processes
with bounded retries rather than silently pretending their state survived.
The backend runs the fixed CLI, not an unrestricted shell.

The existing CLI uses terminal-oriented `rustyline` and `crossterm` I/O.
A browser-only alternative would require adapting the engine for WebAssembly
and browser I/O, ideally in a Web Worker; it cannot embed the native binary
unchanged. Neither demo is implemented or required for deployment.
