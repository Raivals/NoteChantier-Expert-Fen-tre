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
              <div>
                <h1 className="text-2xl font-bold text-white">{chantier.reference}</h1>
                <p className="text-blue-100">{chantier.typeConstruction}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 space-x-2 text-white transition-colors rounded-lg bg-white/20 hover:bg-white/30"
              >
                <Printer size={18} />
                <span>Imprimer</span>
              </button>
              <button
                onClick={onEdit}
                className="flex items-center px-4 py-2 space-x-2 text-blue-600 transition-colors bg-white rounded-lg hover:bg-blue-50"
              >
                <Edit size={18} />
                <span>Modifier</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Informations générales */}
          <div className="p-6 rounded-lg bg-gray-50">
            <h2 className="flex items-center mb-4 text-lg font-semibold text-gray-800">
              <FileText className="mr-2" size={20} />
              Informations générales
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Référence</span>
                <p className="text-lg font-semibold text-gray-900">{chantier.reference}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Type de construction</span>
                <p className="text-lg font-semibold text-gray-900">{chantier.typeConstruction}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-sm font-medium text-gray-500">Adresse</span>
                <p className="flex items-center text-lg font-semibold text-gray-900">
                  <MapPin size={16} className="mr-1" />
                  {chantier.adresse}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Date de création</span>
                <p className="flex items-center text-gray-900">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(chantier.dateCreation)}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Dernière modification</span>
                <p className="flex items-center text-gray-900">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(chantier.dateModification)}
                </p>
              </div>
            </div>
          </div>

          {/* Stationnement */}
          <div className="p-6 rounded-lg bg-gray-50">
            <h2 className="flex items-center mb-4 text-lg font-semibold text-gray-800">
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
                  <p className="mt-1 text-gray-900">{chantier.stationnement.informations}</p>
                </div>
              )}
            </div>
          </div>

          {/* Accès chantier */}
          <div className="p-6 rounded-lg bg-gray-50">
            <h2 className="flex items-center mb-4 text-lg font-semibold text-gray-800">
              <MapPin className="mr-2" size={20} />
              Accès chantier
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <p className="mt-1 text-gray-900">{chantier.accesChantier.informations}</p>
              </div>
            )}
          </div>

          {/* Matériel spécifique */}
          <div className="p-6 rounded-lg bg-gray-50">
            <h2 className="flex items-center mb-4 text-lg font-semibold text-gray-800">
              <Wrench className="mr-2" size={20} />
              Matériel spécifique
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Matériel requis</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {chantier.materielSpecifique.types.length > 0 ? (
                    chantier.materielSpecifique.types.map((type, index) => (
                      <span key={index} className="px-2 py-1 text-sm text-blue-800 bg-blue-100 rounded">
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
                  <p className="mt-1 text-gray-900">{chantier.materielSpecifique.informations}</p>
                </div>
              )}
            </div>
          </div>

          {/* Type de pose et électricité */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-6 rounded-lg bg-gray-50">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">Type de pose</h2>
              <p className="text-lg font-semibold text-gray-900">{chantier.typePose}</p>
            </div>
            <div className="p-6 rounded-lg bg-gray-50">
              <h2 className="flex items-center mb-4 text-lg font-semibold text-gray-800">
                <Zap className="mr-2" size={20} />
                Électricité
              </h2>
              <p className="text-lg font-semibold text-gray-900">{chantier.electricite}</p>
            </div>
          </div>

          {/* Informations spécifiques */}
          {chantier.informationsSpecifiques && (
            <div className="p-6 rounded-lg bg-gray-50">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
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