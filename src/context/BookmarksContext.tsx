import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TreeSpeciesCardItem } from '@/components/TreeSpeciesCard/TreeSpeciesCard';
import { useAuth } from '@/context/AuthContext';
import {
  addBookmark as addAdminBookmark,
  addFolder as addAdminFolder,
  changeFolderName,
  deleteBookmark,
  getFolderBookmarks,
  loadAllFolders,
  removeFolder as removeAdminFolder,
} from '@/supabase/queries/bookmarks';
import {
  Bookmark,
  BookmarkContextType,
  BookmarkFolder,
} from '@/types/bookmarks';
import { supabase } from '../supabase/client';

const treeSpeciesCache = new Map<string, TreeSpeciesCardItem>();

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

const BOOKMARKS_KEY = 'bookmarkFolders';

const getTreeSpecies = async (
  speciesName: string,
): Promise<TreeSpeciesCardItem> => {
  if (treeSpeciesCache.has(speciesName)) {
    return treeSpeciesCache.get(speciesName)!;
  }

  const { data, error } = await supabase
    .from('tree_species')
    .select('*')
    .eq('Name', speciesName)
    .single();

  if (error || !data) throw error;

  const treeItem: TreeSpeciesCardItem = {
    name: data.Name,
    imageURL: data.image_url,
    stockCount: data.max_height_ft, //where is the stockCount?
    maxHeight: data.max_height_ft,
    treeShape: data.tree_shape,
    litterType: data.litter_type,
    waterUse: data.water_use,
    isCaliforniaNative: data.california_native,
    isEvergreen: data.california_native, //is evergreen?
    isPowerlineFriendly: data.utility_friendly,
    rootDamagePotential: data.root_damange_potential,
  };

  treeSpeciesCache.set(speciesName, treeItem);
  return treeItem;
};

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const { isAuthenticated, user } = useAuth();

  const isAdmin = user?.user_metadata?.role === 'admin';

  const loadFolders = useCallback(async () => {
    try {
      if (isAuthenticated && user) {
        if (isAdmin) {
          const { data: adminFolders, error } = await loadAllFolders(user.id);

          if (error) {
            console.error('Error loading admin folders:', error);
            return;
          }

          const foldersWithBookmarks = await Promise.all(
            adminFolders?.map(async folder => {
              const { data: bookmarksData, error: bookmarksError } =
                await getFolderBookmarks(folder.folder_name, user.id);

              if (bookmarksError) {
                console.error(
                  `Error loading bookmarks for folder ${folder.folder_name}:`,
                  bookmarksError,
                );
                return {
                  name: folder.folder_name,
                  bookmarks: [],
                  folderImage: 'https://example.com/default-folder.jpg',
                };
              }

              const bookmarks: Bookmark[] = await Promise.all(
                bookmarksData?.map(async item => {
                  const treeItem = await getTreeSpecies(
                    item.bookmarked_species,
                  );
                  return {
                    id: item.bookmarked_species,
                    treeItem: treeItem,
                  };
                }) || [],
              );

              const folderImage =
                bookmarks.length > 0
                  ? bookmarks[0].treeItem.imageURL
                  : 'https://example.com/default-folder.jpg';

              return {
                name: folder.folder_name,
                bookmarks,
                folderImage,
              };
            }) || [],
          );

          setFolders(foldersWithBookmarks);
        } else {
          const { data, error } = await supabase
            .from('user_bookmarks')
            .select('bookmarks')
            .eq('user_id', user.id)
            .single();

          if (error) {
            console.error('Error loading bookmarks from Supabase:', error);
          }

          if (data?.bookmarks) {
            setFolders(data.bookmarks);
          }
        }
      } else {
        const stored = await AsyncStorage.getItem(BOOKMARKS_KEY);
        if (stored) setFolders(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading folders:', err);
    }
  }, [isAuthenticated, user, isAdmin]);

  const saveFolders = useCallback(async () => {
    try {
      if (isAuthenticated && user && !isAdmin) {
        const { error } = await supabase.from('user_bookmarks').upsert(
          {
            user_id: user.id,
            bookmarks: folders,
          },
          { onConflict: 'user_id' },
        );

        if (error) {
          console.error('Error saving bookmarks to Supabase:', error);
        }
      } else if (!isAuthenticated) {
        await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(folders));
      }
    } catch (err) {
      console.error('Error saving folders:', err);
    }
  }, [folders, isAuthenticated, user, isAdmin]);

  const addFolder = useCallback(
    async (name: string) => {
      if (isAuthenticated && user && isAdmin) {
        const { error } = await addAdminFolder(name, user.id);
        if (error) {
          console.error('Error adding admin folder:', error);
          return;
        }
        loadFolders();
      } else {
        const newFolder: BookmarkFolder = {
          name,
          bookmarks: [],
          folderImage: 'https://example.com/default-folder.jpg',
        };
        setFolders(prev => [...prev, newFolder]);
      }
    },
    [isAuthenticated, user, isAdmin, loadFolders],
  );

  const addBookmark = async (
    folderName: string,
    treeItem: TreeSpeciesCardItem,
  ) => {
    if (isAuthenticated && user && isAdmin) {
      const folder = folders.find(f => f.name === folderName);
      if (folder?.bookmarks.some(b => b.id === treeItem.name)) {
        console.log(`"${treeItem.name}" already exists in "${folderName}"`);
        return;
      }

      const { error } = await addAdminBookmark(
        folderName,
        user.id,
        treeItem.name,
      );
      if (error) {
        console.error('Error adding admin bookmark:', error);
        return;
      }
      loadFolders();
    } else {
      setFolders(prevFolders =>
        prevFolders.map(folder => {
          if (folder.name === folderName) {
            const alreadyExists = folder.bookmarks.some(
              bookmark => bookmark.id === treeItem.name,
            );

            if (alreadyExists) {
              console.log(
                `"${treeItem.name}" already exists in "${folderName}"`,
              );
              return folder;
            }

            const newBookmark: Bookmark = {
              id: treeItem.name,
              treeItem: treeItem,
            };

            const updatedImageUrl =
              folder.bookmarks.length === 0
                ? treeItem.imageURL
                : folder.folderImage;

            return {
              ...folder,
              bookmarks: [...folder.bookmarks, newBookmark],
              folderImage: updatedImageUrl,
            };
          }

          return folder;
        }),
      );
    }
  };

  const updateFolderImage = (folderName: string, imageUrl: string) => {
    setFolders(prevFolders =>
      prevFolders.map(folder => {
        if (folder.name === folderName) {
          return {
            ...folder,
            folderImage: imageUrl,
          };
        }
        return folder;
      }),
    );
  };

  const removeFolder = useCallback(
    async (folderName: string) => {
      if (isAuthenticated && user && isAdmin) {
        const { error } = await removeAdminFolder(folderName, user.id);
        if (error) {
          console.error('Error removing admin folder:', error);
          return;
        }
        loadFolders();
      } else {
        setFolders(prev => prev.filter(folder => folder.name !== folderName));
      }
    },
    [isAuthenticated, user, isAdmin, loadFolders],
  );

  const removeBookmark = async (folderName: string, bookmarkId: string) => {
    if (isAuthenticated && user && isAdmin) {
      const { error } = await deleteBookmark(folderName, user.id, bookmarkId);
      if (error) {
        console.error('Error removing admin bookmark:', error);
        return;
      }
      loadFolders(); // Reload folders to get the updated list
    } else {
      setFolders(prev => {
        const updatedFolders = prev.map(folder => {
          if (folder.name === folderName) {
            const updatedBookmarks = folder.bookmarks.filter(
              b => b.id !== bookmarkId,
            );

            const folderImage =
              updatedBookmarks.length > 0
                ? updatedBookmarks[0].treeItem.imageURL
                : 'https://example.com/default-folder.jpg';

            return {
              ...folder,
              bookmarks: updatedBookmarks,
              folderImage: folderImage,
            };
          }
          return folder;
        });

        return updatedFolders;
      });
    }
  };

  const isBookmarked = (speciesName: string): boolean => {
    return folders.some(folder =>
      folder.bookmarks.some(b => b.id === speciesName),
    );
  };

  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  useEffect(() => {
    saveFolders();
  }, [folders, saveFolders]);

  return (
    <BookmarkContext.Provider
      value={{
        folders,
        setFolders,
        loadFolders,
        saveFolders,
        addFolder,
        addBookmark,
        updateFolderImage,
        removeBookmark,
        isBookmarked,
        removeFolder,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      'useBookmarkContext must be used within a BookmarkProvider',
    );
  }
  return context;
};
