import { Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddIcon } from '@/icons';
import { styles } from './styles';

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

type BookmarkFolderProps = {
  treeSpecies: string; 
  folderName: string;
};


const saveBookmark = async (
  folderName: string, 
  treeSpecies: string, 
) => {
  try {
    // Make a copy of the current state to avoid mutating it directly
    let updatedBookmarks = { ...bookmarks };

    // Ensure folder exists in the state object
    if (!updatedBookmarks[folderName]) {
      updatedBookmarks[folderName] = [];
    }

    // Check if the tree species already exists in the folder
    const isBookmarked = updatedBookmarks[folderName].some(tree => tree === treeSpecies);

    if (isBookmarked) {
      // Remove the tree from the folder
      updatedBookmarks[folderName] = updatedBookmarks[folderName].filter(tree => tree !== treeSpecies);
    } else {
      // Add the tree to the folder
      updatedBookmarks[folderName].push(treeSpecies);
    }

    // Update AsyncStorage and UI state
    await AsyncStorage.setItem(folderName, JSON.stringify(updatedBookmarks[folderName]));
    setBookmarks(updatedBookmarks); 

  } catch (error) {
    console.error('Error saving bookmark:', error);
  }
};

export const BookmarkFolder: React.FC<BookmarkFolderProps> = ({folderName, treeSpecies}) => {
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
