import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  PanResponder,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TreeSpeciesCardItem } from '@/components/TreeSpeciesCard/TreeSpeciesCard';
import { useBookmarks } from '@/context/BookmarksContext';
import { AddIcon } from '@/icons';
import { styles } from './styles';

type FolderData = {
  name: string;
  folderImage?: string;
};

type BookmarkModalProps = {
  onClose: () => void;
  visible: boolean;
  treeItem: TreeSpeciesCardItem;
  onCreateFolder?: () => void;
};

export const BookmarkModal: React.FC<BookmarkModalProps> = ({
  onClose,
  visible,
  treeItem,
  onCreateFolder,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const [localFolders, setLocalFolders] = useState<FolderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { folders, addBookmark } = useBookmarks();

  useEffect(() => {
    if (visible) {
      loadFolders();

      Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, panY]);

  const loadFolders = async () => {
    setIsLoading(true);
    try {
      const allKeys = await AsyncStorage.getAllKeys();

      const enhancedFolders = await Promise.all(
        folders.map(async folder => {
          if (allKeys.includes(folder.name)) {
            const storedData = await AsyncStorage.getItem(folder.name);
            if (storedData) {
              try {
                const parsedData = JSON.parse(storedData);
                if (
                  parsedData &&
                  typeof parsedData === 'object' &&
                  !Array.isArray(parsedData)
                ) {
                  folder.folderImage = parsedData.folderImage;
                }
              } catch (error) {
                console.error('Error parsing folder data:', error);
              }
            }
          }
          return folder;
        }),
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

  const handleOpenCreateFolder = () => {
    closeAnim.start(() => {
      onClose();
      if (onCreateFolder) onCreateFolder();
    });
  };

  const handleAddBookmark = (folderName: string) => {
    addBookmark(folderName, treeItem);
    handleDismiss();
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
                  <TouchableOpacity
                    onPress={() => handleAddBookmark(item.name)}
                  >
                    <View style={styles.folderItem}>
                      <Image
                        source={{
                          uri: item.folderImage,
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
