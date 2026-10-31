# Gestion Commerciale — POS Offline-First

Application web de gestion commerciale (Caisse / Stocks / Dettes) conçue pour fonctionner **hors-ligne** et s'installer comme une application native depuis le navigateur (PWA).

## Contenu du package

```
gestion-commerciale/
├── index.html              # Interface complète (HTML + Tailwind + Vanilla JS)
├── manifest.webmanifest    # Manifeste PWA
├── sw.js                   # Service Worker (cache offline)
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
└── README.md
```

## Comment l'utiliser

### 1. En local (test rapide)
- Ouvrez simplement `index.html` dans un navigateur moderne (Chrome, Edge, Firefox, Safari).
- Pour tester le Service Worker et l'installation PWA, servez les fichiers via un serveur local :
  ```bash
  # Avec Python
  python3 -m http.server 8080
  # Puis allez sur http://localhost:8080
  ```

### 2. Installation comme application (PWA)
1. Ouvrez l'application dans Chrome / Edge / Safari (iOS).
2. Sur desktop : cliquez sur l'icône d'installation dans la barre d'adresse.
3. Sur mobile Android : menu → « Installer l'application » ou « Ajouter à l'écran d'accueil ».
4. Sur iOS : Partager → « Sur l'écran d'accueil ».

### 3. Déploiement Cloudflare Pages
1. Créez un nouveau projet Pages.
2. Uploadez le contenu du dossier (ou connectez un dépôt Git).
3. Le site sera accessible en HTTPS → condition obligatoire pour les PWA.

## Fonctionnalités incluses

- **Responsive Mobile-First**
  - < 640px : Bottom Navigation + Dashboard propriétaire
  - 640–1024px : Mode hybride
  - > 1024px : Sidebar + écran scindé Caisse (grille + ticket)
- **4 modules** : Dashboard, Caisse (POS), Stock, Carnet de Dettes
- **Mode Offline** simulé (interrupteur) + indicateur de synchronisation
- **Bénéfice Net** protégé par code (démo : `1234` ou `proprio`)
- **Paiements** : Espèces, Wave, Orange Money, Airtel Money, m'y nita, Amanata
- **Multi-photos** sur les produits (input file multiple)
- **PWA** complète : installable, cache offline, thème, icônes

## Prochaines étapes techniques

Les fonctions suivantes sont prêtes à être branchées sur votre backend :

| Fonction              | Rôle                                      |
|-----------------------|-------------------------------------------|
| `chargerProduits()`   | GET /api/produits ou IndexedDB            |
| `enregistrerVente()`  | POST vente + mise à jour stock            |
| `ajouterProduit()`    | POST multipart (photos)                   |
| `declencherSynchro()` | Push de la file d'attente vers Cloudflare |

Stack backend recommandée :
- Local : Python Flask + SQLite
- Cloud : Cloudflare Workers + D1 + R2 (photos)

## Code propriétaire (démo)
Dans le Dashboard → « Afficher » le bénéfice net → saisir `1234` ou `proprio`.
