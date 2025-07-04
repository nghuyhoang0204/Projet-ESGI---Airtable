@echo off
echo ============================================
echo    Démarrage de l'application de recettes
echo ============================================
echo.

echo Vérification des dépendances...

cd backend
if not exist node_modules (
    echo Installation des dépendances backend...
    npm install
)

echo Démarrage du backend (port 3000)...
start "Backend API" cmd /k "echo Backend démarré sur http://localhost:3000 && node app.js"

timeout /t 3 /nobreak >nul

cd ..\frontend
if not exist node_modules (
    echo Installation des dépendances frontend...
    npm install
)

echo Démarrage du frontend (port 5173)...
start "Frontend React" cmd /k "echo Frontend démarré sur http://localhost:5173 && npm run dev"

echo.
echo ============================================
echo   Application démarrée avec succès !
echo   Backend:  http://localhost:3000
echo   Frontend: http://localhost:5173
echo ============================================
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause >nul
