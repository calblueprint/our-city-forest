import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddIcon } from '@/icons';
import { styles } from './styles';

type BookmarkFolderProps = {
  treeSpecies: string;
  folderName: string;
};

export const BookmarkFolder: React.FC<BookmarkFolderProps> = ({
  folderName,
  treeSpecies,
}) => {
  const [bookmarks, setBookmarks] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    loadAllBookmarks();
  }, []);

  const loadAllBookmarks = async () => {
    const allFolders = await AsyncStorage.getAllKeys();
    let folderData: { [key: string]: string[] } = {};
    for (const folder of allFolders) {
      const storedTrees = await AsyncStorage.getItem(folder);
      folderData[folder] = JSON.parse(storedTrees || '[]');
    }
    setBookmarks(folderData);
    console.log(folderData);
  };

  const saveBookmark = async (
    targetFolderName: string,
    targetTreeSpecies: string,
  ) => {
    try {
      let updatedBookmarks = { ...bookmarks };

      if (!updatedBookmarks[targetFolderName]) {
        updatedBookmarks[targetFolderName] = [];
      }

      const isBookmarked = updatedBookmarks[targetFolderName].some(
        tree => tree === targetTreeSpecies,
      );

      if (isBookmarked) {
        updatedBookmarks[targetFolderName] = updatedBookmarks[
          targetFolderName
        ].filter(tree => tree !== targetTreeSpecies);
      } else {
        updatedBookmarks[targetFolderName].push(targetTreeSpecies);
      }

      await AsyncStorage.setItem(
        targetFolderName,
        JSON.stringify(updatedBookmarks[targetFolderName]),
      );
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  return (
    <View style={styles.foldersList}>
      <Text>{treeSpecies}</Text>
      <Image
        source={{
          uri: 'https://example.com/placeholder.jpg',
        }}
      />
      <TouchableOpacity
        style={styles.createList}
        onPress={() => saveBookmark(folderName, treeSpecies)}
      >
        <AddIcon />
      </TouchableOpacity>
    </View>
  );
};
