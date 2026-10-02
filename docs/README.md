# The News Gazette

A responsive, English-language course report for the AG News classification study. Its visual treatment follows an antique printed broadsheet; reading uses ordinary vertical scrolling. Course information, team contacts, the problem, and the dataset introduce six chapters: pipeline, exploratory data analysis, shared preparation, machine learning, deep learning, and results.

## Files

- `index.html`: complete editorial content and static result fallbacks.
- `assets/styles.css`: parchment and ink tokens, newspaper layout, responsive rules, and print styling.
- `assets/script.js`: chart view and metric switching, chart hover/focus annotations, chart reveal, active navigation, and figure enlargement.
- `assets/data.js`: exact final-result values copied from the repository's recorded metrics.
- `assets/eda-data.js`: word-frequency views reproduced from the notebook's counting methods and the existing training-data cache.
- `assets/figures/`: unmodified figures copied from `results/figures/`, plus original EDA images extracted from notebook outputs.

No framework, package installation, build step, or backend is required. The HTML remains readable if JavaScript is disabled. Google Fonts use system serif fallbacks when unavailable.

The section navigation stays at the top while scrolling and marks the current chapter. Narrow screens can scroll the navigation and wide tables horizontally. Ordinary tables remain static. Interaction is limited to charts: class and word-cloud views, topic and token-frequency views, final-result metrics, chart annotations, and enlarged figures. Recorded charts retain their original colors. Motion respects the reader's reduced-motion preference. The page contains no download controls.

## Preview

From the repository root, serve the docs folder with any static HTTP server:

```powershell
.\.venv\Scripts\python.exe -m http.server 8765 --bind 127.0.0.1 --directory docs
```

Open `http://127.0.0.1:8765/`. Directly opening `index.html` also supports the enhancements because no data fetch is required.

## GitHub Pages

In the repository's **Settings → Pages**, use **Deploy from a branch**, select the intended branch, and select **/docs**. All local assets use relative paths and are included inside this directory. The empty `.nojekyll` file keeps this as a plain static site.

## Evidence and maintenance

Content is based on `assignment.ipynb`, `README.md`, and the saved `results/metrics/` and `results/tables/` files. EDA covers structure and quality, class distribution, lengths and outliers, vocabulary and a cleaning trial, word clouds, and duplicate inspection. Its tables preserve recorded notebook values, including truncated example text. Interactive word frequencies are computed on official training text only and checked against the recorded vocabulary and cleaning totals. Both model chapters open with their processing flows.

The 40-record exclusion uses test inputs, so the page explicitly describes a modified AG News protocol. Reported timings preserve their classifier-only or neural-training scope.

When experiment results change, refresh the figure copies, `assets/data.js`, `assets/eda-data.js`, and matching static values in `index.html` together. Check values against the notebook outputs and the repository's saved results. Keep each word/count pair in `assets/eda-data.js` on one line; the topic and view groups remain separate for readability. The publication date is editorial metadata, not the dataset date or experiment execution date. Roman numbering identifies report chapters.

## Add the report PDF

The first section includes GitHub and Google Colab links. The PDF entry is pending until its URL is available. Replace the `span` with `id="report-pdf"` in `index.html` with an anchor, for example:

```html
<a class="stamp-link" id="report-pdf" href="assets/report.pdf"
   target="_blank" rel="noopener noreferrer">Report PDF ↗</a>
```

Use that relative URL only after adding the actual PDF at `docs/assets/report.pdf`, or use the supplied external PDF URL. Keep the pending label until a working file is provided.
