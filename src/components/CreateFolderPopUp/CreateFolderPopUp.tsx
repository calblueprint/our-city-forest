import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { useBookmarks } from '@/context/BookmarksContext';
import { AddIcon } from '@/icons';
import { styles } from './styles';

type BookmarkPopupProps = {
  onClose: () => void;
  visible: boolean;
  tree: string;
};

export const BookmarkPopup: React.FC<BookmarkPopupProps> = ({
  onClose,
  visible,
  tree,
}) => {
  const inputRef = useRef<TextInput>(null);
  const screenHeight = Dimensions.get('window').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const { folders, addFolder } = useBookmarks();

  const [newFolderName, setNewFolderName] = useState('');
  const [showAddFolder, setShowAddFolder] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }).start(() => onClose());
    }
  }, [visible]);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName('');
      setShowAddFolder(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'create') {
      return (
        <TouchableOpacity
          style={styles.createList}
          onPress={() => {
            setShowAddFolder(true);
            inputRef.current?.focus(); // Focus the input when creating a new folder
          }}
        >
          <AddIcon />
          <Text style={styles.createText}>Create New Folder</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.folderItem}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.popupOverlay}>
        <Animated.View
          style={[
            styles.popupContainer,
            { transform: [{ translateY }] },
          ]}
        >
          <FlatList
            data={[{ type: 'create' }, ...folders]}
            keyExtractor={(item, index) => 'name' in item ? item.name : `create-${index}`}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No folders yet. Create your first folder!
              </Text>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          {showAddFolder && (
            <View style={styles.addFolderContainer}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                value={newFolderName}
                onChangeText={setNewFolderName}
                placeholder="Folder name"
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
                  style={[styles.button, styles.createButton]}
                  onPress={handleAddFolder}
                >
                  <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};
