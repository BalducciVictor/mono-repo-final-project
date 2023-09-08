Ce monorepo contient à la fois le backend et le frontend. Il est configuré en utilisant npm workspaces pour faciliter la gestion des dépendances et du développement de plusieurs parties de l'application au sein d'un même dépôt.

## Structure du Monorepo

Le monorepo est organisé de la manière suivante :

- `backend/`: Le code source du backend de l'application.
- `frontend/`: Le code source du frontend de l'application.
- `node_modules/`: Les dépendances installées pour le monorepo.
- `package.json`: Pour les dependances communes

## Installation

Pour commencer à travailler sur ce monorepo, suivez ces étapes :

1. ``npm install`` Pour installer les dependances communes si elle existent
2.  Faire la meme chose dans chaques workspaces

## Versionning

Merge dans [master] uniquement via PR et apres validation de chaque membres de l'équipe. Seulement develop peut-etre merge dans [master].
- Master [Protected] 

Toujours partir de develop pour creer ca propre branch. 
- develop

## Auteurs

- Victor
- Louis
- Geoffrey
- Carlo
- Maksym
- Hugue

## Licences
MIT 