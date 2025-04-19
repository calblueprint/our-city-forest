export type BookmarkContextType = {
  folders: BookmarkFolder[];
  setFolders: React.Dispatch<React.SetStateAction<BookmarkFolder[]>>;
  loadFolders: () => Promise<void>;
  saveFolders: () => Promise<void>;
  addFolder: (name: string) => void;
  addBookmark: (folderName: string, speciesName: string) => void;
  removeBookmark: (folderName: string, bookmarkId: string) => void;
  isBookmarked: (speciesName: string) => boolean;
  removeFolder: (folderName: string) => void;
};

export type Bookmark = {
  id: string;
  speciesName: string;
};

export type BookmarkFolder = {
  name: string;
  bookmarks: Bookmark[];
};

export type UserBookmarks = {
  user_id: string;
  bookmarks: BookmarkFolder[];
};
