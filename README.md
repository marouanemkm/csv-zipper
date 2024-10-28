# Projet - Documentation

## Introduction

Ce document fournit des instructions pour installer, configurer et exécuter l'application complète, comprenant le **backend** et le **frontend**.

- **Backend** : Application Node.js construite avec Express et TypeScript. Il traite les fichiers CSV téléchargés depuis le frontend, les analyse et renvoie un fichier ZIP en réponse.
- **Frontend** : Application React.js construite avec Tailwind CSS et TypeScript. Elle permet d'envoyer des fichiers CSV vers le backend et de télécharger le fichier ZIP en réponse.

## Prérequis

- **Node.js** (version 14 ou supérieure)
- **Yarn** (version 1.22 ou supérieure)

Assurez-vous d'avoir ces outils installés sur votre machine avant de continuer.

## Installation

### 1. Installer les dépendances

```bash
yarn install
```

### 2. Créer les variables d'environnements

- **Backend** : `PORT`, qui par défaut est égale à **5500**
- **Frontend** : `REACT_APP_BACKEND_URL`, qui par défaut est égale à **https://localhost:5500**

### 3. Lancer le projet

Démarrer le serveur avec

- **Backend** :

```bash
yarn start
```

- **Frontend** :

```bash
yarn start
```

### 4. Tester l'application

Un jeu de données au format CSV est fourni afin de tester le comportement de l'application : **data.csv**
