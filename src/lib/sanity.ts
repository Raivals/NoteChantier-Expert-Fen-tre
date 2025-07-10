import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
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