// Schéma Sanity pour les chantiers
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