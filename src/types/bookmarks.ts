export type BookmarkContextType = {
  folders: BookmarkFolder[];
  setFolders: React.Dispatch<React.SetStateAction<BookmarkFolder[]>>;
  loadFolders: () => Promise<void>;
  saveFolders: () => Promise<void>;
  addFolder: (name: string) => void;
  addBookmark: (folderId: string, bookmarkId: string) => Promise<void>;
  removeBookmark: (folderId: string, bookmarkId: string) => Promise<void>;
  isBookmarked: (speciesName: string) => boolean;
};

export type Bookmark = {
  id: string;
  speciesName: string;
  speciesImageUrl: string;
};

export type BookmarkFolder = {
  name: string;
  bookmarks: Bookmark[];
};

export type UserBookmarks = {
  user_id: string;
  bookmarks: BookmarkFolder[];
};