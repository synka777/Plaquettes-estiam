# Projet Plaquettes

**A propos:**
Ce projet à été réalisé dans le cadre du cours 3FULLBK au cours de l'année scolaire 2021-2022. Le but de ce projet est de donner accès à un backend de gestion de ressources permettant la numérisation des brochures de présentation de l'Estiam.

##Evolutions à prévoir:
- Faire fonctionner la gestion des doublons pour les endpoints permettant de gérer les programmes
- Ajouter des endpoints de gestion de ressources plus évolués dans les fichiers routes.
- Refacto à faire pour centraliser les tests de contrôles d'accès dans utils.js

## Structure du projet

**CONTRIBUTING.md:** contient un quickstart et des guidelines pour pouvoir aider les nouveaux développeurs à mettre en route le projet et développer de nouvelles fonctionnalités

**server.js:** permet de lancer le projet en écoute sur un port, la commande à utiliser pour le lancer sera nodemon.

**app.js:** répertorie les routes menant aux endpoints de gestion CRUD de chaque type de ressource.

**Le dossier routes:** contient un fichier par ressource répertoriant les endpoints de gestion CRUD

**Le dossier models: **contient un fichier de définition de modèle et schéma, pour la plupart des ressources: Un schéma est réutilisé pour plusieurs types de ressources lorsque la structure de celui-ci peut correspondre à plusieurs ressources différentes.
exemple: programElement est utilisé pour trois types de ressources différents.
Comment tester le projet
rs utilitaires réutilisables dans le code.

**kernel/utils.js:** ce fichier contient des fonctions de gestion de token et de contrôle d'accès, ainsi que des identifiants admin inscrits en dur pour pouvoir gérer l'API lorsqu'aucun autre utilisateur n'existe ou a les droits requis pour effectuer les mêmes actions. { admUsername: 'origin', admPasswd: 'h4xx0rz!' } Il est fortement recommandé de changer ces identifiants pour éviter les hacks.

**kernel/db.js:** contient la fonction de connexion à la base de données.

**controllers/baseController.js: **contrôleur central à l'application. Ce contrôleur central contient quatre fonctions CRUD utilisées par tous les autres endpoints de l'application. De par cette conception, la gestion des ressources est assez basique.

**routes/user-management/tokenRoutes.js:** contient les endpoints de gestion de token.
Ce fichier est le seul qui répertorie des endpoints de gestion spécifiques, comparé aux autres qui se contentent d'effectuer tous la même opération.

## Connexion à la base de données
La connexion à la base de données se fait au lancement du projet, par le biais du fichier db.js avec l'utilisation de dotenv et un fichier .env associé.
Le projet ne fonctionnera donc pas sans ce fichier .env

## Authentification
L'authentification se fait par le biais de l'endpoint /users/login.
Toute requête réalisée sans un cookie contenant un token généré par un compte avec les modifications nécessaires à la manipulation de ressource sera refusée avec un code de statut 401. Le refresh du token peut être fait via l'endpoint /users/refresh. Un utilisateur administrateur par défaut est répertorié dans le fichier kernel/utils.js.

## Gestion des droits des utilisateurs'
La gestion d'accès se fait par le biais de 3 éléments.

La permission, qui consiste en une string définissant le nom de ressource, et un string "W" ou "R" définissant si la permission donne un accès en mode lecture ou écriture à la ressource spécifiée.
Le rôle, qui est composé d'un nom de rôle avec une list d'ID de permissions. Le rôle de ce rôle (lol) est de définir à quelles ressources l'utilisateur bénificiant de ce rôle à accès et s'il peut effectuer des modifications ou non sur celles-ci.
L'utilisateur, avec un username, un mot de passe, et un ID de rôle.

Il est à noter que la gestion d'accès est la seule partie de l'application où la relation entre schémas est réalisée par le biais d'ID mongoose.

## Comment sont gérés les doublons?
Le contrôleur central baseController contient des contrôles, permettant de vérifier si un document existe dans la base mongoose avant d'en insérer de nouveaux.
Cette logique fonctionne sur les Schémas mongoose simples uniquement.

#####Bug connu: lorsqu'un schéma contient des schémas imbriqués (SCHEMAS DE LA CATEGORIE PROGRAMS PRINCIPALEMENT), la gestion de doublons n'est pas effective et le nouveau document est ajouté même s'il en existe un indentique en base de données. La gestion de doublons est fonctionnelle sur le reste des endpoints.
