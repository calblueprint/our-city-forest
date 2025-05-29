/* eslint-disable no-unused-vars */

export type TreeHistoryRecord = {
  record_id: string;
  species_name: string;
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
