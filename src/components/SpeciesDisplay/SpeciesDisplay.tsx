import React from 'react';
import { Text, TextInput, View } from 'react-native';
import {
  Bear,
  Flash,
  Fruit,
  Leaf,
  Lightbulb,
  Location,
  Ruler,
  Shapes,
  Warning,
  WateringCan,
} from '@/icons';
import { formatEnumKey, Tree } from '@/types/tree';
import { TreeSpecies } from '@/types/tree_species';
import { styles } from './styles';

type SpeciesDisplayProps = {
  speciesData: Partial<TreeSpecies>;
  treeData: Tree[];
};
export const SpeciesDisplay: React.FC<SpeciesDisplayProps> = ({
  speciesData,
  treeData,
}) => {
  const uniqueLocations = treeData.filter(
    (tree, index, self) =>
      index === self.findIndex(t => t.bank === tree.bank && t.row === tree.row),
  );
  return (
    <View style={styles.main}>
      <Text style={styles.text}>{speciesData.description}</Text>

      <View style={styles.funFactHeader}>
        <Lightbulb />
        <Text style={styles.funFact}>Fun Fact</Text>
      </View>

      <TextInput
        style={styles.textInput}
        value={speciesData.fun_fact ?? ''}
        editable={false}
        multiline
        numberOfLines={4}
      />

      <View style={styles.separator}></View>

      <Text style={styles.header}>Properties</Text>
      <View style={styles.properties}>
        {speciesData.max_height_ft && (
          <View style={styles.property}>
            <Ruler />
            <Text style={styles.propertyText}>
              {speciesData.max_height_ft} ft
            </Text>
          </View>
        )}

        {speciesData.tree_shape && (
          <View style={styles.property}>
            <Shapes />
            <Text style={styles.propertyText}>
              {formatEnumKey(speciesData.tree_shape)}
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

        {speciesData.root_damage_potential && (
          <View style={styles.property}>
            <Warning />
            <Text style={styles.propertyText}>
              {formatEnumKey(speciesData.root_damage_potential)}
            </Text>
          </View>
        )}

        {speciesData.litter_type && (
          <View style={styles.property}>
            <Fruit />
            <Text style={styles.propertyText}>
              {formatEnumKey(speciesData.litter_type)} Fruit
            </Text>
          </View>
        )}

        {speciesData.california_native && (
          <View style={styles.property}>
            <Bear />
            <Text style={styles.propertyText}>CA Native</Text>
          </View>
        )}

        {speciesData.foliage_type && (
          <View style={styles.property}>
            <Leaf />
            <Text style={styles.propertyText}>
              {formatEnumKey(speciesData.foliage_type)}
            </Text>
          </View>
        )}

        {speciesData.utility_friendly && (
          <View style={styles.property}>
            <Flash />
            <Text style={styles.propertyText}>Powerline Friendly</Text>
          </View>
        )}
      </View>

      {treeData?.length > 0 && (
        <>
          <Text style={styles.header}>Location</Text>
          <View style={styles.locations}>
            {uniqueLocations?.map((tree, index) => (
              <View
                style={styles.locationEntry}
                key={`${tree.bank}-${tree.row}-${index}`}
              >
                <Location />
                <Text style={styles.propertyText}>
                  Bank #{tree.bank ?? 0} {'  '}|{'  '} Row #{tree.row ?? 0}
                  {/* TODO: Needs to support range of rows */}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};
