# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Structure
```
pwa/
├── docs/                        # Dossier de jsdoc
├── public/                      # contenu public
│   ├── robots.txt               # Règles pour les bots
│   └── vite.svg                 # SVG Vite
├── src/                         # Code
│   ├── assets/                  # Assets
│   │   └── react.svg            # SVG React
│   ├── Components/              # Components
│   │   ├── ShowData.jsx         # Gère l'affichage des infos des devices sélectionnés
│   │   └── ShowDevices.jsx      # Gère l'affichage des devices
│   ├── App.css                  # Css de l'app
│   ├── App.jsx                  # Gère l'affichage du contenu de la page
│   ├── index.css                # Css principale
│   └── index.jsx                # Affiche la page
├── .env                         # Configuration
├── .gitignore                   # Fichiers ignorés par Git
├── eslint.config.js             # Config js
├── index.html                   # Point d'entrée de l'application
├── jsdoc.json                   # Config de jsdoc
├── package.json                 # Dépendances et scripts
├── package-lock.json            # Config des dépendances et scripts
├── README.md                    # Ce que tu esentrain de lire
└── vite.config.js               # Config de Vite
```