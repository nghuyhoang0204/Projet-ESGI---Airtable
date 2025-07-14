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

## Contraintes techniques
- **Architecture** : Application full-stack avec séparation front-end/back-end
  - **Front-end** : React avec Vite, React Router pour la navigation
  - **Back-end** : Node.js avec Express.js
  - **API REST** : Communication entre front et back via Axios
  - **Base de donnée** : Airtable

- **Base de données et API** : 
  - Intégration avec l'[API Airtable](https://airtable.com/api) via la bibliothèque officielle `airtable`
  - Opérations CRUD complètes (lecture, création, recherche par critères)
  - Gestion des relations et des champs complexes (images, listes)

- **Intelligence artificielle** : 
  - **Génération de recettes** : Intégration avec l'API OpenAI (GPT-3.5-turbo)
  - **Analyse nutritionnelle** : Système de calcul basé sur une base de données locale d'ingrédients ([`ingredients_nutrition.json`](backend/services/ingredients_nutrition.json))
  - Calcul automatique des macronutriments (calories, protéines, glucides, lipides)

- **Fonctionnalités implémentées** :
  - Visualisation responsive des recettes avec design moderne (glassmorphism)
  - Recherche avancée par nom, ingrédient ou type de plat
  - Détails complets des recettes avec analyse nutritionnelle
  - Générateur IA avec personnalisation (ingrédients, nombre de personnes, restrictions)
  - Interface utilisateur moderne avec animations et effets visuels

- **Qualité du code** : 
  - Séparation des responsabilités (controllers, services, routes)
  - Gestion d'erreurs centralisée
  - Configuration par variables d'environnement
  - Code modulaire et réutilisable
  - Styles CSS organisés et responsive design

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
    OPENAI_API_KEY=Your_OPENAI_KEY
    AIRTABLE_API_KEY=AIRTABLE_KEY
    AIRTABLE_BASE_ID=BASE_ID
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

