import { supabase } from './client';

// Function to add a single tree
export async function addTree(species: string) {
  const { data, error } = await supabase.rpc('add_tree', { species });

  if (error) {
    throw new Error(`Error adding tree: ${error.message}`);
  }

  return data;
}

// Function to add multiple trees
export async function addMultipleTrees(species: string, quantity: number) {
  const { data, error } = await supabase.rpc('add_multiple_trees', {
    species,
    quantity,
  });

  if (error) {
    throw new Error(`Error adding multiple trees: ${error.message}`);
  }

  return data;
}

// Function to remove a single tree by UUID
export async function removeTree(treeId: string) {
  const { data, error } = await supabase.rpc('remove_tree', {
    tree_id: treeId,
  });

  if (error) {
    throw new Error(`Error removing tree: ${error.message}`);
  }

  return data;
}

// Function to remove multiple trees by a list of UUIDs
export async function removeMultipleTrees(treeIds: string[]) {
  const { data, error } = await supabase.rpc('remove_multiple_trees', {
    tree_ids: treeIds,
  });

  if (error) {
    throw new Error(`Error removing multiple trees: ${error.message}`);
  }

  return data;
}