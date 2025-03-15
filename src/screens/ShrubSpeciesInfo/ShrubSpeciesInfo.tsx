import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShrubSpeciesDisplay } from '@/components/ShrubSpeciesDisplay/ShrubSpeciesDisplay';
import { BackArrow, ScanBarcode } from '@/icons';
import { getShrubSpecies } from '@/supabase/queries/shrub_species';
import { HomeStackParamList } from '@/types/navigation';
import { ShrubSpecies } from '@/types/shrub_species';
import { styles } from './styles';

type ShrubSpeciesInfoScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'ShrubSpeciesInfo'
>;

export const ShrubSpeciesInfoScreen: React.FC<ShrubSpeciesInfoScreenProps> = ({
  route,
  navigation,
}) => {
  const speciesName = route.params?.speciesName ?? '';
  const [speciesData, setSpeciesData] = useState<Partial<ShrubSpecies>>({
    name: speciesName,
  });

  useEffect(() => {
    (async () => {
      const data = await getShrubSpecies(speciesName);
      setSpeciesData(data);
    })();})

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
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{speciesData.available_stock} left</Text>
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

          <ShrubSpeciesDisplay speciesData={speciesData} />
        </View>
      </ScrollView>
    </View>
  );
};
