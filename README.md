<h1 align="center">Jacob's Photos (WIP)</h1>

<p align="center">
  A quiet, fast photography portfolio.<br>
  Plain HTML, CSS and JavaScript. No frameworks, no build step.
</p>

<p align="center">
  <a href="https://itsbabp.github.io/portfolio/"><b>Visit the site</b></a> &nbsp;·&nbsp;
  <a href="https://itsbabpphotos.pixieset.com">Client galleries</a> &nbsp;·&nbsp;
  <a href="https://instagram.com/itsbabpphotos">Instagram</a>
</p>

<!-- Add a screenshot: save it as docs/preview.png, then remove these comment marks
<p align="center"><img src="docs/preview.png" alt="Site preview" width="720"></p>
-->

---

## Highlights

- **Calm, minimal design** in near-black with a single crimson accent, a large serif headline and soft rounded photos.
- **Soft blur-to-sharp animations** as things arrive, with a short loading screen where the name glides up into the header.
- **One page per project**, each at a clean address such as `/japan-2025/`.
- **Photos load from a folder.** Drop images in, name them with the date first, and they appear in order.
- **Camera info is filled in automatically** (aperture, shutter speed, ISO) when a photo still carries its EXIF data.
- **Lightbox** with keyboard and button navigation.
- **Everything you edit lives in one file:** `content.js`.

## Project structure

```text
.
├── index.html          Home page shell
├── content.js          All of your content and settings (the file you edit)
├── script.js           Builds the home page
├── project.js          Builds every project page
├── common.js           Header, animations, page transitions, lightbox, EXIF reader
├── style.css           The look
├── favicon.svg
├── japan-2025/         One folder per project, each with the same small index.html
│   └── index.html
├── ducks/
│   └── index.html
└── images/
    ├── gallery/        Home page photos, portrait and covers
    └── projects/
        ├── japan-2025/ Photos for that project (name matches the slug)
        └── ducks/
```

## Preview locally

Open the folder in your editor and use a live-preview extension, or run a small server in the project folder:

```bash
python3 -m http.server 8000      # on Windows: py -m http.server 8000
```

Then open <http://localhost:8000>.

## Editing the site

Open **`content.js`**. It is the only file you normally need to touch.

| Setting | What it does |
| --- | --- |
| `logo` | Name in the header and on the loading screen |
| `name` | Used in the footer |
| `portrait` | Photo of you in the About section |
| `hero` | Big photo behind the headline (`''` to hide it) |
| `headline` | The big quote. Words between `*stars*` are highlighted |
| `highlight` | Colour of the starred words, for example `'#e0405f'` |
| `accent` | Colour of the thin lines and the loading bar |
| `loadMs` | Optional. Loading screen length in milliseconds (default `3000`) |
| `repo` | `'owner/repo'`, used to find photo folders |
| `statement`, `bio`, `links` | About text and social links |
| `CLIENTS` | Link to the client gallery |
| `ABOUT` | Rows in the About panel: `[label, value, optional description]` |

### Add a project

1. **Add an entry** to `PROJECTS` in `content.js`:

   ```js
   {slug:'tokyo-2027', title:'Tokyo *2027*', desc:'A short description.',
    tags:['Trips'], tag:'2027', location:'Japan',
    img:'images/gallery/tokyo-cover.jpg',
    folder:'images/projects/tokyo-2027'}
   ```

2. **Create its page:** copy an existing project folder (for example `ducks/`) and rename the copy to the slug, here `tokyo-2027/`. Nothing inside needs editing.
3. **Add the photos** to `images/projects/tokyo-2027/`.
4. Commit and push.

Useful extras on a project: `captions:{'file-name.jpg':'A caption'}` for titles, and `reverse:true` to list newest first. If you leave out `folder`, you can list photos by hand with `photos:[{src:'images/...jpg', title:'...'}]`. A project with neither shows 20 empty landscape slots.

## Photos

### Exporting from Lightroom

| Setting | Value |
| --- | --- |
| Format | JPEG, quality 70-80 |
| Colour space | sRGB |
| Resize | Long edge, 1600-2000 px |
| File naming | Rename To: **Date - Filename** |
| Metadata | **All Metadata**, with **Remove Location Info** ticked |

- **Order:** photos are sorted by file name, so with the date first (`2025-04-12_IMG_0042.jpg`) they come out in the order you took them. Numbers are compared properly, so `IMG_2` comes before `IMG_10`.
- **Camera info:** the site reads aperture, shutter speed and ISO from each photo's EXIF data. If you export with metadata stripped, nothing is shown. Keeping metadata but removing location info keeps your shooting spots private. You can also type the info by hand with an `exif:'f/4 · 1/500 · ISO 100'` field, which always wins.
- **Covers** (the image on a project card) look best at about 1200 px wide.

## Publishing

The site is hosted on GitHub Pages. Pushing to the main branch updates it within a minute or two.

- **Hard refresh** (Ctrl+F5) after a push if you still see the old version.
- **Cache version:** the links in the HTML files end in `?v=6`. Increase the number when you change a CSS or JS file and browsers keep showing the old one.
- **Custom domain:** keep the `CNAME` file GitHub creates in the repository. Do not delete it.

## Troubleshooting

| Problem | Try this |
| --- | --- |
| Page stuck on the loading screen | A typo in `content.js` (a missing comma, quote or bracket). Press F12 and open Console to see the line number |
| A photo shows as a broken image | Check the path and the capital letters. `.JPG` and `.jpg` are different on GitHub |
| Project photos do not appear | The repo must be public, `repo` and `folder` must be correct, and the folder must hold JPG, PNG, WebP or AVIF files |
| New photos take a while to show | GitHub is asked at most once every 10 minutes per visitor, and a push takes a minute or two to publish |
| No camera info on a photo | The file was exported without metadata |

## Credits

Fonts from Google Fonts: [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono).

Photographs &copy; 2026 Jacob. All rights reserved. Please ask before using them.
