import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddIcon } from '@/icons';
import { styles } from './styles';

type TreeSpeciesCardItem = {
  name: string;
  imageURL: string;
};

type BookmarkFolderProps = {
  folderName: string;
  treeItem: TreeSpeciesCardItem;
};

export const BookmarkFolder: React.FC<BookmarkFolderProps> = ({
  folderName,
  treeItem,
}) => {
  const [bookmarks, setBookmarks] = useState<{ [key: string]: string[] }>({});
  const [folderImage, setFolderImage] = useState<string | null>();

  useEffect(() => {
    loadAllBookmarks();
  }, [folderName]);

  const loadAllBookmarks = async () => {
    try {
      const allFolders = await AsyncStorage.getAllKeys();
      let folderData: { [key: string]: string[] } = {};

      for (const folder of allFolders) {
        const storedTrees = await AsyncStorage.getItem(folder);
        folderData[folder] = JSON.parse(storedTrees || '[]');
      }

      setBookmarks(folderData);
      if (folderData[folderName]?.includes(treeItem.name)) {
        setFolderImage(treeItem.imageURL);
      } else {
        setFolderImage(null);
      }
    } catch (error) {
      console.error('Error loading all bookmarks:', error);
    }
  };

  const saveBookmark = async () => {
    try {
      const currentFolderBookmarks = bookmarks[folderName] || [];
      const isBookmarked = currentFolderBookmarks.includes(treeItem.name);

      console.log('Saving tree:', treeItem.name, 'to folder:', folderName);
      console.log('Already bookmarked:', isBookmarked);

      let updatedFolderBookmarks = [...currentFolderBookmarks];

      if (!isBookmarked) {
        updatedFolderBookmarks.push(treeItem.name);
      }
      await AsyncStorage.setItem(
        folderName,
        JSON.stringify(updatedFolderBookmarks),
      );

      const updatedBookmarks = {
        ...bookmarks,
        [folderName]: updatedFolderBookmarks,
      };

      setBookmarks(updatedBookmarks);
      setFolderImage(treeItem.imageURL);
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  return (
    <View style={styles.foldersList}>
      <Text style={styles.folderName}>{folderName}</Text>
      <Image
        source={{
          uri:
            folderImage ??
            'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', // Placeholder image
        }}
        style={styles.folderImage}
      />
      <TouchableOpacity
        style={styles.createList}
        onPress={saveBookmark}
      ></TouchableOpacity>
    </View>
  );
};
