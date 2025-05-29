/* eslint-disable no-unused-vars */
import { TreeSpecies } from './tree_species';

export type Tree = {
  tree_id: string;
  species: TreeSpecies;
  tag_id?: string;
  bank?: number;
  row?: number;
  health_status: TreeHealthStatus;
  production_status: TreeProductionStatus;
  ownership_status: TreeOwnershipStatus;
  additional_notes?: string;
  qr_code_url?: string;
  created_at: string;
};

export enum TreeHealthStatus {
  Healthy = 'healthy',
  Sick = 'sick',
  Dead = 'dead',
}

export enum TreeProductionStatus {
  InProduction = 'in_production',
  StreetReady = 'street_ready',
}

export enum TreeOwnershipStatus {
  Available = 'available',
  Sold = 'sold',
  ReservedResident = 'reserved_resident',
  ReservedCommunity = 'reserved_community',
  PlantedResident = 'planted_resident',
  PlantedCommunity = 'planted_community',
}

export const toTitleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );

export const formatEnumKey = (s: string) => toTitleCase(s.replace(/_/g, ' '));
