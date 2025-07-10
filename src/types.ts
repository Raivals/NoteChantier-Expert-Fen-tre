export interface ChantierFormData {
  id: string;
  reference: string;
  adresse: string;
  typeConstruction: 'Maison' | 'Bâtiment';
  stationnement: {
    type: 'Devant' | 'Allée' | 'Cour' | 'Difficile' | 'Autre';
    informations: string;
  };
  accesChantier: {
    niveau: 'RDC' | '1er' | '2ème' | '3ème' | 'Autre';
    type: 'Escaliers' | 'Ascenseur' | 'Les deux';
    informations: string;
  };
  materielSpecifique: {
    types: ('Echelle' | 'Maçonnerie' | 'Enduit' | 'Autres')[];
    informations: string;
  };
  typePose: 'Neuf' | 'Rénovation sur ancien châssis' | 'Dépose totale' | 'Applique' | 'Ebrasement' | 'Tunnel';
  electricite: 'Client' | 'Expert fenêtre';
  informationsSpecifiques: string;
  dateCreation: string;
  dateModification: string;
}

export interface FormErrors {
  reference?: string;
  typeConstruction?: string;
  stationnement?: string;
  accesChantier?: string;
  materielSpecifique?: string;
  typePose?: string;
  electricite?: string;
}