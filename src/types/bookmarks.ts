import React from 'react';
import { TreeSpeciesCardItem } from '@/components/TreeSpeciesCard/TreeSpeciesCard';

export type BookmarkContextType = {
  folders: BookmarkFolder[];
  setFolders: React.Dispatch<React.SetStateAction<BookmarkFolder[]>>;
  loadFolders: () => Promise<void>;
  saveFolders: () => Promise<void>;
  addFolder: (name: string, imageUrl?: string) => void;
  addBookmark: (folderName: string, treeItem: TreeSpeciesCardItem) => void;
  removeBookmark: (folderName: string, bookmarkId: string) => void;
  isBookmarked: (speciesName: string) => boolean;
  updateFolderImage: (folderName: string, imageUrl: string) => void;
  removeFolder: (folderName: string) => void;
};

export type Bookmark = {
  id: string;
  treeItem: TreeSpeciesCardItem;
};

export type BookmarkFolder = {
  name: string;
  bookmarks: Bookmark[];
  folderImage?: string;
};

export type UserBookmarks = {
  user_id: string;
  bookmarks: BookmarkFolder[];
};
