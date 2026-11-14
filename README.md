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

Project photos from a folder: in content.js give a project  folder:'images/projects/NAME'  and put the
photos in that folder. They appear in file-name order, so name them with the date first
(Lightroom: File Naming > Rename To > "Date - Filename"). Set repo:'owner/name' once at the top.
Colours: highlight:'#e0405f' (starred words) and accent:'#c01f48' (lines, loading bar) in content.js.
Loading time: add loadMs:3000 to the ME block (milliseconds).
