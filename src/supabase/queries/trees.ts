import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from '@supabase/supabase-js';
import { Tree } from '@/types/tree';
import { supabase } from '../client';

// Function to add a single tree
export const addTree = async (species: string): Promise<void> => {
  const { error } = await supabase.rpc('add_tree', { species });

  if (error) {
    throw new Error(`Error adding tree: ${error.message}`);
  }
};

// Function to add multiple trees of the same species. Returns an array of UUIDs for all trees that were added.
export const addMultipleTrees = async (
  species: string,
  quantity: number,
): Promise<string[]> => {
  const { data, error } = await supabase.rpc('add_multiple_trees', {
    species: species,
    quantity: quantity,
  });

  if (error) {
    throw new Error(`Error adding multiple trees: ${error.message}`);
  }

  const treeIds: string[] = Array.isArray(data) ? data : [];
  return treeIds;
};

// Function to remove a single tree by UUID
export const removeTree = async (treeId: string): Promise<void> => {
  const { error } = await supabase.rpc('remove_tree', {
    tree_uuid: treeId,
  });

  if (error) {
    throw new Error(`Error removing tree: ${error.message}`);
  }
};

// Function to remove multiple trees by a list of UUIDs
export const removeMultipleTrees = async (treeIds: string[]): Promise<void> => {
  const { error } = await supabase.rpc('remove_multiple_trees', {
    tree_uuids: treeIds,
  });

  if (error) {
    throw new Error(`Error removing multiple trees: ${error.message}`);
  }
};

export const getAllTreesForSpecies = async (
  speciesName: string,
): Promise<Tree[]> => {
  const { error, data } = await supabase
    .from('trees')
    .select('*')
    .eq('species', speciesName);

  if (error) {
    throw new Error(`Error getting trees for species: ${error.message}`);
  }

  return data as Tree[];
};

// Retrieves a JSON array of available tree species in the format:
// [{ "name": "Oak", "image_url": "https://example.com/oak.jpg", "count": 10 }, ...]
export const getAvailableTreeSpecies = async () => {
  const { data, error } = await supabase.rpc('get_available_tree_species');

  if (error) {
    throw new Error(`Error retrieving available species: ${error.message}`);
  }

  return data;
};

// Retrieves tree info by UUID, returns properties as JSON: { "bank": null, "date": null, "health_status": null, ... }
export const getTreeInfo = async (treeId: string): Promise<Tree> => {
  const { data, error } = await supabase.rpc('get_tree_by_uuid', {
    tree_uuid: treeId,
  });

  if (error) {
    throw new Error(`Error retrieving tree info: ${error.message}`);
  }

  return data as Tree;
};

// Functions to update each property
export const updateTree = async (
  treeId: string,
  data: Partial<Tree>,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ ...data })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating tree (${data}): ${error.message}`);
  }
};

// Update species
export const updateTreeSpecies = async (
  treeId: string,
  newSpecies: string,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ species: newSpecies })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating species: ${error.message}`);
  }
};

// Update street address
export const updateTreeStreetAddress = async (
  treeId: string,
  newAddress: string,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ street_address: newAddress })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating street address: ${error.message}`);
  }
};

// Update bank
export const updateTreeBank = async (
  treeId: string,
  newBank: number,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ bank: newBank })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating bank: ${error.message}`);
  }
};

// Update row
export const updateTreeRow = async (
  treeId: string,
  newRow: number,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ row: newRow })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating row: ${error.message}`);
  }
};

// Update health status
export const updateTreeHealthStatus = async (
  treeId: string,
  newHealthStatus: string,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ health_status: newHealthStatus })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating health status: ${error.message}`);
  }
};

// Update planted status
export const updateTreePlanted = async (
  treeId: string,
  isPlanted: boolean,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ planted: isPlanted })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating planted status: ${error.message}`);
  }
};

// Update sold status
export const updateTreeSold = async (
  treeId: string,
  isSold: boolean,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ sold: isSold })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating sold status: ${error.message}`);
  }
};

// Update reserved status
export const updateTreeReserved = async (
  treeId: string,
  isReserved: boolean,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ reserved: isReserved })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating reserved status: ${error.message}`);
  }
};

// Update reserved for
export const updateTreeReservedFor = async (
  treeId: string,
  reservedFor?: string,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ reserved_for: reservedFor })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating reserved for: ${error.message}`);
  }
};

// Update street ready status
export const updateTreeStreetReady = async (
  treeId: string,
  isStreetReady?: boolean,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ street_ready: isStreetReady })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating street ready status: ${error.message}`);
  }
};

// Update required action
export const updateTreeRequiredAction = async (
  treeId: string,
  requiredAction?: string,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ required_action: requiredAction })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating required action: ${error.message}`);
  }
};

// Update source
export const updateTreeSource = async (
  treeId: string,
  source?: string,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ source })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating source: ${error.message}`);
  }
};

// Update date
export const updateTreeDate = async (
  treeId: string,
  date?: Date,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ date })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating date: ${error.message}`);
  }
};

// Update QR code URL
export const updateTreeQrCodeUrl = async (
  treeId: string,
  qrCodeUrl?: string,
): Promise<void> => {
  const { error } = await supabase
    .from('trees')
    .update({ qr_code_url: qrCodeUrl })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating QR code URL: ${error.message}`);
  }
};

// Calls Supabase Edge function to generate QR code
export const generateQRImage = async (treeId: string): Promise<void> => {
  try {
    const { data, error } = await supabase.functions.invoke('qr-generate', {
      body: { tree_id: treeId },
    });

    // Typed error handling because generic error.message provides no information
    if (error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.text();
      throw new Error(`FunctionsHttpError: ${errorMessage}$`);
    } else if (error instanceof FunctionsRelayError) {
      throw new Error(`FunctionsRelayError: ${error.message}$`);
    } else if (error instanceof FunctionsFetchError) {
      throw new Error(`FunctionsFetchError: ${error.message}$`);
    } else if (error) {
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error(`Error generating QR code for tree ${treeId}:`, error);
    throw error;
  }
};
