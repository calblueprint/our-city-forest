import { ShrubSpecies } from '@/types/shrub_species';
import { supabase } from '../client';

export const addShrubSpecies = async (species: ShrubSpecies): Promise<void> => {
  const { error } = await supabase.from('shrub_species').insert({ ...species });

  if (error) {
    throw new Error(`Error adding shrub species: ${error.message}`);
  }
};

export const updateShrubSpecies = async (
  speciesName: string,
  update: Partial<Omit<ShrubSpecies, 'name'>>,
): Promise<void> => {
  const { error } = await supabase
    .from('shrub_species')
    .update({ ...update })
    .eq('name', speciesName);

  if (error) {
    throw new Error(`Error updating shrub species: ${error.message}`);
  }
};

export const getAllShrubSpecies = async (): Promise<ShrubSpecies[]> => {
  const { error, data } = await supabase.from('shrub_species').select();

  if (error) {
    throw new Error(`Error getting all shrub species: ${error.message}`);
  }

  return data as ShrubSpecies[];
};

export const getAvailableShrubSpecies = async () => {
  const { data, error } = await supabase.rpc('get_available_shrub_species');

  if (error) {
    throw new Error(
      `Error retrieving available shrub species: ${error.message}`,
    );
  }

  return data;
};

export const getShrubSpecies = async (
  speciesName: string,
): Promise<ShrubSpecies> => {
  const { error, data } = await supabase
    .from('shrub_species')
    .select('*')
    .eq('name', speciesName)
    .limit(1);

  if (error) {
    throw new Error(`Error getting shrub species: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error(`No shrub species found with name: ${speciesName}`);
  }

  return data[0] as ShrubSpecies;
};

export const deleteShrubSpecies = async (
  speciesName: string,
): Promise<void> => {
  const { error } = await supabase
    .from('shrub_species')
    .delete()
    .eq('name', speciesName);

  if (error) {
    throw new Error(`Error deleting shrub species: ${error.message}`);
  }
};
