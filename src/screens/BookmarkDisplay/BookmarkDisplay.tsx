import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TreeSpeciesDisplay } from '@/components/TreeSpeciesDisplay/TreeSpeciesDisplay';
import { BackArrow, ScanBarcode } from '@/icons';
import { getTreeSpecies } from '@/supabase/queries/tree_species';
import { getAllTreesForSpecies } from '@/supabase/queries/trees';
import { BookmarksStackParamList, HomeStackParamList } from '@/types/navigation';
import { Tree } from '@/types/tree';
import { TreeSpecies } from '@/types/tree_species';
import { styles } from './styles';

type BookmarkDisplayScreenProps = NativeStackScreenProps<
  BookmarksStackParamList,
  'BookmarkDisplay'
>;

const BookmarkDisplayScreen: React.FC<BookmarkDisplayScreenProps> = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Hello</Text>
      </ScrollView>
    </View>
  );
};

export default BookmarkDisplayScreen;
