# 🚨 INSTRUCTIONS IMPORTANTES - Configuration Sanity

## ⚠️ ÉTAPES OBLIGATOIRES AVANT DE TESTER

### 1. 🔧 Créer votre projet Sanity

1. **Allez sur** [sanity.io](https://www.sanity.io/)
2. **Créez un compte** ou connectez-vous
3. **Créez un nouveau projet** :
   - Nom : "Gestion des Chantiers"
   - Template : "Clean project with no predefined schemas"
4. **NOTEZ VOTRE PROJECT ID** (très important !)

### 2. 📝 Configurer les variables d'environnement

1. **Ouvrez le fichier `.env`** à la racine du projet
2. **Remplacez** `your-project-id-here` par votre vrai Project ID
3. **Sauvegardez** le fichier

```env
# REMPLACEZ cette valeur par votre vrai Project ID
VITE_SANITY_PROJECT_ID=abc123def456
VITE_SANITY_DATASET=production
```

### 3. 🚀 Redémarrer les serveurs

```bash
# Arrêtez tous les serveurs en cours (Ctrl+C)
# Puis redémarrez :

# Terminal 1 : Application React
npm run dev

# Terminal 2 : Studio Sanity
npm run sanity
```

### 4. 🎯 Première connexion au Studio

1. **Ouvrez** http://localhost:3333
2. **Connectez-vous** avec votre compte Sanity
3. **Autorisez** l'accès au projet
4. **Vous devriez voir** l'interface Sanity avec le type "Chantier"

## 🔍 Vérification que tout fonctionne

### Dans la console du navigateur (F12) :
- ✅ Vous devriez voir : `🔄 Chargement des chantiers depuis Sanity...`
- ✅ Puis : `✅ Données reçues de Sanity: []` (tableau vide au début)

### Si vous voyez des erreurs :
- ❌ `Project not found` → Vérifiez votre Project ID
- ❌ `Unauthorized` → Reconnectez-vous au Studio Sanity
- ❌ `Network error` → Vérifiez votre connexion internet

## 🧪 Test complet

1. **Créez un chantier** dans l'application React
2. **Vérifiez la console** : vous devriez voir les logs de sauvegarde
3. **Allez sur le Studio Sanity** (http://localhost:3333)
4. **Vérifiez** que le chantier apparaît dans l'interface Sanity
5. **Actualisez l'application React** : le chantier doit toujours être là

## 🆘 En cas de problème

### Problème : "No document types"
- ✅ **Résolu** dans cette version

### Problème : Chantier non sauvegardé
1. Vérifiez votre Project ID dans `.env`
2. Regardez la console pour les erreurs
3. Assurez-vous d'être connecté au Studio Sanity

### Problème : Erreur de permissions
1. Allez dans votre projet Sanity
2. **Settings** → **API** → **CORS origins**
3. Ajoutez `http://localhost:5173` et `http://localhost:3333`

## 📞 Support

Si ça ne marche toujours pas :
1. **Copiez-collez** les erreurs de la console
2. **Vérifiez** que votre Project ID est correct
3. **Testez** d'abord la création d'un chantier directement dans le Studio Sanity

---

**🎯 L'objectif** : Quand vous créez un chantier dans l'app React, il doit apparaître dans le Studio Sanity, et vice-versa !