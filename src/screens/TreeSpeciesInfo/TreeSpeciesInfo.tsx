import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImageBackground } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TreeSpeciesDisplay } from '@/components/TreeSpeciesDisplay/TreeSpeciesDisplay';
import { BackArrow, ScanBarcode } from '@/icons';
import { getTreeSpecies } from '@/supabase/queries/tree_species';
import { getAllTreesForSpecies } from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import { Tree } from '@/types/tree';
import { TreeSpecies } from '@/types/tree_species';
import { styles } from './styles';

type TreeSpeciesInfoScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'TreeSpeciesInfo'
>;

export const TreeSpeciesInfoScreen: React.FC<TreeSpeciesInfoScreenProps> = ({
  route,
  navigation,
}) => {
  const speciesName = route.params?.speciesName ?? '';
  const [speciesData, setSpeciesData] = useState<Partial<TreeSpecies>>({
    name: speciesName,
  });
  const [treeData, setTreeData] = useState<Tree[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getTreeSpecies(speciesName);
      setSpeciesData(data);
    })();

    (async () => {
      const data = await getAllTreesForSpecies(speciesName);
      setTreeData(data);
    })();
  }, [speciesName]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{ uri: speciesData.image_url }}
          style={styles.imageBackground}
        >
          <View style={styles.topNavigation}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackArrow />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push('QRCodeScanner')}>
              <ScanBarcode />
            </TouchableOpacity>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{treeData.length} left</Text>
          </View>
        </ImageBackground>
        <View style={styles.body}>
          <View>
            <Text style={styles.header}>{speciesData.name ?? ''}</Text>
            <Text style={styles.scientificName}>
              {speciesData.scientific_name ?? ''}
            </Text>
            <View style={styles.divider}></View>
          </View>

          <TreeSpeciesDisplay speciesData={speciesData} treeData={treeData} />
        </View>
      </ScrollView>
    </View>
  );
};
