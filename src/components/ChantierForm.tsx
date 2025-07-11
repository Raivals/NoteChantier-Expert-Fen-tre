import React, { useState, useEffect } from 'react';
import { ChevronLeft, Save, AlertCircle } from 'lucide-react';
import { ChantierFormData, FormErrors } from '../types';

interface ChantierFormProps {
  onBack: () => void;
  onSave: (chantier: ChantierFormData) => void;
  editingChantier?: ChantierFormData;
  loading?: boolean;
}

const ChantierForm: React.FC<ChantierFormProps> = ({ 
  onBack, 
  onSave, 
  editingChantier,
  loading = false 
}) => {
  const [formData, setFormData] = useState<ChantierFormData>({
    id: editingChantier?.id || 'new',
    reference: editingChantier?.reference || '',
    adresse: editingChantier?.adresse || '',
    typeConstruction: editingChantier?.typeConstruction || 'Maison',
    stationnement: editingChantier?.stationnement || {
      type: 'Devant',
      informations: ''
    },
    accesChantier: editingChantier?.accesChantier || {
      niveau: 'RDC',
      type: 'Escaliers',
      informations: ''
    },
    materielSpecifique: editingChantier?.materielSpecifique || {
      types: [],
      informations: ''
    },
    typePose: editingChantier?.typePose || 'Neuf',
    electricite: editingChantier?.electricite || 'Client',
    informationsSpecifiques: editingChantier?.informationsSpecifiques || '',
    dateCreation: editingChantier?.dateCreation || new Date().toISOString(),
    dateModification: editingChantier?.dateModification || new Date().toISOString()
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.reference.trim()) {
      newErrors.reference = 'La référence chantier est obligatoire';
    }

    if (!formData.adresse.trim()) {
      newErrors.adresse = 'L\'adresse est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMaterielChange = (materiel: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      materielSpecifique: {
        ...prev.materielSpecifique,
        types: checked 
          ? [...prev.materielSpecifique.types, materiel as any]
          : prev.materielSpecifique.types.filter(t => t !== materiel)
      }
    }));
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <div className="overflow-hidden bg-white shadow-lg rounded-xl">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-white transition-colors hover:text-blue-200"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold text-white">
                {editingChantier ? 'Modifier le chantier' : 'Nouveau chantier'}
              </h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Informations générales */}
          <div className="space-y-6">
            <h2 className="pb-2 text-lg font-semibold text-gray-800 border-b border-gray-200">
              Informations générales
            </h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Référence chantier *
                </label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.reference ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ex: CHANT-2024-001"
                />
                {errors.reference && (
                  <p className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle size={16} className="mr-1" />
                    {errors.reference}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Type de construction
                </label>
                <select
                  value={formData.typeConstruction}
                  onChange={(e) => setFormData(prev => ({ ...prev, typeConstruction: e.target.value as any }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Maison">Maison</option>
                  <option value="Bâtiment">Bâtiment</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Adresse *
              </label>
              <input
                type="text"
                value={formData.adresse}
                onChange={(e) => setFormData(prev => ({ ...prev, adresse: e.target.value }))}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.adresse ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: 123 Rue de la République, 75001 Paris"
              />
              {errors.adresse && (
                <p className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.adresse}
                </p>
              )}
            </div>
          </div>

          {/* Stationnement */}
          <div className="space-y-6">
            <h2 className="pb-2 text-lg font-semibold text-gray-800 border-b border-gray-200">
              Stationnement
            </h2>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {['Devant', 'Allée', 'Cour', 'Difficile', 'Autre'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stationnement"
                    value={option}
                    checked={formData.stationnement.type === option}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      stationnement: { ...prev.stationnement, type: e.target.value as any }
                    }))}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Informations complémentaires
              </label>
              <textarea
                value={formData.stationnement.informations}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  stationnement: { ...prev.stationnement, informations: e.target.value }
                }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Précisions sur le stationnement..."
              />
            </div>
          </div>

          {/* Accès chantier */}
          <div className="space-y-6">
            <h2 className="pb-2 text-lg font-semibold text-gray-800 border-b border-gray-200">
              Accès chantier
            </h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Niveau
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['RDC', '1er', '2ème', '3ème', 'Autre'].map((niveau) => (
                    <label key={niveau} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="niveau"
                        value={niveau}
                        checked={formData.accesChantier.niveau === niveau}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          accesChantier: { ...prev.accesChantier, niveau: e.target.value as any }
                        }))}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{niveau}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Type d'accès
                </label>
                <div className="space-y-2">
                  {['Escaliers', 'Ascenseur', 'Les deux'].map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="typeAcces"
                        value={type}
                        checked={formData.accesChantier.type === type}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          accesChantier: { ...prev.accesChantier, type: e.target.value as any }
                        }))}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Informations complémentaires
              </label>
              <textarea
                value={formData.accesChantier.informations}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  accesChantier: { ...prev.accesChantier, informations: e.target.value }
                }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Précisions sur l'accès..."
              />
            </div>
          </div>

          {/* Matériel spécifique */}
          <div className="space-y-6">
            <h2 className="pb-2 text-lg font-semibold text-gray-800 border-b border-gray-200">
              Matériel spécifique
            </h2>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {['Echelle', 'Maçonnerie', 'Enduit', 'Autres'].map((materiel) => (
                <label key={materiel} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.materielSpecifique.types.includes(materiel as any)}
                    onChange={(e) => handleMaterielChange(materiel, e.target.checked)}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{materiel}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Informations complémentaires
              </label>
              <textarea
                value={formData.materielSpecifique.informations}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  materielSpecifique: { ...prev.materielSpecifique, informations: e.target.value }
                }))}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Précisions sur le matériel..."
              />
            </div>
          </div>

          {/* Type de pose */}
          <div className="space-y-6">
            <h2 className="pb-2 text-lg font-semibold text-gray-800 border-b border-gray-200">
              Type de pose
            </h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {['Neuf', 'Rénovation sur ancien châssis', 'Dépose totale', 'Applique', 'Ebrasement', 'Tunnel'].map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="typePose"
                    value={type}
                    checked={formData.typePose === type}
                    onChange={(e) => setFormData(prev => ({ ...prev, typePose: e.target.value as any }))}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Electricité */}
          <div className="space-y-6">
            <h2 className="pb-2 text-lg font-semibold text-gray-800 border-b border-gray-200">
              Electricité
            </h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {['Client', 'Expert fenêtre'].map((option) => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="electricite"
                    value={option}
                    checked={formData.electricite === option}
                    onChange={(e) => setFormData(prev => ({ ...prev, electricite: e.target.value as any }))}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Informations spécifiques */}
          <div className="space-y-6">
            <h2 className="pb-2 text-lg font-semibold text-gray-800 border-b border-gray-200">
              Informations ou spécificités du chantier
            </h2>
            
            <div>
              <textarea
                value={formData.informationsSpecifiques}
                onChange={(e) => setFormData(prev => ({ ...prev, informationsSpecifiques: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Toutes informations importantes pour la préparation du chantier..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-6 space-x-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="flex items-center px-6 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{isSubmitting || loading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChantierForm;