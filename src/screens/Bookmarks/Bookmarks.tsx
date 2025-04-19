import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AddIcon, Bookmark } from '@/icons';
import { useBookmarks } from '@/context/BookmarksContext';
import { BookmarksStackParamList } from '@/types/navigation';
import { styles } from './styles';

type BookmarksScreenProps = NativeStackScreenProps<
  BookmarksStackParamList,
  'BookmarkButton'
>;

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({
  navigation,
}) => {
  const { folders, addFolder, addBookmark, removeFolder } = useBookmarks();

  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddNewFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName('');
      setShowAddFolder(false);
    }
  };

  const handleRemoveFolder = (folderName: string) => {
    removeFolder(folderName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Bookmarked</Text>
      </View>

      <View style={styles.divider} />

      {!showAddFolder ? (
        <View style={styles.createList}>
          <TouchableOpacity
            style={styles.createList}
            onPress={() => setShowAddFolder(true)}
          >
            <AddIcon />
            <Text style={styles.createText}>Create new list</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.popupBox}>
          <Text style={styles.popupTitle}>Create new list</Text>
          <Text style={styles.nameText}>Name</Text>
          <TextInput
            style={styles.input}
            value={newFolderName}
            onChangeText={setNewFolderName}
            placeholder="Folder name"
            maxLength={20}
          />
          <Text style={styles.charactersText}>
            {newFolderName.length} / 20 characters
          </Text>
          <View style={styles.addFolderButtons}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setNewFolderName('');
                setShowAddFolder(false);
              }}
            >
              <Text style={styles.clearButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={handleAddNewFolder}
              disabled={!newFolderName.trim()}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={folders}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BookmarkDisplay', {
                folderName: item.name,
              });
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
    </SafeAreaView>
  );
};
