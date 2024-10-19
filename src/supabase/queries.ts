import { supabase } from './client';

// Function to add a single tree
export async function addTree(species: string) {
  const { error } = await supabase.rpc('add_tree', { species });

  if (error) {
    throw new Error(`Error adding tree: ${error.message}`);
  }
}

// Function to add multiple trees
export async function addMultipleTrees(species: string, quantity: number) {
  const { error } = await supabase.rpc('add_multiple_trees', {
    species: species,
    quantity: quantity,
  });

  if (error) {
    throw new Error(`Error adding multiple trees: ${error.message}`);
  }
}

// Function to remove a single tree by UUID
export async function removeTree(treeId: string) {
  const { error } = await supabase.rpc('remove_tree', {
    tree_uuid: treeId,
  });

  if (error) {
    throw new Error(`Error removing tree: ${error.message}`);
  }
}

// Function to remove multiple trees by a list of UUIDs
export async function removeMultipleTrees(treeIds: string[]) {
  const { error } = await supabase.rpc('remove_multiple_trees', {
    tree_uuids: treeIds,
  });

  if (error) {
    throw new Error(`Error removing multiple trees: ${error.message}`);
  }
}
