import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Calendar, MapPin } from 'lucide-react';
import { ChantierFormData } from '../types';

interface ChantierListProps {
  chantiers: ChantierFormData[];
  onCreateNew: () => void;
  onEdit: (chantier: ChantierFormData) => void;
  onView: (chantier: ChantierFormData) => void;
  onDelete: (id: string) => void;
}

const ChantierList: React.FC<ChantierListProps> = ({
  chantiers,
  onCreateNew,
  onEdit,
  onView,
  onDelete
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Maison' | 'Bâtiment'>('all');

  const filteredChantiers = chantiers.filter(chantier => {
    const matchesSearch = chantier.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chantier.informationsSpecifiques.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || chantier.typeConstruction === filterType;
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleDelete = (id: string, reference: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le chantier "${reference}" ?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Gestion des chantiers</h1>
            <button
              onClick={onCreateNew}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2 font-medium"
            >
              <Plus size={20} />
              <span>Nouveau chantier</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Filtres et recherche */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par référence ou informations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              <option value="Maison">Maison</option>
              <option value="Bâtiment">Bâtiment</option>
            </select>
          </div>

          {/* Liste des chantiers */}
          {filteredChantiers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MapPin size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {chantiers.length === 0 ? 'Aucun chantier enregistré' : 'Aucun chantier trouvé'}
              </h3>
              <p className="text-gray-500 mb-4">
                {chantiers.length === 0 
                  ? 'Commencez par créer votre premier chantier'
                  : 'Essayez de modifier vos critères de recherche'
                }
              </p>
              {chantiers.length === 0 && (
                <button
                  onClick={onCreateNew}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Créer un chantier
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChantiers.map((chantier) => (
                <div key={chantier.id} className="bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{chantier.reference}</h3>
                        <p className="text-sm text-gray-600">{chantier.typeConstruction}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        chantier.typeConstruction === 'Maison' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {chantier.typeConstruction}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-2" />
                        <span>Stationnement: {chantier.stationnement.type}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-2" />
                        <span>Créé le {formatDate(chantier.dateCreation)}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Pose:</span> {chantier.typePose}
                      </div>
                    </div>

                    {chantier.informationsSpecifiques && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {chantier.informationsSpecifiques}
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button
                        onClick={() => onView(chantier)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Eye size={14} />
                        <span>Voir</span>
                      </button>
                      <button
                        onClick={() => onEdit(chantier)}
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Edit size={14} />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(chantier.id, chantier.reference)}
                        className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChantierList;