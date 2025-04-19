import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookmarksStackParamList } from '@/types/navigation';
import { useBookmarks } from '@/context/BookmarksContext';
import { Bookmark } from '@/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

type Props = NativeStackScreenProps<
  BookmarksStackParamList,
  'BookmarkDisplay'
>;

export const BookmarkDisplayScreen: React.FC<Props> = ({ route }) => {
  const { folderName } = route.params;
  const { folders, removeBookmark } = useBookmarks();

  const folder = folders.find((f) => f.name === folderName);

  if (!folder) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Folder not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.headerText}>{folderName}</Text>
        </View>
        <View style={styles.divider} />
        <FlatList
          data={folder.bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookmarkItem}>
              <Text style={styles.bookmarkText}>{item.speciesName}</Text>
              <TouchableOpacity
                onPress={() => removeBookmark(folderName, item.id)}
              >
                <Bookmark />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No bookmarks in this folder yet.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};
