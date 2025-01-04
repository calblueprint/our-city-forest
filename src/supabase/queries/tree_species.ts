import { TreeSpecies } from '@/types/tree_species';
import { supabase } from '../client';

export const addTreeSpecies = async (species: TreeSpecies): Promise<void> => {
  const { error } = await supabase.from('tree_species').insert({ ...species });

  if (error) {
    throw new Error(`Error adding tree species: ${error.message}`);
  }
};

export const updateTreeSpecies = async (
  speciesName: string,
  update: Partial<Omit<TreeSpecies, 'name'>>,
): Promise<void> => {
  const { error } = await supabase
    .from('tree_species')
    .update({ ...update })
    .eq('name', speciesName);

  if (error) {
    throw new Error(`Error updating tree species: ${error.message}`);
  }
};

export const getAllTreeSpecies = async (): Promise<TreeSpecies[]> => {
  const { error, data } = await supabase.from('tree_species').select();

  if (error) {
    throw new Error(`Error getting all tree species: ${error.message}`);
  }

  return data as TreeSpecies[];
};

export const getTreeSpecies = async (
  speciesName: string,
): Promise<TreeSpecies> => {
  const { error, data } = await supabase
    .from('tree_species')
    .select('*')
    .eq('name', speciesName)
    .limit(1);

  if (error) {
    throw new Error(`Error getting tree species: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error(`No tree species found with name: ${speciesName}`);
  }

  return data[0] as TreeSpecies;
};

export const deleteTreeSpecies = async (speciesName: string): Promise<void> => {
  const { error } = await supabase
    .from('tree_species')
    .delete()
    .eq('name', speciesName);

  if (error) {
    throw new Error(`Error deleting tree species: ${error.message}`);
  }
};
