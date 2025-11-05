Ajout d’un scaffold Vite + React

- Hook optimisé pour l’historique (versioning + debounce + flush on unload)
- App.jsx converti en JSX (ActiveWorkoutView, SetsTracker, Planner, Stats)
- Ajout des styles (src/styles.css) et README
- Suppression des fichiers obsolètes : index.js, index.css, metadata.json, README (ancien)

Tests recommandés : npm install && npm run dev, vérifier sauvegarde localStorage DB_KEY = hybridMaster51_data_v4, tester export/import JSON.