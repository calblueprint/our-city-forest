import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddIcon } from '@/icons';
import { styles } from './styles';

type BookmarkData = {
  trees: string[];
  folderImage?: string;
};

type BookmarkFolderProps = {
  treeSpecies: string;
  folderName: string;
  imageUrl?: string; 
};

export const BookmarkFolder: React.FC<BookmarkFolderProps> = ({
  folderName,
  treeSpecies,
  imageUrl = 'https://reactnative.dev/img/tiny_logo.png',
}) => {
  const [bookmarks, setBookmarks] = useState<{ [key: string]: BookmarkData }>({});
  const [savedImage, setSavedImage] = useState<string | null>(null);

  useEffect(() => {
    loadAllBookmarks();
  }, [folderName, treeSpecies]);

  const loadAllBookmarks = async () => {
    try {
      const allFolders = await AsyncStorage.getAllKeys();
      
      let folderData: { [key: string]: BookmarkData } = {};
      
      for (const folder of allFolders) {
        const storedData = await AsyncStorage.getItem(folder);
        
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            
            if (Array.isArray(parsedData)) {
              folderData[folder] = { trees: parsedData };
            } else {
              folderData[folder] = parsedData;
              
              if (folder === folderName && parsedData.folderImage) {
                setSavedImage(parsedData.folderImage);
              }
            }
          } catch (error) {
            folderData[folder] = { trees: [] };
          }
        } else {
          folderData[folder] = { trees: [] };
        }
      }
      
      setBookmarks(folderData);
    } catch (error) {}
  };

  // Function to update the folder image based on the first tree in the list
  const updateFolderImage = async (trees: string[]) => {
    try {
      if (trees.length > 0) {
        // Get the first tree in the list
        const firstTree = trees[0];
        
        // We need to fetch the image URL for this first tree
        // This requires accessing a global image mapping or retrieving from a data source
        // For this implementation, we'll create a simple lookup or fetch from AsyncStorage
        
        // Method 1: Look for this tree in other bookmark lists that might have the image
        let firstTreeImageUrl = null;
        const allFolders = await AsyncStorage.getAllKeys();
        
        // Check each folder to see if it contains this tree and has an image
        for (const folder of allFolders) {
          if (folder === folderName) continue; // Skip the current folder
          
          const folderDataStr = await AsyncStorage.getItem(folder);
          if (folderDataStr) {
            try {
              const folderData = JSON.parse(folderDataStr);
              
              // If the folder data has tree listings and includes our target tree
              if (folderData && 
                 folderData.trees && 
                 Array.isArray(folderData.trees) && 
                 folderData.trees.includes(firstTree) && 
                 folderData.folderImage) {
                // Found an image for this tree
                firstTreeImageUrl = folderData.folderImage;
                break;
              }
            } catch (error) {
              // Skip this folder if there's an error parsing
              continue;
            }
          }
        }
        
        // If we couldn't find an image from other folders, use the current image URL
        // This would typically happen if this tree isn't saved in any other folders
        if (!firstTreeImageUrl) {
          // Use the current imageUrl as a fallback
          firstTreeImageUrl = imageUrl;
        }
        
        // Update the folder data with the new image
        const storedData = await AsyncStorage.getItem(folderName);
        let folderData: BookmarkData;
        
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            
            if (Array.isArray(parsedData)) {
              folderData = { trees: parsedData };
            } else {
              folderData = parsedData;
            }
          } catch (error) {
            folderData = { trees: trees };
          }
        } else {
          folderData = { trees: trees };
        }
        
        // Set the folder image to the first tree's image
        if (firstTreeImageUrl) {
          folderData.folderImage = firstTreeImageUrl;
          setSavedImage(firstTreeImageUrl);
        }
        
        // Save the updated folder data
        await AsyncStorage.setItem(folderName, JSON.stringify(folderData));
        
        // Update the bookmarks state
        setBookmarks(prev => ({
          ...prev,
          [folderName]: folderData
        }));
      }
    } catch (error) {
      console.error('Error updating folder image:', error);
    }
  };

  const handleBookmarkPress = () => {
    saveBookmark();
  };

  const saveBookmark = async () => {
    try {
      const storedData = await AsyncStorage.getItem(folderName);
      let folderData: BookmarkData;
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          
          if (Array.isArray(parsedData)) {
            folderData = { trees: parsedData };
          } else {
            folderData = parsedData;
          }
        } catch (error) {
          folderData = { trees: [] };
        }
      } else {
        folderData = { trees: [] };
      }
      
      const isBookmarked = folderData.trees.includes(treeSpecies);
      
      if (isBookmarked) {
        // Remove the tree from the list
        folderData.trees = folderData.trees.filter(tree => tree !== treeSpecies);
        
        // If trees list is not empty, update the folder image to the first tree in the list
        if (folderData.trees.length > 0) {
          await updateFolderImage(folderData.trees);
        }
      } else {
        // Add the tree to the list
        folderData.trees.push(treeSpecies);
        
        if (folderData.trees.length === 1 && imageUrl) {
          folderData.folderImage = imageUrl;
          setSavedImage(imageUrl);
        }
      }

      await AsyncStorage.setItem(folderName, JSON.stringify(folderData));
      
      setBookmarks(prev => ({
        ...prev,
        [folderName]: folderData
      }));
      
      Alert.alert(
        'Bookmark Updated',
        isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save bookmark');
    }
  };

  const currentFolder = bookmarks[folderName] || { trees: [] };
  const isCurrentTreeBookmarked = currentFolder.trees.includes(treeSpecies);
  
  const folderImage = savedImage || currentFolder.folderImage || imageUrl;

  return (
    <View style={styles.foldersList}>
    
      <Text>{treeSpecies}</Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ marginRight: 10 }}>Image Source:</Text>
        <Text style={{ fontSize: 10, flex: 1 }} numberOfLines={1}>
          {folderImage ? folderImage.substring(0, 30) + '...' : 'No image'}
        </Text>
      </View>
      
      <Image
        source={{ uri: folderImage }}
        style={[
          styles.folderImage,
        ]}
      />
      
      <TouchableOpacity
        style={[styles.createList, { marginTop: 10, backgroundColor: '#e0e0e0', padding: 10 }]}
        onPress={handleBookmarkPress}
      >
        <AddIcon />
        <Text>{isCurrentTreeBookmarked ? 'Remove' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};