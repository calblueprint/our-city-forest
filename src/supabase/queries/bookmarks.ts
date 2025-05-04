import { Bookmark, BookmarkFolder } from '@/types/bookmarks';
import { supabase } from '../client';

const loadAllFolders = async (userId: string) => {
  const { data, error } = await supabase
    .from('admin_folders')
    .select('folder_name')
    .eq('user', userId)
    .order('created_at', { ascending: false });

  return { data, error };
};

const getFolderBookmarks = async (folderName: string, userId: any) => {
  const { data, error } = await supabase
    .from('folder_bookmarks')
    .select(
      `
      bookmarked_species,
      parent_folder,
      admin_folders!parent_folder (
        id,
        folder_name,
        user
      ),
      tree_species!bookmarked_species (
        *
      )
    `,
    )
    .eq('admin_folders.folder_name', folderName)
    .eq('admin_folders.user', userId)
    .order('added_at', { ascending: false });

  return { data, error };
};

const addBookmark = async (
  folderName: string,
  userId: string,
  treeSpeciesName: string,
) => {
  const { data: folder, error: folderError } = await supabase
    .from('admin_folders')
    .select('id')
    .eq('folder_name', folderName)
    .eq('user', userId)
    .single();

  if (folderError || !folder) {
    return { data: null, error: folderError || new Error('Folder not found') };
  }

  const { data: treeSpecies, error: speciesError } = await supabase
    .from('tree_species')
    .select('id')
    .eq('Name', treeSpeciesName)
    .single();

  if (speciesError || !treeSpecies) {
    return {
      data: null,
      error: speciesError || new Error('Tree species not found'),
    };
  }

  const { data, error } = await supabase
    .from('folder_bookmarks')
    .insert({
      parent_folder: folder.id,
      bookmarked_species: treeSpecies.id,
      added_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
};

const deleteBookmark = async (
  folderName: string,
  userId: string,
  treeSpeciesName: string,
) => {
  const { data: folder, error: folderError } = await supabase
    .from('admin_folders')
    .select('id')
    .eq('folder_name', folderName)
    .eq('user', userId)
    .single();

  if (folderError || !folder) {
    return { data: null, error: folderError || new Error('Folder not found') };
  }

  const { data: treeSpecies, error: speciesError } = await supabase
    .from('tree_species')
    .select('id')
    .eq('Name', treeSpeciesName)
    .single();

  if (speciesError || !treeSpecies) {
    return {
      data: null,
      error: speciesError || new Error('Tree species not found'),
    };
  }

  const { data, error } = await supabase
    .from('folder_bookmarks')
    .delete()
    .match({
      parent_folder: folder.id,
      bookmarked_species: treeSpecies.id,
    })
    .select()
    .single();

  return { data, error };
};

const addFolder = async (folderName: string, userId: string) => {
  const { data, error } = await supabase
    .from('admin_folders')
    .insert({
      folder_name: folderName,
      user: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
};

const removeFolder = async (folderName: string, userId: string) => {
  const { data, error } = await supabase
    .from('admin_folders')
    .delete()
    .match({
      folder_name: folderName,
      user: userId,
    })
    .select()
    .single();

  return { data, error };
};

const changeFolderName = async (
  oldFolderName: string,
  newFolderName: string,
  userId: string,
) => {
  const { data, error } = await supabase
    .from('admin_folders')
    .update({
      folder_name: newFolderName,
      updated_at: new Date().toISOString(),
    })
    .match({
      folder_name: oldFolderName,
      user: userId,
    })
    .select()
    .single();

  return { data, error };
};

export {
  loadAllFolders,
  getFolderBookmarks,
  addBookmark,
  deleteBookmark,
  addFolder,
  removeFolder,
  changeFolderName,
};
