# Photography site

- `content.js`     - ALL your content: name, links, about, projects, photos
- `index.html`     - home page shell (change the title and description at the top)
- `script.js`      - builds the home page
- `project.js`     - builds every project page
- `common.js`      - header, animations, page transitions, lightbox, loading screen
- `style.css`      - the look
- `japan-2025/`, `ducks/` - one folder per project; each holds the same small `index.html`

New project: copy the `ducks` folder, rename it (e.g. `tokyo`), and add a project to `content.js`
with `slug:'tokyo'`. Nothing inside the copied folder needs editing.

Photos go in `images/`. Keep your `CNAME` file in the repo if you use a custom domain.
After pushing changes, bump `?v=1` in the HTML files (to `?v=2`, etc.) if browsers show old files.
