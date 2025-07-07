import { useState, useEffect } from 'react';
import { ChantierFormData } from '../types';

const STORAGE_KEY = 'chantiers_data';

export const useChantierStorage = () => {
  const [chantiers, setChantiers] = useState<ChantierFormData[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setChantiers(parsedData);
      } catch (error) {
        console.error('Error parsing saved data:', error);
      }
    }
  }, []);

  const saveChantier = (chantier: ChantierFormData) => {
    const updatedChantiers = [...chantiers];
    const existingIndex = updatedChantiers.findIndex(c => c.id === chantier.id);
    
    if (existingIndex >= 0) {
      updatedChantiers[existingIndex] = {
        ...chantier,
        dateModification: new Date().toISOString()
      };
    } else {
      updatedChantiers.push(chantier);
    }
    
    setChantiers(updatedChantiers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChantiers));
  };

  const deleteChantier = (id: string) => {
    const updatedChantiers = chantiers.filter(c => c.id !== id);
    setChantiers(updatedChantiers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChantiers));
  };

  const getChantierById = (id: string) => {
    return chantiers.find(c => c.id === id);
  };

  return {
    chantiers,
    saveChantier,
    deleteChantier,
    getChantierById
  };
};