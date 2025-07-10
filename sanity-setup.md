# Configuration Sanity pour l'application Gestion des Chantiers

## Étapes de configuration

### 1. Créer un projet Sanity

1. Allez sur [sanity.io](https://www.sanity.io/)
2. Créez un compte ou connectez-vous
3. Créez un nouveau projet
4. Notez votre **Project ID**

### 2. Configurer le schéma

1. Dans votre studio Sanity, ajoutez le schéma suivant dans votre fichier de schémas :

```javascript
// Copiez le contenu du fichier src/schemas/chantier.ts
```

### 3. Variables d'environnement

1. Créez un fichier `.env` à la racine du projet
2. Ajoutez les variables suivantes :

```env
VITE_SANITY_PROJECT_ID=votre-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=votre-token-optionnel
```

### 4. Configuration des permissions

Dans votre projet Sanity :
1. Allez dans **Settings** > **API**
2. Configurez les permissions selon vos besoins :
   - **Public** : pour permettre la lecture sans authentification
   - **Authenticated** : pour nécessiter une authentification

### 5. Token d'API (optionnel)

Si vous avez besoin d'un token pour l'écriture :
1. Dans **Settings** > **API** > **Tokens**
2. Créez un nouveau token avec les permissions appropriées
3. Ajoutez-le à votre fichier `.env`

## Migration des données existantes

Si vous avez déjà des données dans le localStorage, vous pouvez les migrer vers Sanity :

1. Exportez vos données depuis le localStorage
2. Utilisez l'API Sanity pour les importer
3. Ou utilisez l'interface d'administration Sanity pour les saisir manuellement

## Avantages de Sanity

- **Données partagées** : Tous les utilisateurs voient les mêmes informations
- **Temps réel** : Les modifications sont synchronisées automatiquement
- **Interface d'administration** : Gestion facile des données via Sanity Studio
- **Sécurité** : Contrôle d'accès et permissions granulaires
- **Scalabilité** : Infrastructure cloud robuste
- **API GraphQL/GROQ** : Requêtes flexibles et performantes

## Prochaines étapes

1. Configurez votre projet Sanity
2. Ajoutez vos variables d'environnement
3. Testez la connexion
4. Migrez vos données existantes si nécessaire