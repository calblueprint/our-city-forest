import React from 'react';

export type BookmarkContextType = {
  folders: BookmarkFolder[];
  setFolders: React.Dispatch<React.SetStateAction<BookmarkFolder[]>>;
  loadFolders: () => Promise<void>;
  saveFolders: () => Promise<void>;
  addFolder: (name: string, imageUrl?: string) => void;
  addBookmark: (folderName: string, speciesName: string) => void;
  removeBookmark: (folderName: string, bookmarkId: string) => void;
  isBookmarked: (speciesName: string) => boolean;
  removeFolder: (folderName: string) => void;
};

export type Bookmark = {
  imageUrl: string | null;
  id: string;
  speciesName: string;
};

export type BookmarkFolder = {
  folderImage: string;
  name: string;
  bookmarks: Bookmark[];
  image?: string;
};

export type UserBookmarks = {
  user_id: string;
  bookmarks: BookmarkFolder[];
};
