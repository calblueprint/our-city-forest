import { useEffect, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TreeBg from '@/../assets/tree-info-bg.png';
import SpeciesDisplay from '@/components/SpeciesDisplay/SpeciesDisplay';
import SvgBackArrow from '@/icons/BackArrow';
import SvgScanBarcode from '@/icons/ScanBarcode';
import colors from '@/styles/colors';
import { getAllTreesForSpecies, getSpecies } from '@/supabase/queries/species';
import { HomeStackParamList } from '@/types/navigation';
import { Species } from '@/types/species';
import { Tree } from '@/types/tree';
import styles from './styles';

type SpeciesInfoScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'SpeciesInfo'
>;

export default function SpeciesInfoScreen({
  route,
  navigation,
}: SpeciesInfoScreenProps) {
  const speciesName = route.params?.speciesName ?? 'California Buckwheat';
  const [speciesData, setSpeciesData] = useState<Partial<Species>>({
    name: speciesName,
  });
  const [treeData, setTreeData] = useState<Tree[]>([]);
  const treeBgImage = speciesData.image_link;

  useEffect(() => {
    (async () => {
      const data = await getSpecies(speciesName);
      setSpeciesData(data);
    })();

    (async () => {
      const data = await getAllTreesForSpecies(speciesName);
      setTreeData(data);
    })();
  }, [speciesName]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
      >
        <ScrollView style={styles.container}>
          <ImageBackground
            source={treeBgImage ? { uri: treeBgImage } : TreeBg}
            style={styles.imageBg}
          >
            <View style={styles.topBar}>
              <TouchableOpacity>
                <SvgBackArrow />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.push('QRCodeScanner')}
              >
                <SvgScanBarcode />
              </TouchableOpacity>
            </View>
            <View style={styles.imageEmbed}>
              <View style={styles.countPill}>
                <Text style={styles.idText}>{treeData.length} left</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.body}>
            <View>
              <Text style={styles.header}>{speciesData.name ?? ''}</Text>
              <View style={styles.idPillFlex}>
                <Text style={styles.scientificName}>
                  {speciesData.scientific_name ?? ''}
                </Text>
              </View>
            </View>

            <View style={styles.separator}></View>

            <SpeciesDisplay speciesData={speciesData} treeData={treeData} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
