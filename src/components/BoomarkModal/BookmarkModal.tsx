import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  PanResponder,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useBookmarks } from '@/context/BookmarksContext';
import { AddIcon, Bookmark } from '@/icons'; 
import { styles } from './styles';

type BookmarkModalProps = {
  onClose: () => void;
  visible: boolean;
  tree: string;
};

export const BookmarkModal: React.FC<BookmarkModalProps> = ({
  onClose,
  visible,
  tree,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const { folders, addFolder, addBookmark, removeFolder } =
    useBookmarks();

  const [newFolderName, setNewFolderName] = useState('');
  const [showAddFolder, setShowAddFolder] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const handleDismiss = () => {
    closeAnim.start(() => onClose());
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName('');
      setShowAddFolder(false);
    }
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
              onPress={() => setShowAddFolder(true)}
            >
              <AddIcon />
              <Text style={styles.createText}>Create New Folder</Text>
            </TouchableOpacity>
            <FlatList
              data={folders}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    addBookmark(item.name, tree); 
                  }}
                >
                  <View style={styles.folderItem}>
                    <Text>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveFolder(item.name)}
                      style={styles.removeButton}
                    >
                      <Bookmark />  
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  No folders yet. Create your first folder!
                </Text>
              }
            />
          </Animated.View>
          {showAddFolder && (
              <View style={styles.popupOverlay}>
                <View style={styles.popupBox}>
                  <View style={styles.popupHeader}>
                    <Text style={styles.popupTitle}>Create new list</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setShowAddFolder(false);
                        setNewFolderName('');
                      }}
                    >
                      <Bookmark />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.nameText}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={newFolderName}
                    onChangeText={setNewFolderName}
                    placeholder="Folder name"
                    maxLength={20}
                  />
                  <Text style={styles.charactersText}> {newFolderName.length} / 20 characters</Text>
                  <View style={styles.addFolderButtons}>
                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => {
                        setShowAddFolder(true);
                        setNewFolderName('');
                      }}
                    >
                      <Text style={styles.clearButtonText}>Clear</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.button,
                        styles.createButton,
                      ]}
                      onPress={handleAddFolder}
                      disabled={!newFolderName.trim()}
                    >
                      <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
