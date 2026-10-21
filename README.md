# Yi-Hsuan Sui — Portfolio / Website CV

A bespoke, editorial-style portfolio website for architecture and spatial design studies.

## Pages
- `index.html` — personal introduction, design approach, and featured project.
- `works.html` — selected projects rendered from structured JSON content.
- `styles.css` — visual design and responsive layout.
- `script.js` — loads profile and project data into the page.
- `data/profile.json` — editable homepage content.
- `data/projects.json` — editable project list and project details.

## Content update workflow
The website separates content from presentation. To update the profile, edit `data/profile.json`. To add or revise a project, edit `data/projects.json` using the existing field names. The JavaScript reads these files and renders the content. Routine content updates do not require editing HTML or using AI.

For local preview, use a local web server because browsers may block `fetch()` when opening HTML directly from the filesystem. For example, run `python -m http.server 8000` in the project directory and open `http://localhost:8000`.

## Tools and implementation
- HTML5 for page structure
- CSS for visual design and responsive behavior
- JavaScript for rendering structured content
- JSON for maintainable content
- Git for version control
- GitHub Pages or Vercel for deployment

## Deploy with GitHub Pages
1. Create a new GitHub repository, for example `yi-hsuan-portfolio`.
2. Add all project files to the repository and push the `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under the build/deployment settings, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. Wait for the deployment to finish. The public URL will normally look like `https://YOUR-USERNAME.github.io/yi-hsuan-portfolio/`.
6. Open the public URL and test both pages and the project list.

## Git history
Use separate commits for recognizable development milestones rather than one commit containing everything. Suggested commit sequence:
1. `chore: add initial site structure`
2. `feat: create editorial homepage and navigation`
3. `feat: add project listing from JSON data`
4. `style: refine responsive layout and typography`
5. `docs: add README and deployment instructions`

Only use commit messages for work that has actually been completed. If these changes were made in one initial upload, do not backdate or fabricate earlier history; make meaningful changes and commits from this point forward.

## Before submission
- Confirm the public website URL and repository URL.
- Replace any project descriptions that do not accurately represent your own work.
- Add your official English name if you use a different name from the romanisation shown.
- Test the mobile layout and all navigation links.
- Include both URLs in the English presentation.
