# Personal-Finance-Tracker
Cette application permet de suivre vos dépenses personnelles facilement. Elle se compose d’une API backend hébergée sur AWS Lambda et d’une interface web simple pour ajouter des dépenses.

Fonctionnalités
Ajouter une dépense avec un titre, un montant, une catégorie et une date.

Sauvegarder les dépenses dans une base DynamoDB via l’API.

Interface web légère pour saisir les dépenses.

Installation
Créer une table DynamoDB nommée DepensesTable avec une clé primaire id (string).

Déployer la fonction Lambda qui ajoute une dépense dans DynamoDB.

Configurer une API Gateway HTTP API avec la route POST /depenses pointant vers la Lambda.

Configurer la route OPTIONS /depenses pour gérer les requêtes CORS (via intégration Mock).

Activer CORS dans API Gateway pour permettre les appels depuis le frontend.

Modifier l’URL de l’API dans le fichier client/index.html si besoin.

Utilisation
Ouvrir le fichier client/index.html dans un navigateur, remplir le formulaire, puis envoyer pour ajouter une dépense. Pour des raisons de sécurité , j'ai mis dans le code 'A' à la place de mes liens de AWS.

Structure du projet

personal-finance-tracker/
├── backend/
│   └── index.js          
├── client/
│   └── index.html     
└── README.md

