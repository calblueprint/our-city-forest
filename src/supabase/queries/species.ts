import { Species } from '@/types/species';
import { supabase } from '../client';

export async function addSpecies(species: Species) {
  const { error } = await supabase.from('species').insert({ ...species });

  if (error) {
    throw new Error(`Error inserting species: ${error.message}`);
  }
}

export async function updateSpecies(
  speciesName: string,
  update: Partial<Omit<Species, 'name'>>,
) {
  const { error } = await supabase
    .from('species')
    .update({ ...update })
    .eq('name', speciesName);

  if (error) {
    throw new Error(`Error updating species: ${error.message}`);
  }
}

export async function getAllSpecies() {
  const { error, data } = await supabase.from('species').select();

  if (error) {
    throw new Error(`Error getting all species: ${error.message}`);
  }

  return data as Species[];
}

export async function getSpecies(speciesName: string) {
  const { error, data } = await supabase
    .from('species')
    .select('*')
    .eq('name', speciesName)
    .limit(1);

  if (error) {
    throw new Error(`Error getting species: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error(`No species found with name: ${speciesName}`);
  }

  return data[0] as Species;
}

export async function deleteSpecies(speciesName: string) {
  const { error } = await supabase
    .from('species')
    .delete()
    .eq('name', speciesName);

  if (error) {
    throw new Error(`Error deleting species: ${error.message}`);
  }
}
