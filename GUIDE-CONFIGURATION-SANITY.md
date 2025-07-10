# 🚀 Guide de Configuration Sanity avec Token API

## ⚠️ ÉTAPES OBLIGATOIRES

### 1. 🔧 Créer votre projet Sanity

1. **Allez sur** [sanity.io](https://www.sanity.io/)
2. **Créez un compte** ou connectez-vous
3. **Créez un nouveau projet** :
   - Nom : "Gestion des Chantiers"
   - Template : "Clean project with no predefined schemas"
4. **NOTEZ VOTRE PROJECT ID** (très important !)

### 2. 🔑 Créer un Token API

1. **Dans votre projet Sanity**, allez dans **Settings** → **API**
2. **Cliquez sur "Tokens"**
3. **Créez un nouveau token** :
   - Nom : "Gestion Chantiers App"
   - Permissions : **Editor** (pour pouvoir créer/modifier/supprimer)
4. **COPIEZ LE TOKEN** (vous ne pourrez plus le voir après !)

### 3. 📝 Configurer les variables d'environnement

1. **Ouvrez le fichier `.env`** à la racine du projet
2. **Remplacez les valeurs** par vos vraies informations :

```env
# REMPLACEZ ces valeurs par vos vraies informations
VITE_SANITY_PROJECT_ID=abc123def456
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=sk1234567890abcdef...
```

### 4. 🚀 Redémarrer les serveurs

```bash
# Arrêtez tous les serveurs en cours (Ctrl+C)
# Puis redémarrez :

# Terminal 1 : Application React
npm run dev

# Terminal 2 : Studio Sanity
npm run sanity
```

### 5. 🎯 Première connexion au Studio

1. **Ouvrez** http://localhost:3333
2. **Connectez-vous** avec votre compte Sanity
3. **Autorisez** l'accès au projet
4. **Vous devriez voir** l'interface Sanity avec le type "Chantier"

## 🔍 Vérification que tout fonctionne

### Dans la console du navigateur (F12) :
- ✅ `🔗 Test de connexion Sanity...`
- ✅ `Project ID: votre-project-id`
- ✅ `Token configuré: ✅ Oui`
- ✅ `✅ Connexion Sanity réussie: []`

### Si vous voyez des erreurs :
- ❌ `Project not found` → Vérifiez votre Project ID
- ❌ `Unauthorized` → Vérifiez votre token API
- ❌ `Token configuré: ❌ Non` → Ajoutez votre token dans le fichier `.env`

## 🧪 Test complet

1. **Créez un chantier** dans l'application React
2. **Vérifiez la console** : vous devriez voir les logs de sauvegarde
3. **Allez sur le Studio Sanity** (http://localhost:3333)
4. **Vérifiez** que le chantier apparaît dans l'interface Sanity
5. **Actualisez l'application React** : le chantier doit toujours être là

## 🔐 Sécurité du Token

⚠️ **IMPORTANT** : 
- Ne partagez JAMAIS votre token API
- Ne le commitez JAMAIS dans Git
- Le fichier `.env` est déjà dans `.gitignore`
- En production, utilisez les variables d'environnement de votre hébergeur

## 🆘 En cas de problème

### Problème : "Unauthorized"
1. Vérifiez que votre token est correct dans `.env`
2. Vérifiez que le token a les permissions **Editor**
3. Recréez un nouveau token si nécessaire

### Problème : Chantier non sauvegardé
1. Regardez la console pour les erreurs détaillées
2. Vérifiez que tous les champs obligatoires sont remplis
3. Testez d'abord la création directement dans le Studio Sanity

### Problème : "Project not found"
1. Vérifiez votre Project ID dans `.env`
2. Assurez-vous que le projet existe bien sur sanity.io

---

**🎯 L'objectif** : Quand vous créez un chantier dans l'app React, il doit apparaître dans le Studio Sanity instantanément !