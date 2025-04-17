import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from 'react-native';
import { useBookmarks } from '@/context/BookmarksContext';
import { AddIcon, XButton } from '@/icons';
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

  const {
    folders,
    addFolder,
    addBookmark,
    removeBookmark,
    isBookmarked,
  } = useBookmarks();

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
            <View style={styles.header}>
              <Text style={styles.saveText}>Save to Folder</Text>
              <TouchableOpacity onPress={handleDismiss}>
                <XButton />
              </TouchableOpacity>
            </View>

            {/* Move this section above FlatList */}
            <TouchableOpacity
              style={styles.createList}
              onPress={() => setShowAddFolder(true)}
            >
              <AddIcon />
              <Text style={styles.createText}>Create new list</Text>
            </TouchableOpacity>

            <FlatList
              data={folders}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <View style={styles.folderItem}>
                  <Text>{item.name}</Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  No folders yet. Create your first folder!
                </Text>
              }
            />

            {showAddFolder ? (
              <View style={styles.addFolderContainer}>
                <TextInput
                  style={styles.input}
                  value={newFolderName}
                  onChangeText={setNewFolderName}
                  placeholder="Folder name"
                  autoFocus
                />
                <View style={styles.addFolderButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={() => {
                      setShowAddFolder(false);
                      setNewFolderName('');
                    }}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.createButton,
                      !newFolderName.trim() && styles.disabledButton,
                    ]}
                    onPress={handleAddFolder}
                    disabled={!newFolderName.trim()}
                  >
                    <Text style={styles.buttonText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
