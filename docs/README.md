# Portfolio Étudiant — BTS SIO SLAM

Ce projet est un portfolio one-page, professionnel, lisible et sobre.

## Structure
- `index.html` — page unique avec sections sémantiques (sans CSS/JS inclus pour démarrage).
- `assets/css` — variables, base, composants, sections.
- `assets/js` — scripts (navigation, projets, UI) — placeholders.
- `assets/img` — images (photo, captures projets).
- `assets/icons` — icônes SVG.
- `data/projects.json` — liste des projets.
- `static` — fichiers statiques (ex: `resume.pdf`, `favicon.ico`).
- `seo` — `manifest.webmanifest`, `robots.txt`, `sitemap.xml`.

## Édition rapide
1. Complétez les sections dans `index.html`.
2. Ajoutez vos images dans `assets/img/` et icônes dans `assets/icons/`.
3. Renseignez vos projets dans `data/projects.json`.
4. Placez votre CV `resume.pdf` et `favicon.ico` dans `static/`.

## Prévisualisation locale
Ouvrez `index.html` dans votre navigateur ou utilisez une extension de serveur local.

## Bonnes pratiques
- Respecter la sémantique HTML (`header`, `main`, `section`, `article`, `footer`).
- Accessibilité : titres structurés, `aria-labelledby`, `alt` sur images.
- Performance : formats d’images modernes, lazy-loading (plus tard), minification en prod.

## Déploiement
Hébergez sur GitHub Pages, Netlify ou Vercel. Mettez à jour `sitemap.xml` avec votre domaine.
