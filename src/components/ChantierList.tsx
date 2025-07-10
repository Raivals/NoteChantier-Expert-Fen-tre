import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Calendar, MapPin } from 'lucide-react';
import { ChantierFormData } from '../types';

interface ChantierListProps {
  chantiers: ChantierFormData[];
  onCreateNew: () => void;
  onEdit: (chantier: ChantierFormData) => void;
  onView: (chantier: ChantierFormData) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
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
                         chantier.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <div className="p-6 mx-auto max-w-7xl">
      <div className="overflow-hidden bg-white shadow-lg rounded-xl">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Gestion des chantiers</h1>
            <button
              onClick={onCreateNew}
              className="flex items-center px-4 py-2 space-x-2 font-medium text-blue-600 transition-colors bg-white rounded-lg hover:bg-blue-50"
            >
              <Plus size={20} />
              <span>Nouveau chantier</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Filtres et recherche */}
          <div className="flex flex-col gap-4 mb-6 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
              <input
                type="text"
                placeholder="Rechercher par référence, adresse ou informations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="py-12 text-center">
              <div className="mb-4 text-gray-400">
                <MapPin size={48} className="mx-auto" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                {chantiers.length === 0 ? 'Aucun chantier enregistré' : 'Aucun chantier trouvé'}
              </h3>
              <p className="mb-4 text-gray-500">
                {chantiers.length === 0 
                  ? 'Commencez par créer votre premier chantier'
                  : 'Essayez de modifier vos critères de recherche'
                }
              </p>
              {chantiers.length === 0 && (
                <button
                  onClick={onCreateNew}
                  className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Créer un chantier
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredChantiers.map((chantier) => (
                <div key={chantier.id} className="transition-shadow border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{chantier.reference}</h3>
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

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="flex-shrink-0 mr-2" />
                        <span className="truncate">{chantier.adresse}</span>
                      </div>
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
                        className="flex items-center justify-center flex-1 px-3 py-2 space-x-1 text-sm text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                      >
                        <Eye size={14} />
                        <span>Voir</span>
                      </button>
                      <button
                        onClick={() => onEdit(chantier)}
                        className="flex items-center justify-center flex-1 px-3 py-2 space-x-1 text-sm text-white transition-colors bg-green-600 rounded hover:bg-green-700"
                      >
                        <Edit size={14} />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(chantier.id, chantier.reference)}
                        className="px-3 py-2 text-sm text-white transition-colors bg-red-600 rounded hover:bg-red-700"
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