#!/bin/bash

echo "============================================"
echo "    Démarrage de l'application de recettes"
echo "============================================"
echo

echo "Vérification des dépendances..."

# Backend
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances backend..."
    npm install
fi

echo "Démarrage du backend (port 3000)..."
gnome-terminal --title="Backend API" -- bash -c "echo 'Backend démarré sur http://localhost:3000' && node app.js; exec bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && echo \"Backend démarré sur http://localhost:3000\" && node app.js"' 2>/dev/null || \
echo "Démarrez manuellement: cd backend && node app.js" &

sleep 3

# Frontend  
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances frontend..."
    npm install
fi

echo "Démarrage du frontend (port 5173)..."
gnome-terminal --title="Frontend React" -- bash -c "echo 'Frontend démarré sur http://localhost:5173' && npm run dev; exec bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)' && echo \"Frontend démarré sur http://localhost:5173\" && npm run dev"' 2>/dev/null || \
echo "Démarrez manuellement: cd frontend && npm run dev" &

echo
echo "============================================"
echo "   Application démarrée avec succès !"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:5173"
echo "============================================"
echo
