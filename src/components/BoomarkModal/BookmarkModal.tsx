import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  PanResponder,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import { useBookmarks } from '@/context/BookmarksContext';
import { AddIcon, Bookmark } from '@/icons';
import { Image } from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FolderData = {
  name: string;
  folderImage?: string;
};

type TreeImageMapping = {
  [treeSpecies: string]: string;
};

type BookmarkModalProps = {
  onClose: () => void;
  visible: boolean;
  tree: string;
  imageUrl: string;
  onCreateFolder?: () => void;
};

export const BookmarkModal: React.FC<BookmarkModalProps> = ({
  onClose,
  visible,
  tree,
  imageUrl,
  onCreateFolder,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const [localFolders, setLocalFolders] = useState<FolderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // New state to track tree-to-image mappings
  const [treeImageMappings, setTreeImageMappings] = useState<TreeImageMapping>({});

  const { folders, addFolder, addBookmark, removeFolder } = useBookmarks();

  useEffect(() => {
    if (visible) {
      loadFolderImages();
      // Load tree image mappings when modal becomes visible
      loadTreeImageMappings();
      
      Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, panY]);

  // New function to load and track tree image mappings
  const loadTreeImageMappings = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const mappings: TreeImageMapping = {};
      
      // Check each folder for trees and their associated images
      for (const folderName of allKeys) {
        const data = await AsyncStorage.getItem(folderName);
        if (data) {
          try {
            const parsedData = JSON.parse(data);
            if (typeof parsedData === 'object' && !Array.isArray(parsedData) &&
                parsedData.trees && Array.isArray(parsedData.trees) && 
                parsedData.folderImage) {
              
              // Associate each tree in this folder with the folder's image
              for (const treeSpecies of parsedData.trees) {
                // Only set if not already set (prioritize first occurrence)
                if (!mappings[treeSpecies]) {
                  mappings[treeSpecies] = parsedData.folderImage;
                }
              }
            }
          } catch (error) {
            console.error('Error parsing folder data for tree mappings:', error);
          }
        }
      }
      
      // Add the current tree and image to the mappings
      if (imageUrl && tree) {
        mappings[tree] = imageUrl;
      }
      
      setTreeImageMappings(mappings);
    } catch (error) {
      console.error('Error loading tree image mappings:', error);
    }
  };

  const loadFolderImages = async () => {
    setIsLoading(true);
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      
      const enhancedFolders = await Promise.all(
        folders.map(async (folder) => {
          if (allKeys.includes(folder.name)) {
            const storedData = await AsyncStorage.getItem(folder.name);
            if (storedData) {
              try {
                const parsedData = JSON.parse(storedData);
                if (parsedData && typeof parsedData === 'object' && !Array.isArray(parsedData)) {
                  return {
                    ...folder,
                    folderImage: parsedData.folderImage
                  };
                }
              } catch (error) {
                console.error('Error parsing folder data:', error);
              }
            }
          }
          return folder;
        })
      );
      
      setLocalFolders(enhancedFolders);
    } catch (error) {
      console.error('Error loading folder images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const handleDismiss = () => {
    closeAnim.start(() => onClose());
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        handleDismiss();
      } else {
        Animated.timing(panY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleRemoveFolder = (folderName: string) => {
    removeFolder(folderName);
  };

  const handleOpenCreateFolder = () => {
    closeAnim.start(() => {
      onClose();
      if (onCreateFolder) onCreateFolder();
    });
  };

  // Updated function to always use the first tree image as the folder image
  const handleAddBookmark = async (folderName: string, treeSpecies: string) => {
    try {
      const storedData = await AsyncStorage.getItem(folderName);
      let folderData: any = { trees: [] };
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          
          if (Array.isArray(parsedData)) {
            folderData = { trees: parsedData };
          } else {
            folderData = parsedData;
          }
        } catch (error) {
          console.error('Error parsing stored data:', error);
        }
      }
      
      const isBookmarked = folderData.trees.includes(treeSpecies);
      
      if (!isBookmarked) {
        // Add the new tree to the list
        folderData.trees.push(treeSpecies);
        
        // If this is the first tree OR the first tree is changing
        // We need to update the folder image
        let shouldUpdateImage = false;
        
        if (folderData.trees.length === 1) {
          // This is the first tree, definitely set the image
          shouldUpdateImage = true;
        }
        
        if (shouldUpdateImage) {
          // Always prefer the image of the first tree in the list
          const firstTree = folderData.trees[0];
          let firstTreeImageUrl = null;
          
          // Check if we have an image for this tree in our mappings
          if (treeImageMappings[firstTree]) {
            firstTreeImageUrl = treeImageMappings[firstTree];
          } else if (firstTree === treeSpecies) {
            // If the first tree is the one we're adding now, use its image
            firstTreeImageUrl = imageUrl;
          }
          
          // Update the folder image
          if (firstTreeImageUrl) {
            folderData.folderImage = firstTreeImageUrl;
            
            // Update local state for immediate UI update
            setLocalFolders(prev => 
              prev.map(folder => 
                folder.name === folderName 
                  ? { ...folder, folderImage: firstTreeImageUrl } 
                  : folder
              )
            );
          }
        }
        
        // Save the updated folder data
        await AsyncStorage.setItem(
          folderName,
          JSON.stringify(folderData)
        );
        
        // Update the global bookmarks context
        addBookmark(folderName, treeSpecies);
      }
      
      handleDismiss();
    } catch (error) {
      console.error('Error handling bookmark:', error);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleDismiss}
    >
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={styles.overlay}>
          <Animated.View
            style={{ ...styles.container, transform: [{ translateY: panY }] }}
            {...panResponder.panHandlers}
          >
            <View style={styles.sliderIndicatorRow}>
              <View style={styles.sliderIndicator} />
            </View>

            <TouchableOpacity
              style={styles.createList}
              onPress={handleOpenCreateFolder}
            >
              <AddIcon />
              <Text style={styles.createText}>Create New Folder</Text>
            </TouchableOpacity>

            {isLoading ? (
              <Text>Loading folders...</Text>
            ) : (
              <FlatList
                data={localFolders}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleAddBookmark(item.name, tree)}>
                    <View style={styles.folderItem}>
                      <Image
                        source={{ 
                          uri: item.folderImage || 
                               'https://reactnative.dev/img/tiny_logo.png'
                        }}
                        style={styles.folderImage}
                      />
                      <Text style={styles.nameText}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>
                    No folders yet. Create your first folder!
                  </Text>
                }
              />
            )}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};