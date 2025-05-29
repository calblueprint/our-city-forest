/* eslint-disable no-unused-vars */
import { TreeSpecies } from './tree_species';

export type TreeHistoryRecord = {
  record_id: string;
  species_name: TreeSpecies;
  record_date: string;
  healthy_count: number;
  diseased_count: number;
  dead_count: number;
  source: TreeHistoryRecordSource;
  created_at: string;
};

export enum TreeHistoryRecordSource {
  JFSchmidt = 'JF Schmidt',
  DevilMountain = 'Devil Mountain',
  WesternStar = 'Western Star',
  WesternTree = 'Western Tree',
  Other = 'Other',
}
