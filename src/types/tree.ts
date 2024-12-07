import { Species } from './species';

export type Tree = {
  tree_id: string;
  species?: Species;
  street_address?: string;
  bank?: number;
  row?: number;
  health_status?: TreeHealth;
  planted?: boolean;
  sold?: boolean;
  reserved?: boolean;
  reserved_for?: TreeReservedFor;
  production_status?: TreeProductionStatus;
  street_ready?: boolean;
  required_action?: string;
  source?: string;
  date?: Date;
  qr_code_url?: string;
  tag_id?: string;
  additional_notes?: string;
};

export enum TreeHealth {
  Healthy = 'healthy',
  Quarantined = 'sick',
}

export enum TreeReservedFor {
  Resident = 'resident',
  CommunityPlanting = 'community_planting',
  Sold = 'sold',
}

export enum TreeProductionStatus {
  InProduction = 'in_production',
  StreetReady = 'street_ready',
}

export const titleCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );

export const displayValue = (s: string) => titleCase(s.replace('_', ' '));
