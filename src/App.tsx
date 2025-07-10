import React, { useState } from 'react';
import { ChantierFormData } from './types';
import { useSanityChantiers } from './hooks/useSanityChantiers';
import ChantierList from './components/ChantierList';
import ChantierForm from './components/ChantierForm';
import ChantierDetail from './components/ChantierDetail';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

type ViewMode = 'list' | 'form' | 'detail';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedChantier, setSelectedChantier] = useState<ChantierFormData | null>(null);
  const [editingChantier, setEditingChantier] = useState<ChantierFormData | null>(null);
  
  const { 
    chantiers, 
    loading, 
    error, 
    saveChantier, 
    deleteChantier, 
    refetch 
  } = useSanityChantiers();

  const handleCreateNew = () => {
    setEditingChantier(null);
    setViewMode('form');
  };

  const handleEdit = (chantier: ChantierFormData) => {
    setEditingChantier(chantier);
    setViewMode('form');
  };

  const handleView = (chantier: ChantierFormData) => {
    setSelectedChantier(chantier);
    setViewMode('detail');
  };

  const handleSave = async (chantier: ChantierFormData) => {
    try {
      await saveChantier(chantier);
      setViewMode('list');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedChantier(null);
    setEditingChantier(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteChantier(id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  // Affichage du chargement initial
  if (loading && chantiers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoadingSpinner message="Chargement des chantiers..." size="lg" />
      </div>
    );
  }

  // Affichage d'erreur avec possibilité de réessayer
  if (error && chantiers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded">
          {error}
        </div>
      )}
      
      {viewMode === 'list' && (
        <ChantierList
          chantiers={chantiers}
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
      
      {viewMode === 'form' && (
        <ChantierForm
          onBack={handleBack}
          onSave={handleSave}
          editingChantier={editingChantier}
          loading={loading}
        />
      )}
      
      {viewMode === 'detail' && selectedChantier && (
        <ChantierDetail
          chantier={selectedChantier}
          onBack={handleBack}
          onEdit={() => handleEdit(selectedChantier)}
        />
      )}
    </div>
  );
}

export default App;