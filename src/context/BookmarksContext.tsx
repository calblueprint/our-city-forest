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
  Bookmark,
  BookmarkContextType,
  BookmarkFolder,
} from '@/types/bookmarks';
import { supabase } from '../supabase/client';

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

const BOOKMARKS_KEY = 'bookmarkFolders';

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const { isAuthenticated, user } = useAuth();

  const loadFolders = useCallback(async () => {
    try {
      if (isAuthenticated && user) {
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
      } else {
        const stored = await AsyncStorage.getItem(BOOKMARKS_KEY);
        if (stored) setFolders(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading folders:', err);
    }
  }, [isAuthenticated, user]);

  const saveFolders = useCallback(async () => {
    try {
      if (isAuthenticated && user) {
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
      } else {
        await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(folders));
      }
    } catch (err) {
      console.error('Error saving folders:', err);
    }
  }, [folders, isAuthenticated, user]);

  const addFolder = useCallback((name: string) => {
    const newFolder: BookmarkFolder = {
      name,
      bookmarks: [],
    };
    setFolders(prev => [...prev, newFolder]);
  }, []);

  const addBookmark = (folderName: string, treeItem: TreeSpeciesCardItem) => {
    setFolders(prevFolders =>
      prevFolders.map(folder => {
        if (folder.name === folderName) {
          const alreadyExists = folder.bookmarks.some(
            bookmark => bookmark.id === treeItem.name,
          );

          if (alreadyExists) {
            console.log(`"${treeItem.name}" already exists in "${folderName}"`);
            return folder;
          }

          const newBookmark: Bookmark = {
            id: treeItem.name,
            treeItem: treeItem,
          };

          return {
            ...folder,
            bookmarks: [...folder.bookmarks, newBookmark],
          };
        }

        return folder;
      }),
    );
  };

  const removeFolder = useCallback((folderName: string) => {
    setFolders(prev => prev.filter(folder => folder.name !== folderName));
  }, []);

  const removeBookmark = async (folderName: string, bookmarkId: string) => {
    setFolders(prev => {
      const updatedFolders = prev.map(folder => {
        if (folder.name === folderName) {
          const updatedBookmarks = folder.bookmarks.filter(
            b => b.id !== bookmarkId,
          );

          const folderImageUrl =
            updatedBookmarks.length > 0
              ? updatedBookmarks[0].treeItem.imageURL
              : 'https://example.com/default-folder.jpg';

          return {
            ...folder,
            bookmarks: updatedBookmarks,
            folderImageUrl: folderImageUrl,
          };
        }
        return folder;
      });

      return updatedFolders;
    });
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
