import {defineField, defineType} from 'sanity'

export const chantierType = defineType({
  name: 'chantier',
  title: 'Chantier',
  type: 'document',
  fields: [
    defineField({
      name: 'reference',
      title: 'Référence chantier',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'typeConstruction',
      title: 'Type de construction',
      type: 'string',
      options: {
        list: [
          { title: 'Maison', value: 'Maison' },
          { title: 'Bâtiment', value: 'Bâtiment' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stationnement',
      title: 'Stationnement',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Type de stationnement',
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
          initialValue: 'Devant',
        }),
        defineField({
          name: 'informations',
          title: 'Informations complémentaires',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'accesChantier',
      title: 'Accès chantier',
      type: 'object',
      fields: [
        defineField({
          name: 'niveau',
          title: 'Niveau',
          type: 'string',
          options: {
            list: [
              { title: 'RDC', value: 'RDC' },
              { title: '1er étage', value: '1er' },
              { title: '2ème étage', value: '2ème' },
              { title: '3ème étage', value: '3ème' },
              { title: 'Autre', value: 'Autre' },
            ],
          },
          initialValue: 'RDC',
        }),
        defineField({
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
          initialValue: 'Escaliers',
        }),
        defineField({
          name: 'informations',
          title: 'Informations complémentaires',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'materielSpecifique',
      title: 'Matériel spécifique',
      type: 'object',
      fields: [
        defineField({
          name: 'types',
          title: 'Types de matériel requis',
          type: 'array',
          of: [
            {
              type: 'string',
              options: {
                list: [
                  { title: 'Échelle', value: 'Echelle' },
                  { title: 'Matériel de maçonnerie', value: 'Maçonnerie' },
                  { title: 'Matériel d\'enduit', value: 'Enduit' },
                  { title: 'Autres équipements', value: 'Autres' },
                ],
              },
            },
          ],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'informations',
          title: 'Informations complémentaires',
          type: 'text',
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: 'typePose',
      title: 'Type de pose',
      type: 'string',
      options: {
        list: [
          { title: 'Neuf', value: 'Neuf' },
          { title: 'Rénovation sur ancien châssis', value: 'Rénovation sur ancien châssis' },
          { title: 'Dépose totale', value: 'Dépose totale' },
          { title: 'Applique', value: 'Applique' },
          { title: 'Ébrasement', value: 'Ebrasement' },
          { title: 'Tunnel', value: 'Tunnel' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'Neuf',
    }),
    defineField({
      name: 'electricite',
      title: 'Électricité',
      type: 'string',
      options: {
        list: [
          { title: 'À la charge du client', value: 'Client' },
          { title: 'Expert fenêtre', value: 'Expert fenêtre' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'Client',
    }),
    defineField({
      name: 'informationsSpecifiques',
      title: 'Informations ou spécificités du chantier',
      type: 'text',
      rows: 4,
      description: 'Toutes informations importantes pour la préparation du chantier',
    }),
    defineField({
      name: 'dateCreation',
      title: 'Date de création',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'dateModification',
      title: 'Date de modification',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'reference',
      subtitle: 'adresse',
      description: 'typeConstruction',
    },
    prepare(selection) {
      const { title, subtitle, description } = selection;
      return {
        title: title || 'Chantier sans référence',
        subtitle: subtitle || 'Adresse non renseignée',
        media: description === 'Maison' ? '🏠' : '🏢',
      };
    },
  },
  orderings: [
    {
      title: 'Date de création (récent en premier)',
      name: 'dateCreationDesc',
      by: [{ field: 'dateCreation', direction: 'desc' }],
    },
    {
      title: 'Date de création (ancien en premier)',
      name: 'dateCreationAsc',
      by: [{ field: 'dateCreation', direction: 'asc' }],
    },
    {
      title: 'Référence (A-Z)',
      name: 'referenceAsc',
      by: [{ field: 'reference', direction: 'asc' }],
    },
    {
      title: 'Type de construction',
      name: 'typeConstruction',
      by: [{ field: 'typeConstruction', direction: 'asc' }],
    },
  ],
})