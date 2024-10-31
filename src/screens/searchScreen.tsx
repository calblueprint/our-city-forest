import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { fetchTreeData } from '../supabase/client';
import { styles } from './styles/styles';

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [trees, setTrees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTreeData = async () => {
      const treeData = await fetchTreeData();
      console.log('Fetched trees:', treeData);
      if (treeData) {
        setTrees(treeData);
      }
      setLoading(false);
    };

    loadTreeData();
  }, []);

  const renderTreeCard = ({ item }: { item: any }) => (
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
      <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
        <Text>Contact Us</Text>
      </TouchableOpacity>

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
