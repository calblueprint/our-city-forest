import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateFolderModal } from '@/components/CreateFolderModal/CreateFolderModal';
import { useBookmarks } from '@/context/BookmarksContext';
import { AddIcon, Bookmark, Paintbucket } from '@/icons';
import { BookmarksStackParamList } from '@/types/navigation';
import { styles } from './styles';

type BookmarksScreenProps = NativeStackScreenProps<
  BookmarksStackParamList,
  'BookmarkButton'
>;

type EnhancedFolder = {
  name: string;
  folderImage?: string;
};

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({
  navigation,
}) => {
  const { folders, addFolder, removeFolder } = useBookmarks();
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [enhancedFolders, setEnhancedFolders] = useState<EnhancedFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadFolderImages();
  }, [folders]);

  const loadFolderImages = async () => {
    setIsLoading(true);
    try {
      const enhanced = await Promise.all(
        folders.map(async folder => {
          const storedData = await AsyncStorage.getItem(folder.name);

          if (storedData) {
            try {
              const parsedData = JSON.parse(storedData);

              if (
                parsedData &&
                typeof parsedData === 'object' &&
                !Array.isArray(parsedData) &&
                parsedData.folderImage
              ) {
                return {
                  ...folder,
                  folderImage: parsedData.folderImage,
                };
              }
            } catch (error) {
              console.error('Error parsing folder data:', error);
            }
          }
          return folder;
        }),
      );

      setEnhancedFolders(enhanced);
    } catch (error) {
      console.error('Error loading folder images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFolder = (folderName: string) => {
    addFolder(folderName);
    setShowCreateFolderModal(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const renderFolderCard = ({ item }: { item: EnhancedFolder }) => {
    if (item.name === '__create_new__') {
      return (
        <TouchableOpacity
          style={[styles.folderCard, styles.createFolderCard]}
          onPress={() => setShowCreateFolderModal(true)}
        >
          <View style={styles.folderItem}>
            <View style={[styles.imageContainer, styles.createImageContainer]}>
              <AddIcon />
            </View>
            <Text style={styles.folderName}>Create new list</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.folderCard}
        onPress={() => {
          if (!editMode) {
            navigation.navigate('BookmarkDisplay', {
              folderName: item.name,
            });
          }
        }}
      >
        <View style={styles.folderItem}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.folderImage }}
              style={styles.speciesImage}
            />
          </View>
          <Text style={styles.folderName}>{item.name}</Text>

          {editMode && (
            <View style={styles.overlaySvg}>
              <TouchableOpacity
                onPress={() => removeFolder(item.name)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Bookmarked</Text>
        <TouchableOpacity
          onPress={toggleEditMode}
          style={[styles.editButton, editMode ? styles.editButtonActive : null]}
        >
          <Text
            style={[
              styles.editButtonText,
              editMode ? styles.editButtonTextActive : null,
            ]}
          >
            {editMode ? 'Done' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading folders...</Text>
        </View>
      ) : (
        <FlatList
          data={
            editMode
              ? [{ name: '__create_new__' }, ...enhancedFolders]
              : enhancedFolders
          }
          keyExtractor={item => item.name}
          renderItem={renderFolderCard}
          numColumns={2}
          contentContainerStyle={styles.speciesContainer}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {editMode
                ? 'No folders yet. Exit edit mode to create a folder.'
                : 'No folders yet. Create your first folder!'}
            </Text>
          }
        />
      )}

      <CreateFolderModal
        visible={showCreateFolderModal}
        onClose={() => setShowCreateFolderModal(false)}
        onCreate={handleCreateFolder}
      />
    </SafeAreaView>
  );
};
