import React from 'react';
import { Text, View } from 'react-native';
import { Lightbulb } from '@/icons';
import { formatEnumKey, ShrubSpecies } from '@/types/shrub_species';
import { styles } from './styles';

type ShrubSpeciesDisplayProps = {
  speciesData: Partial<ShrubSpecies>;
};

export const ShrubSpeciesDisplay: React.FC<ShrubSpeciesDisplayProps> = ({
  speciesData,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{speciesData.description}</Text>

      <View style={styles.funFactContainer}>
        <View style={styles.funFactHeader}>
          <Lightbulb />
          <Text style={styles.funFact}>Fun Fact</Text>
        </View>
        <Text style={styles.funFactText}>{speciesData.fun_fact}</Text>
      </View>

      <View style={styles.divider}></View>

      <View style={styles.propertiesContainer}>
        <Text style={styles.header}>Properties</Text>

        <View style={styles.properties}>
          {speciesData.dimensions && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Max dimensions</Text>
              <Text style={styles.propertyText}>
                {speciesData.dimensions} ft
              </Text>
            </View>
          )}

          {speciesData.stem && (
            <View style={styles.property}>
              <Shapes />
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.stem)}
              </Text>
            </View>
          )}

          {speciesData.water_use && (
            <View style={styles.property}>
              <WateringCan />
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.water_use)}
              </Text>
            </View>
          )}

          {speciesData.dormancy && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Dormancy</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.dormancy)}
              </Text>
            </View>
          )}

          {speciesData.stem && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Stem</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.stem)}
              </Text>
            </View>
          )}

          {speciesData.flower_color && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Flower color</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.flower_color)}
              </Text>
            </View>
          )}

          {speciesData.california_native && (
            <View style={styles.property}>
              <Bear />
              <Text style={styles.propertyText}>CA Native</Text>
            </View>
          )}

          {speciesData.bloom && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Bloom season</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.bloom)}
              </Text>
            </View>
          )}

          {speciesData.growth_rate && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Growth rate</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.growth_rate)}
              </Text>
            </View>
          )}

          {speciesData.sun_exposure && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Sun exposure</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.sun_exposure)}
              </Text>
            </View>
          )}

          {speciesData.soil_needs && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Soil needs</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.soil_needs)}
              </Text>
            </View>
          )}

          {speciesData.water_use && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Water use</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.water_use)}
              </Text>
            </View>
          )}

          {speciesData.california_native !== null &&
            speciesData.california_native !== undefined && (
              <View style={styles.property}>
                <Text style={styles.propertyName}>California native</Text>
                <Text style={styles.propertyText}>
                  {speciesData.california_native ? 'Yes' : 'No'}
                </Text>
              </View>
            )}
        </View>
      </View>
    </View>
  );
};
