import { TreeHistoryRecord } from '@/types/tree_history_record';
import { supabase } from '../client';

/**
 * Fetches all tree history records, ordered by record date (newest first)
 * @returns An array of tree history records
 */
export const getAllTreeHistory = async (): Promise<TreeHistoryRecord[]> => {
  const { data, error } = await supabase.rpc('get_all_tree_history');

  if (error) {
    throw new Error(`Error retrieving tree history: ${error.message}`);
  }

  return data as TreeHistoryRecord[];
};

/**
 * Fetches filtered tree history records based on optional parameters
 * @param speciesName Optional - Filter by tree species name
 * @param startDate Optional - Filter by start date (inclusive)
 * @param endDate Optional - Filter by end date (inclusive)
 * @returns An array of filtered tree history records
 */
export const getFilteredTreeHistory = async (
  speciesName?: string,
  startDate?: Date,
  endDate?: Date,
): Promise<TreeHistoryRecord[]> => {
  const { data, error } = await supabase.rpc('get_filtered_tree_history', {
    p_species_name: speciesName || null,
    p_start_date: startDate ? startDate.toISOString().split('T')[0] : null,
    p_end_date: endDate ? endDate.toISOString().split('T')[0] : null,
  });

  if (error) {
    throw new Error(`Error retrieving filtered tree history: ${error.message}`);
  }

  return data as TreeHistoryRecord[];
};
