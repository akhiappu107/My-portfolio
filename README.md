# Cinematic Portfolio Starter

A customizable React + Vite portfolio starter based on the agreed direction:
- Dark cinematic visual style
- Full-screen showreel hero with a click-to-play modal
- Floating expandable profile card
- Three editorial work categories with two starter projects each
- Expandable project breakdowns
- Separate Store view
- Responsive layout and subtle motion

## Requirements
- Node.js 20 or newer
- VS Code (recommended)

## Run locally
1. Extract this ZIP.
2. Open the extracted `cinematic-portfolio-starter` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed in the terminal (usually http://localhost:5173).

## Add your showreel
Put your video in `public/videos/showreel.mp4`.
The hero poster is a CSS placeholder for now. Replace it with your own poster image in `src/App.jsx` when ready.

## Add project media
Put images/videos in `public/images/` and `public/videos/`.
Edit `src/data/projects.js` to update project names, descriptions, thumbnails, videos, software and breakdown steps.

Example asset paths:
- `/images/my-project-cover.jpg`
- `/images/my-project-uv.jpg`
- `/videos/my-project.mp4`

## Personalize
- Change the display name and designation in `src/App.jsx`.
- Edit the profile content in `src/components/FloatingProfile.jsx`.
- Edit products and marketplace links in `src/data/products.js`.
- Update the page title and description in `index.html`.

## Build for deployment
```bash
npm run build
```
The production site is generated in `dist/`.

## Notes
- The included project artwork is intentionally represented by styled placeholders, not stock images.
- The Store uses external product links as a starting point; it does not process payments or deliver files.
- The showreel modal expects `/videos/showreel.mp4`. Add your own file to enable playback.
