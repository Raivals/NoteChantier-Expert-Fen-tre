import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // Désactivé pour les écritures en temps réel
  apiVersion: '2024-01-01',
  // Token optionnel pour les écritures (si nécessaire)
  token: import.meta.env.VITE_SANITY_TOKEN,
});

// Test de connexion
export const testConnection = async () => {
  try {
    console.log('🔗 Test de connexion Sanity...');
    console.log('Project ID:', import.meta.env.VITE_SANITY_PROJECT_ID);
    console.log('Dataset:', import.meta.env.VITE_SANITY_DATASET);
    
    const result = await client.fetch('*[_type == "chantier"][0..2]');
    console.log('✅ Connexion Sanity réussie:', result);
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion Sanity:', error);
    return false;
  }
};

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