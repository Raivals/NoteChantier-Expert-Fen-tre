import React from 'react';
import { ChevronLeft, Calendar, MapPin, Wrench, Zap, FileText, Edit, Printer } from 'lucide-react';
import { ChantierFormData } from '../types';

interface ChantierDetailProps {
  chantier: ChantierFormData;
  onBack: () => void;
  onEdit: () => void;
}

const ChantierDetail: React.FC<ChantierDetailProps> = ({ chantier, onBack, onEdit }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">{chantier.reference}</h1>
                <p className="text-blue-100">{chantier.typeConstruction}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrint}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
              >
                <Printer size={18} />
                <span>Imprimer</span>
              </button>
              <button
                onClick={onEdit}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Edit size={18} />
                <span>Modifier</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Informations générales */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="mr-2" size={20} />
              Informations générales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Référence</span>
                <p className="text-lg font-semibold text-gray-900">{chantier.reference}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Type de construction</span>
                <p className="text-lg font-semibold text-gray-900">{chantier.typeConstruction}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Date de création</span>
                <p className="text-gray-900 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(chantier.dateCreation)}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Dernière modification</span>
                <p className="text-gray-900 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(chantier.dateModification)}
                </p>
              </div>
            </div>
          </div>

          {/* Stationnement */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2" size={20} />
              Stationnement
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Type</span>
                <p className="text-lg font-semibold text-gray-900">{chantier.stationnement.type}</p>
              </div>
              {chantier.stationnement.informations && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Informations complémentaires</span>
                  <p className="text-gray-900 mt-1">{chantier.stationnement.informations}</p>
                </div>
              )}
            </div>
          </div>

          {/* Accès chantier */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2" size={20} />
              Accès chantier
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Niveau</span>
                <p className="text-lg font-semibold text-gray-900">{chantier.accesChantier.niveau}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Type d'accès</span>
                <p className="text-lg font-semibold text-gray-900">{chantier.accesChantier.type}</p>
              </div>
            </div>
            {chantier.accesChantier.informations && (
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-500">Informations complémentaires</span>
                <p className="text-gray-900 mt-1">{chantier.accesChantier.informations}</p>
              </div>
            )}
          </div>

          {/* Matériel spécifique */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Wrench className="mr-2" size={20} />
              Matériel spécifique
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Matériel requis</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {chantier.materielSpecifique.types.length > 0 ? (
                    chantier.materielSpecifique.types.map((type, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {type}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">Aucun matériel spécifique</span>
                  )}
                </div>
              </div>
              {chantier.materielSpecifique.informations && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Informations complémentaires</span>
                  <p className="text-gray-900 mt-1">{chantier.materielSpecifique.informations}</p>
                </div>
              )}
            </div>
          </div>

          {/* Type de pose et électricité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Type de pose</h2>
              <p className="text-lg font-semibold text-gray-900">{chantier.typePose}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Zap className="mr-2" size={20} />
                Électricité
              </h2>
              <p className="text-lg font-semibold text-gray-900">{chantier.electricite}</p>
            </div>
          </div>

          {/* Informations spécifiques */}
          {chantier.informationsSpecifiques && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Informations ou spécificités du chantier
              </h2>
              <p className="text-gray-900 whitespace-pre-wrap">{chantier.informationsSpecifiques}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChantierDetail;