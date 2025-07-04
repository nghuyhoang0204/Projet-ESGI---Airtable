# Projet ESGI - Airtable

## Description
Ce projet consiste à réaliser un système de génération et de gestion de recettes de cuisine personnalisées avec analyse nutritionnelle. Il permettra aux utilisateurs de créer, rechercher et consulter des recettes tout en fournissant des informations nutritionnelles détaillées.

## Fonctionnalités principales
- ✅ **Visualisation des recettes** : Afficher la liste des recettes précédemment créées avec interface moderne.
- ✅ **Détail des recettes** : Consulter les détails d'une recette, y compris son analyse nutritionnelle complète (calories, protéines, glucides, lipides, vitamines, minéraux).
- ✅ **Recherche de recettes** : Rechercher une recette par nom, ingrédient ou type de plat en temps réel.
- ✅ **Création de recettes avec IA** : Générer une nouvelle recette en renseignant :
  - Les ingrédients.
  - Le nombre de personnes.
  - Les intolérances alimentaires.
- ✅ **Analyse nutritionnelle automatique** : Calcul automatique des valeurs nutritionnelles.
- ✅ **Sauvegarde automatique** : Les recettes générées sont automatiquement sauvegardées.
- ✅ **Interface responsive** : Design moderne et adaptatif.

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

### Méthode rapide (recommandée)
1. Clonez le dépôt du projet :
   ```bash
   git clone <url-du-repo>
   ```
2. Configurez les fichiers d'environnement :
   - Backend : Copiez `backend/.env.example` vers `backend/.env`
   - Frontend : Copiez `frontend/.env.example` vers `frontend/.env`
   - Remplissez vos clés API Airtable et OpenAI

3. Lancez l'application complète :
   ```bash
   # Sur Windows
   start-dev.bat
   
   # Sur Mac/Linux
   chmod +x start-dev.sh && ./start-dev.sh
   ```

### Méthode manuelle
1. **Configuration Backend**
   ```bash
   cd backend
   npm install
   # Configurez votre fichier .env avec vos clés API
   node app.js
   ```

2. **Configuration Frontend**
   ```bash
   cd frontend  
   npm install
   npm run dev
   ```

### Variables d'environnement requises

**Backend (.env)**
```bash
PORT=3000
AIRTABLE_API_KEY=votre_cle_api_airtable
AIRTABLE_BASE_ID=votre_base_id_airtable  
OPENAI_API_KEY=votre_cle_api_openai
JWT_SECRET=supersecretjwtkey
```

**Frontend (.env)**
```bash
VITE_API_URL=http://localhost:3000
```


## Auteurs
Ce projet est réalisé par Huy Hoang NGUYEN et Yves MU

