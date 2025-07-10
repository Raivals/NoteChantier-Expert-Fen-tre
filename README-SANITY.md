# Configuration Sanity - Guide complet

## 🚀 Configuration rapide

### 1. Créer un projet Sanity

1. **Créez un compte** sur [sanity.io](https://www.sanity.io/)
2. **Créez un nouveau projet** :
   - Nom : "Gestion des Chantiers"
   - Template : "Clean project with no predefined schemas"
3. **Notez votre Project ID** (affiché après création)

### 2. Configuration des variables d'environnement

1. **Créez un fichier `.env`** à la racine du projet :
```env
VITE_SANITY_PROJECT_ID=votre-project-id-ici
VITE_SANITY_DATASET=production
```

2. **Remplacez** `votre-project-id-ici` par votre vrai Project ID

### 3. Démarrer Sanity Studio

```bash
# Démarrer le studio Sanity (interface d'administration)
npm run sanity

# L'application React (dans un autre terminal)
npm run dev
```

### 4. Première utilisation

1. **Ouvrez** http://localhost:3333 (Sanity Studio)
2. **Connectez-vous** avec votre compte Sanity
3. **Créez votre premier chantier** via l'interface
4. **Testez** l'application React sur http://localhost:5173

## 📋 Fonctionnalités disponibles

### Interface Sanity Studio
- ✅ Création/modification/suppression des chantiers
- ✅ Interface intuitive avec validation des champs
- ✅ Prévisualisation des données
- ✅ Historique des modifications

### Application React
- ✅ Synchronisation en temps réel avec Sanity
- ✅ Interface utilisateur moderne
- ✅ Gestion d'erreurs et états de chargement
- ✅ Recherche et filtres

## 🔧 Commandes utiles

```bash
# Développement
npm run dev          # Application React
npm run sanity       # Studio Sanity

# Production
npm run build        # Build de l'application
npm run sanity:build # Build du studio
npm run sanity:deploy # Déployer le studio
```

## 🛠️ Résolution des problèmes

### "No document types"
- ✅ **Résolu** : Le schéma est maintenant correctement configuré

### Erreur de connexion
1. Vérifiez votre Project ID dans le fichier `.env`
2. Assurez-vous d'être connecté à internet
3. Vérifiez les permissions de votre projet Sanity

### Données non synchronisées
1. Actualisez la page
2. Vérifiez la console pour les erreurs
3. Redémarrez les serveurs de développement

## 📚 Structure des données

Le schéma `chantier` inclut :
- **Informations générales** : référence, adresse, type
- **Stationnement** : type et informations complémentaires
- **Accès chantier** : niveau, type d'accès, détails
- **Matériel spécifique** : types requis et informations
- **Type de pose** : méthode d'installation
- **Électricité** : responsabilité (client/expert)
- **Informations spécifiques** : notes libres
- **Dates** : création et modification automatiques

## 🌐 Déploiement

### Studio Sanity
```bash
npm run sanity:deploy
```
Votre studio sera accessible sur `https://votre-project.sanity.studio`

### Application React
Déployez normalement sur Vercel, Netlify, etc. avec les variables d'environnement configurées.

## 🔐 Sécurité et permissions

Par défaut, le projet est configuré pour :
- **Lecture publique** : Tout le monde peut voir les chantiers
- **Écriture authentifiée** : Seuls les utilisateurs connectés peuvent modifier

Pour modifier les permissions :
1. Allez dans votre projet Sanity
2. **Settings** > **API** > **CORS origins**
3. Ajoutez vos domaines autorisés