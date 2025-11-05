# Hybrid Master — Prototype

Prototype React (Vite) avec le hook optimisé pour l'historique d'entraînements.

Comment lancer :

1. npm install
2. npm run dev
3. Ouvrir http://localhost:5173

Notes :

- Le hook de persistance est dans `src/hooks/useWorkoutHistory.js` (versionné, debounce d'écriture, flush on unload).
- Le DB_KEY = 'hybridMaster51_data_v4' (compatible avec ton ancien format).
- Pour déployer : Vercel (push repo) ou GitHub Pages (build & publish `dist`).

Prochaines améliorations recommandées :

- Intégrer tous les composants que tu as déjà (ActiveWorkoutView, SetsTracker, etc.) dans `src/App.jsx` au format JSX (j'ai préparé la version).
- Ajouter tests unitaires pour le hook (mock localStorage).
- Remplacer localStorage par IndexedDB si tu prévois de grosses sauvegardes.
