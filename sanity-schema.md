# Schéma Sanity pour Gestion des Chantiers

## Configuration du Studio Sanity

Créez un fichier `chantier.ts` dans votre dossier `schemas` de Sanity Studio :

```typescript
export const chantierSchema = {
  name: 'chantier',
  title: 'Chantier',
  type: 'document',
  fields: [
    {
      name: 'reference',
      title: 'Référence',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'adresse',
      title: 'Adresse',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'typeConstruction',
      title: 'Type de construction',
      type: 'string',
      options: {
        list: [
          { title: 'Maison', value: 'Maison' },
          { title: 'Bâtiment', value: 'Bâtiment' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'stationnement',
      title: 'Stationnement',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'Devant', value: 'Devant' },
              { title: 'Allée', value: 'Allée' },
              { title: 'Cour', value: 'Cour' },
              { title: 'Difficile', value: 'Difficile' },
              { title: 'Autre', value: 'Autre' },
            ],
          },
        },
        {
          name: 'informations',
          title: 'Informations complémentaires',
          type: 'text',
        },
      ],
    },
    {
      name: 'accesChantier',
      title: 'Accès chantier',
      type: 'object',
      fields: [
        {
          name: 'niveau',
          title: 'Niveau',
          type: 'string',
          options: {
            list: [
              { title: 'RDC', value: 'RDC' },
              { title: '1er', value: '1er' },
              { title: '2ème', value: '2ème' },
              { title: '3ème', value: '3ème' },
              { title: 'Autre', value: 'Autre' },
            ],
          },
        },
        {
          name: 'type',
          title: 'Type d\'accès',
          type: 'string',
          options: {
            list: [
              { title: 'Escaliers', value: 'Escaliers' },
              { title: 'Ascenseur', value: 'Ascenseur' },
              { title: 'Les deux', value: 'Les deux' },
            ],
          },
        },
        {
          name: 'informations',
          title: 'Informations complémentaires',
          type: 'text',
        },
      ],
    },
    {
      name: 'materielSpecifique',
      title: 'Matériel spécifique',
      type: 'object',
      fields: [
        {
          name: 'types',
          title: 'Types de matériel',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Echelle', value: 'Echelle' },
                  { title: 'Maçonnerie', value: 'Maçonnerie' },
                  { title: 'Enduit', value: 'Enduit' },
                  { title: 'Autres', value: 'Autres' },
                ],
              },
            },
          ],
        },
        {
          name: 'informations',
          title: 'Informations complémentaires',
          type: 'text',
        },
      ],
    },
    {
      name: 'typePose',
      title: 'Type de pose',
      type: 'string',
      options: {
        list: [
          { title: 'Neuf', value: 'Neuf' },
          { title: 'Rénovation sur ancien châssis', value: 'Rénovation sur ancien châssis' },
          { title: 'Dépose totale', value: 'Dépose totale' },
          { title: 'Applique', value: 'Applique' },
          { title: 'Ebrasement', value: 'Ebrasement' },
          { title: 'Tunnel', value: 'Tunnel' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'electricite',
      title: 'Électricité',
      type: 'string',
      options: {
        list: [
          { title: 'Client', value: 'Client' },
          { title: 'Expert fenêtre', value: 'Expert fenêtre' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'informationsSpecifiques',
      title: 'Informations spécifiques',
      type: 'text',
    },
    {
      name: 'dateCreation',
      title: 'Date de création',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'dateModification',
      title: 'Date de modification',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'reference',
      subtitle: 'adresse',
      media: 'typeConstruction',
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle,
      };
    },
  },
};
```

## Ajoutez le schéma à votre index.ts

```typescript
import { chantierSchema } from './chantier'

export const schemaTypes = [chantierSchema]
```

## Configuration du projet

1. Créez un compte sur https://www.sanity.io/
2. Créez un nouveau projet
3. Notez votre Project ID
4. Installez les dépendances Sanity : `npm install @sanity/client @sanity/image-url`
5. Configurez votre studio avec le schéma ci-dessus
6. Déployez votre studio avec `npm run sanity:deploy`

## Variables d'environnement

Créez un fichier `.env` à la racine de votre projet :

```env
VITE_SANITY_PROJECT_ID=votre-project-id
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=votre-token-optionnel
```

## Configuration du client Sanity

Mettez à jour le fichier `src/lib/sanity.ts` :

```typescript
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN, // Optionnel pour les lectures publiques
});

// Queries GROQ pour récupérer les données
export const CHANTIERS_QUERY = `*[_type == "chantier"] | order(dateCreation desc) {
  _id,
  reference,
  adresse,
  typeConstruction,
  stationnement,
  accesChantier,
  materielSpecifique,
  typePose,
  electricite,
  informationsSpecifiques,
  dateCreation,
  dateModification
}`;

export const CHANTIER_BY_ID_QUERY = `*[_type == "chantier" && _id == $id][0] {
  _id,
  reference,
  adresse,
  typeConstruction,
  stationnement,
  accesChantier,
  materielSpecifique,
  typePose,
  electricite,
  informationsSpecifiques,
  dateCreation,
  dateModification
}`;
```

## Structure des données

Le schéma `chantier` comprend :

### Informations générales
- **reference** : Référence unique du chantier (obligatoire)
- **adresse** : Adresse complète du chantier (obligatoire)
- **typeConstruction** : Maison ou Bâtiment (obligatoire)

### Stationnement
- **type** : Devant, Allée, Cour, Difficile, Autre
- **informations** : Détails complémentaires

### Accès chantier
- **niveau** : RDC, 1er, 2ème, 3ème, Autre
- **type** : Escaliers, Ascenseur, Les deux
- **informations** : Précisions sur l'accès

### Matériel spécifique
- **types** : Array de matériels (Echelle, Maçonnerie, Enduit, Autres)
- **informations** : Détails sur le matériel requis

### Type de pose
- **typePose** : Neuf, Rénovation, Dépose totale, Applique, Ebrasement, Tunnel (obligatoire)

### Électricité
- **electricite** : Client ou Expert fenêtre (obligatoire)

### Informations complémentaires
- **informationsSpecifiques** : Champ libre pour notes importantes
- **dateCreation** : Date de création automatique
- **dateModification** : Date de dernière modification

## Commandes utiles

```bash
# Démarrer le studio Sanity en développement
npm run sanity

# Construire le studio pour la production
npm run sanity:build

# Déployer le studio sur Sanity
npm run sanity:deploy

# Démarrer l'application React
npm run dev
```

## Avantages de cette configuration

- **Données partagées** : Tous les utilisateurs accèdent aux mêmes informations
- **Interface d'administration** : Sanity Studio pour gérer les données facilement
- **Validation automatique** : Champs obligatoires et types contrôlés
- **Temps réel** : Synchronisation automatique des modifications
- **Recherche avancée** : Requêtes GROQ puissantes
- **Sécurité** : Contrôle d'accès granulaire
- **Scalabilité** : Infrastructure cloud robuste