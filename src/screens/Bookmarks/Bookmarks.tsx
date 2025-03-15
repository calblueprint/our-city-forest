import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Add } from '@/icons'; 
import { BookmarksStackParamList } from '@/types/navigation';
import { styles } from './styles';

type BookmarksScreenProps = NativeStackScreenProps<
  BookmarksStackParamList,
  'BookmarkButton'
>;

const handleCreateNewFolder = () => {
  console.log('Creating a new bookmark folder...');
  ///create a new modal
};

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Bookmarked</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.createList}>
      <TouchableOpacity
        style={styles.createList}
        onPress={handleCreateNewFolder} 
      >
        <Add />
        <Text style={styles.createText}>Create new list</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
