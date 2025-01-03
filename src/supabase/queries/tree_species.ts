import { TreeSpecies } from '@/types/tree_species';
import { supabase } from '../client';

export async function addTreeSpecies(species: TreeSpecies) {
  const { error } = await supabase.from('tree_species').insert({ ...species });

  if (error) {
    throw new Error(`Error adding tree species: ${error.message}`);
  }
}

export async function updateTreeSpecies(
  speciesName: string,
  update: Partial<Omit<TreeSpecies, 'name'>>,
) {
  const { error } = await supabase
    .from('tree_species')
    .update({ ...update })
    .eq('name', speciesName);

  if (error) {
    throw new Error(`Error updating tree species: ${error.message}`);
  }
}

export async function getAllTreeSpecies() {
  const { error, data } = await supabase.from('tree_species').select();

  if (error) {
    throw new Error(`Error getting all tree species: ${error.message}`);
  }

  return data as TreeSpecies[];
}

export async function getTreeSpecies(speciesName: string) {
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
}

export async function deleteTreeSpecies(speciesName: string) {
  const { error } = await supabase
    .from('tree_species')
    .delete()
    .eq('name', speciesName);

  if (error) {
    throw new Error(`Error deleting tree species: ${error.message}`);
  }
}
