import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { TreeSpeciesCard } from '@/components/TreeSpeciesCard/TreeSpeciesCard';
import { useBookmarks } from '@/context/BookmarksContext';
import {
  BookmarksStackParamList,
  HomeStackParamList,
} from '@/types/navigation';
import { styles } from './styles';

type Props = NativeStackScreenProps<BookmarksStackParamList, 'BookmarkDisplay'>;

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BookmarksStackParamList>,
  NativeStackNavigationProp<HomeStackParamList>
>;

export const BookmarkDisplayScreen: React.FC<Props> = ({ route }) => {
  const { folderName } = route.params;
  const { folders, removeBookmark } = useBookmarks();
  const navigation = useNavigation<NavigationProp>();

  const folder = folders.find(f => f.name === folderName);

  if (!folder) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Folder not found.</Text>
      </View>
    );
  }

  const handleCardPress = (speciesName: string) => {
    navigation.navigate('TreeSpeciesInfo', { speciesName });
  };

  const handleBookmarkPress = (item: any) => {
    removeBookmark(folderName, item.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>{folderName}</Text>
      </View>
      <View style={styles.divider} />
      <FlatList
        data={folder.bookmarks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TreeSpeciesCard
            item={item.treeItem}
            onPress={handleCardPress}
            onBookmarkPress={() => handleBookmarkPress(item)}
            variant="fullWidth"
          />
        )}
        numColumns={1}
        contentContainerStyle={styles.speciesContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bookmarks in this folder yet.</Text>
        }
      />
    </SafeAreaView>
  );
};
