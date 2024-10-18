import { supabase } from './client';

// Function to add a single tree
export async function addTree(species: string) {
  const { error } = await supabase.rpc('add_tree', { species });

  if (error) {
    throw new Error(`Error adding tree: ${error.message}`);
  }
}

// Function to add multiple trees
export async function addMultipleTrees(
  trees: { species: string; quantity: number }[],
) {
  const { error } = await supabase.rpc('add_multiple_trees', {
    trees: JSON.stringify(trees),
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
    p_tree_ids: treeIds,
  });

  if (error) {
    throw new Error(`Error removing multiple trees: ${error.message}`);
  }
}

/**
 * Function to retrieve tree info by UUID
 *  Returns properties in JSON form: {"bank": null, "date": null, "health_status": null, ...}
 */
export async function getTreeInfo(treeId: string) {
  const { data, error } = await supabase.rpc('get_tree_by_uuid', {
    tree_uuid: treeId,
  });

  if (error) {
    throw new Error(`Error retrieving tree info: ${error.message}`);
  }

  return data;
}

// Functions to update each property

// Update species
export async function updateTreeSpecies(treeId: string, newSpecies: string) {
  const { error } = await supabase
    .from('trees')
    .update({ species: newSpecies })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating species: ${error.message}`);
  }
}

// Update street address
export async function updateTreeStreetAddress(
  treeId: string,
  newAddress: string,
) {
  const { error } = await supabase
    .from('trees')
    .update({ street_address: newAddress })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating street address: ${error.message}`);
  }
}

// Update bank
export async function updateTreeBank(treeId: string, newBank: number) {
  const { error } = await supabase
    .from('trees')
    .update({ bank: newBank })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating bank: ${error.message}`);
  }
}

// Update row
export async function updateTreeRow(treeId: string, newRow: number) {
  const { error } = await supabase
    .from('trees')
    .update({ row: newRow })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating row: ${error.message}`);
  }
}

// Update health status
export async function updateTreeHealthStatus(
  treeId: string,
  newHealthStatus: string,
) {
  const { error } = await supabase
    .from('trees')
    .update({ health_status: newHealthStatus })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating health status: ${error.message}`);
  }
}

// Update planted status
export async function updateTreePlanted(treeId: string, isPlanted: boolean) {
  const { error } = await supabase
    .from('trees')
    .update({ planted: isPlanted })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating planted status: ${error.message}`);
  }
}

// Update sold status
export async function updateTreeSold(treeId: string, isSold: boolean) {
  const { error } = await supabase
    .from('trees')
    .update({ sold: isSold })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating sold status: ${error.message}`);
  }
}

// Update reserved status
export async function updateTreeReserved(treeId: string, isReserved: boolean) {
  const { error } = await supabase
    .from('trees')
    .update({ reserved: isReserved })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating reserved status: ${error.message}`);
  }
}

// Update reserved for
export async function updateTreeReservedFor(
  treeId: string,
  reservedFor?: string,
) {
  const { error } = await supabase
    .from('trees')
    .update({ reserved_for: reservedFor })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating reserved for: ${error.message}`);
  }
}

// Update street ready status
export async function updateTreeStreetReady(
  treeId: string,
  isStreetReady?: boolean,
) {
  const { error } = await supabase
    .from('trees')
    .update({ street_ready: isStreetReady })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating street ready status: ${error.message}`);
  }
}

// Update required action
export async function updateTreeRequiredAction(
  treeId: string,
  requiredAction?: string,
) {
  const { error } = await supabase
    .from('trees')
    .update({ required_action: requiredAction })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating required action: ${error.message}`);
  }
}

// Update source
export async function updateTreeSource(treeId: string, source?: string) {
  const { error } = await supabase
    .from('trees')
    .update({ source })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating source: ${error.message}`);
  }
}

// Update date
export async function updateTreeDate(treeId: string, date?: Date) {
  const { error } = await supabase
    .from('trees')
    .update({ date })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating date: ${error.message}`);
  }
}

// Update QR code URL
export async function updateTreeQrCodeUrl(treeId: string, qrCodeUrl?: string) {
  const { error } = await supabase
    .from('trees')
    .update({ qr_code_url: qrCodeUrl })
    .eq('tree_id', treeId);

  if (error) {
    throw new Error(`Error updating QR code URL: ${error.message}`);
  }
}
