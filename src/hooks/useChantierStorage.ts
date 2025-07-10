import { useState, useEffect } from 'react';
import {client} from '../lib/sanity';
import { CHANTIERS_QUERY, testConnection } from '../lib/sanity';
import { ChantierFormData } from '../types';

// Fonction pour convertir les données Sanity vers le format de l'application
const convertSanityToChantier = (sanityData: any): ChantierFormData => {
  return {
    id: sanityData._id,
    reference: sanityData.reference,
    adresse: sanityData.adresse,
    typeConstruction: sanityData.typeConstruction,
    stationnement: sanityData.stationnement || { type: 'Devant', informations: '' },
    accesChantier: sanityData.accesChantier || { niveau: 'RDC', type: 'Escaliers', informations: '' },
    materielSpecifique: sanityData.materielSpecifique || { types: [], informations: '' },
    typePose: sanityData.typePose,
    electricite: sanityData.electricite,
    informationsSpecifiques: sanityData.informationsSpecifiques || '',
    dateCreation: sanityData.dateCreation,
    dateModification: sanityData.dateModification,
  };
};

// Fonction pour convertir les données de l'application vers le format Sanity
const convertChantierToSanity = (chantier: ChantierFormData) => {
  const sanityDoc: any = {
    _type: 'chantier',
    reference: chantier.reference,
    adresse: chantier.adresse,
    typeConstruction: chantier.typeConstruction,
    stationnement: chantier.stationnement,
    accesChantier: chantier.accesChantier,
    materielSpecifique: chantier.materielSpecifique,
    typePose: chantier.typePose,
    electricite: chantier.electricite,
    informationsSpecifiques: chantier.informationsSpecifiques,
    dateCreation: chantier.dateCreation,
    dateModification: new Date().toISOString(),
  };

  // Si c'est une mise à jour, inclure l'ID
  if (chantier.id && chantier.id !== 'new') {
    sanityDoc._id = chantier.id;
  }

  return sanityDoc;
};

export const useChantierStorage = () => {
  const [chantiers, setChantiers] = useState<ChantierFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les chantiers depuis Sanity
  const fetchChantiers = async () => {
    try {
      console.log('🔄 Chargement des chantiers depuis Sanity...');
      
      // Test de connexion d'abord
      const connectionOk = await testConnection();
      if (!connectionOk) {
        throw new Error('Impossible de se connecter à Sanity. Vérifiez votre configuration.');
      }
      
      setLoading(true);
      setError(null);
      const data = await client.fetch(CHANTIERS_QUERY);
      console.log('✅ Données reçues de Sanity:', data);
      const convertedData = data.map(convertSanityToChantier);
      setChantiers(convertedData);
    } catch (err) {
      console.error('❌ Erreur lors du chargement des chantiers:', err);
      setError(`Erreur lors du chargement des données: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChantiers();
  }, []);

  // Sauvegarder un chantier
  const saveChantier = async (chantier: ChantierFormData) => {
    try {
      console.log('💾 Sauvegarde du chantier:', chantier);
      setError(null);
      
      // Vérifier la connexion avant de sauvegarder
      const connectionOk = await testConnection();
      if (!connectionOk) {
        throw new Error('Impossible de se connecter à Sanity pour la sauvegarde');
      }
      
      const sanityDoc = convertChantierToSanity(chantier);
      console.log('📄 Document Sanity à sauvegarder:', sanityDoc);
      
      let result;
      if (chantier.id && chantier.id !== 'new') {
        // Mise à jour
        console.log('🔄 Mise à jour du chantier existant');
        result = await client.createOrReplace(sanityDoc);
      } else {
        // Création
        console.log('➕ Création d\'un nouveau chantier');
        result = await client.create(sanityDoc);
      }

      console.log('✅ Chantier sauvegardé:', result);
      
      // Recharger les données
      await fetchChantiers();
      
      return result;
    } catch (err) {
      console.error('❌ Erreur lors de la sauvegarde:', err);
      setError(`Erreur lors de la sauvegarde: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
      throw err;
    }
  };

  // Supprimer un chantier
  const deleteChantier = async (id: string) => {
    try {
      console.log('🗑️ Suppression du chantier:', id);
      setError(null);
      
      // Vérifier la connexion
      const connectionOk = await testConnection();
      if (!connectionOk) {
        throw new Error('Impossible de se connecter à Sanity pour la suppression');
      }
      
      await client.delete(id);
      console.log('✅ Chantier supprimé avec succès');
      
      // Recharger les données
      await fetchChantiers();
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(`Erreur lors de la suppression: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
      throw err;
    }
  };

  // Obtenir un chantier par ID
  const getChantierById = (id: string) => {
    return chantiers.find(c => c.id === id);
  };

  return {
    chantiers,
    loading,
    error,
    saveChantier,
    deleteChantier,
    getChantierById,
    refetch: fetchChantiers,
  };
};