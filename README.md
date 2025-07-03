# Projet ESGI - Airtable

## Description
Ce projet consiste à réaliser un système de génération et de gestion de recettes de cuisine personnalisées avec analyse nutritionnelle. Il permettra aux utilisateurs de créer, rechercher et consulter des recettes tout en fournissant des informations nutritionnelles détaillées.

## Fonctionnalités principales
- **Visualisation des recettes** : Afficher la liste des recettes précédemment créées.
- **Détail des recettes** : Consulter les détails d'une recette, y compris son analyse nutritionnelle (calories, protéines, glucides, lipides, vitamines, minéraux).
- **Recherche de recettes** : Rechercher une recette par nom, ingrédient ou type de plat.
- **Création de recettes** : Générer une nouvelle recette en renseignant :
  - Les ingrédients.
  - Le nombre de personnes.
  - Les intolérances alimentaires.

## Contraintes techniques
- **Base de données** : Utilisation d'[Airtable](https://airtable.com/) pour stocker les données.
- **Technologie** : Interaction avec Airtable via une technologie JavaScript.
- **Intelligence artificielle** : Intégration d'un modèle d'IA pour :
  - L'analyse nutritionnelle.
  - La génération de recettes.
- **Qualité du code** : Soigner le code pour les parties front-end et back-end.

## Organisation
- **Taille des groupes** : Le projet doit être réalisé en groupes de 2 à 4 personnes.

## Technologies recommandées
- **Front-end** : Frameworks comme React, Vue.js ou Angular.
- **Back-end** : Node.js avec des frameworks comme Express.js.
- **API Airtable** : Utilisation de l'[API Airtable](https://airtable.com/api) pour interagir avec la base de données.
- **IA** : Modèles d'IA comme OpenAI, TensorFlow.js ou d'autres services d'analyse nutritionnelle.

## Installation et exécution
1. Clonez le dépôt du projet :
   ```bash
   git clone <url-du-repo>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les clés API pour Airtable et le modèle d'IA dans un fichier `.env`.
   Backend
   ```bash
  PORT=3000
  OPENAI_API_KEY=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
  AIRTABLE_API_KEY=patr4SAoSpJUjLWPz.2eb2a36ba0e4912852d49d9f7f8bc7e6575098fac27359d3335bc908759e3536
  AIRTABLE_BASE_ID=app0Ex9sizvsWiWwm
  JWT_SECRET=supersecretjwtkey
   ```

   Frontend
   ```bash
   VITE_API_URL=http://localhost:3000/
   ```


4. Lancez le projet :
    Backend
   ```bash
    node app.js (localhost:3000)
   ```

    Frontend
   ```bash
    npm run dev (localhost:5137)
   ```


## Auteurs
Ce projet est réalisé par Huy Hoang NGUYEN et Yves MU

