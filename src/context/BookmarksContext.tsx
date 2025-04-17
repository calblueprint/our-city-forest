// BookmarkContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/context/AuthContext';
import { BookmarkContextType, BookmarkFolder } from '@/types/bookmarks';
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

  const addBookmark = async (folderName: string, bookmarkId: string) => {
    let bookmarkToAdd;

    for (const folder of folders) {
      const found = folder.bookmarks.find(b => b.id === bookmarkId);
      if (found) {
        bookmarkToAdd = found;
        break;
      }
    }

    if (!bookmarkToAdd) {
      console.warn(`Bookmark with id ${bookmarkId} not found.`);
      return;
    }

    setFolders(prev =>
      prev.map(folder =>
        folder.name === folderName
          ? {
              ...folder,
              bookmarks: [...folder.bookmarks, { ...bookmarkToAdd }],
            }
          : folder,
      ),
    );
  };

  const removeBookmark = async (folderName: string, bookmarkId: string) => {
    setFolders(prev =>
      prev.map(folder =>
        folder.name === folderName
          ? {
              ...folder,
              bookmarks: folder.bookmarks.filter(b => b.id !== bookmarkId),
            }
          : folder,
      ),
    );
  };

  const isBookmarked = (speciesName: string): boolean => {
    return folders.some(folder =>
      folder.bookmarks.some(b => b.speciesName === speciesName),
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
