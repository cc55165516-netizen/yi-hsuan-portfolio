# Yi-Hsuan Sui | Architecture Portfolio

**Live website:** https://cc55165516-netizen.github.io/yi-hsuan-portfolio/  
**Source code:** https://github.com/cc55165516-netizen/yi-hsuan-portfolio

A responsive, editorial-style portfolio and website CV for architecture student Yi-Hsuan Sui (隋宜軒). The visual direction draws on independent design magazines: expressive typography, generous whitespace, a warm neutral palette, and restrained burgundy accents.

## Website pages

| Page | File | Purpose |
| --- | --- | --- |
| About / Home | `index.html` | Bilingual identity, introduction, approach, featured graduation project |
| Selected Works | `works.html` | Four project studies rendered from maintainable JSON data |

## Maintainable content

**Content is kept separate from HTML layout.** A non-programmer can update written content without editing page structure:

- `data/profile.json`: names, homepage introduction, biography, interests, and featured project text.
- `data/projects.json`: project titles, summaries, design questions, focus, and status.

To edit a project, open `data/projects.json`, find the corresponding project object, change the text between quotation marks, and save. Keep JSON commas and quotation marks valid. To add a project, copy an existing object, give it a **unique** `id`, and change the fields. `script.js` fetches the JSON and generates the project entries using DOM APIs; no HTML edits are needed.

## Tech stack

- Semantic HTML5 for two linked pages
- CSS3 with responsive breakpoints, keyboard focus styling, and reduced-motion support
- Vanilla JavaScript for content rendering
- JSON files for content management
- Git and GitHub for version control
- GitHub Pages for static hosting

No build process, backend, framework, or API key is required.

## Local preview

Opening the HTML files with `file://` may prevent JSON loading because of browser security restrictions. Run a local server from the repository root:

```bash
python -m http.server 8000
```

Visit `http://localhost:8000/` and `http://localhost:8000/works.html`.

## Deployment

The public website is deployed using **GitHub Pages** from the `main` branch and repository root. GitHub Pages automatically publishes updated commits.

To enable it in a new repository, go to **Settings → Pages → Build and deployment**, select **Deploy from a branch**, set **main** and **/(root)**, then save.

## Testing checklist

- [ ] Open the public homepage and verify both English and Chinese names.
- [ ] Navigate from About to Selected Works and back.
- [ ] Verify that all four project entries load from `data/projects.json`.
- [ ] Follow the featured City Stitching link to its project entry.
- [ ] Check layout at phone and desktop widths.
- [ ] Use Tab to test visible keyboard focus.
- [ ] Edit a JSON value locally and confirm the content changes after refresh.
- [ ] Confirm the live URL and repository URL appear in the English presentation.

These are verification steps, not a claim that automated browser tests have passed.

## Development history and AI collaboration

This project began with an initial portfolio starter and was subsequently improved through real Git commits, including a JavaScript fix for editorial headings and safe JSON rendering, followed by responsive editorial styling.

**AI-assisted tasks:** generating an initial site scaffold, suggesting typography and layout, improving CSS, helping troubleshoot Git and GitHub Pages, and reviewing documentation. **Human-owned decisions:** choosing the architecture portfolio concept, selecting the design direction, verifying personal and project details, and approving what is published. The site remains editable with ordinary HTML, CSS, JavaScript, and JSON without AI.

## Before academic submission

Project descriptions are draft summaries. Review all four entries and replace anything that does not accurately reflect completed work. Add actual drawings, photographs, or project documentation only when available. Ensure the presentation reflects the final website and commit history.

**Note:** Consult the original course brief for any additional requirements not represented in this repository.
