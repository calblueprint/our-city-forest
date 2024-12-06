import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigation';
import { fetchTreeData } from '../../supabase/client';
import { styles } from './styles';

type TreeSearchScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'TreeSearch'
>;

export default function TreeSearchScreen({
  navigation,
}: TreeSearchScreenProps) {
  type Tree = {
    tree_id: number;
    species: string;
    row: number;
    bank: number;
    image_url?: string;
  };

  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    const loadTreeData = async () => {
      const treeData = await fetchTreeData();
      console.log('Fetched trees:', treeData);
      if (treeData) {
        setTrees(treeData);
      }
    };

    loadTreeData();
  }, []);

  const renderTreeCard = ({ item }: { item: Tree }) => (
    <View style={styles.treeRow}>
      <View style={styles.treeCard}>
        <ImageBackground
          source={{
            uri: item.image_url || 'https://example.com/placeholder-image.jpg',
          }}
          style={styles.treeImage}
        ></ImageBackground>
        <View>
          <Text style={styles.treeName}>{item.species}</Text>
          <View style={styles.treeDetails}>
            <Text style={styles.treeInfo}>Row {item.row}</Text>
            <Text style={styles.treeInfo}> • </Text>
            <Text style={styles.treeInfo}>Bank {item.bank}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.backgroundContainer}>
      <View style={styles.searchContainer}>
        <Text style={styles.Heading4Search}>Trees Availibility</Text>
        <FlatList
          data={trees}
          renderItem={renderTreeCard}
          keyExtractor={item => item.tree_id.toString()}
        />
      </View>
    </ScrollView>
  );
}
