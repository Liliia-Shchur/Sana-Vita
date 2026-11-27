# Sana Vita — website

Website of the Sana Vita medical center (Odesa).

Static site — plain HTML, CSS and JavaScript, no build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Structure

```
index.html        Home page
css/styles.css    Styles (design tokens at the top)
js/main.js        Mobile menu, card sliders, appointment form validation
assets/img/       Photos and logos
assets/icons/     SVG icons exported from Figma
```

## Deploy

Works as-is on GitHub Pages, Netlify, Vercel or any static host.
