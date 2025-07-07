import React, { useState } from 'react';
import { ChantierFormData } from './types';
import { useChantierStorage } from './hooks/useChantierStorage';
import ChantierList from './components/ChantierList';
import ChantierForm from './components/ChantierForm';
import ChantierDetail from './components/ChantierDetail';

type ViewMode = 'list' | 'form' | 'detail';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedChantier, setSelectedChantier] = useState<ChantierFormData | null>(null);
  const [editingChantier, setEditingChantier] = useState<ChantierFormData | null>(null);
  
  const { chantiers, saveChantier, deleteChantier } = useChantierStorage();

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

  const handleSave = (chantier: ChantierFormData) => {
    saveChantier(chantier);
    setViewMode('list');
  };

  const handleBack = () => {
    setViewMode('list');
    setSelectedChantier(null);
    setEditingChantier(null);
  };

  const handleDelete = (id: string) => {
    deleteChantier(id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {viewMode === 'list' && (
        <ChantierList
          chantiers={chantiers}
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      )}
      
      {viewMode === 'form' && (
        <ChantierForm
          onBack={handleBack}
          onSave={handleSave}
          editingChantier={editingChantier}
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