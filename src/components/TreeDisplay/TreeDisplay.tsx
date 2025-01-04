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
import { styles } from './styles';

type TreeDisplayProps = {
  treeData: Tree;
  allTreesData: Tree[];
};
export const TreeDisplay: React.FC<TreeDisplayProps> = ({
  treeData,
  allTreesData,
}) => {
  const uniqueLocations = allTreesData.filter(
    (t, index, self) =>
      index === self.findIndex(u => u.bank === t.bank && u.row === t.row),
  );
  return (
    <View style={styles.main}>
      <Text style={styles.text}>{treeData.species?.description}</Text>

      <View style={styles.funFactHeader}>
        <Lightbulb />
        <Text style={styles.funFact}>Fun Fact</Text>
      </View>

      <TextInput
        style={styles.textInput}
        value={treeData.species?.fun_fact ?? ''}
        editable={false}
        multiline
        numberOfLines={4}
      />

      <View style={styles.separator}></View>

      <Text style={styles.header}>Location</Text>
      <View style={styles.locations}>
        {uniqueLocations.map((location, index) => (
          <View
            style={styles.locationEntry}
            key={`${location.bank}-${location.row}-${index}`}
          >
            <Location />
            <Text style={styles.propertyText}>
              Bank #{location.bank} {'  '}|{'  '} Row #{location.row}
              {/* TODO: Needs to support range of rows */}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.header}>Properties</Text>
      <View style={styles.properties}>
        {treeData.species.max_height_ft && (
          <View style={styles.property}>
            <Ruler />
            <Text style={styles.propertyText}>
              {treeData.species?.max_height_ft} ft
            </Text>
          </View>
        )}

        {treeData.species.tree_shape && (
          <View style={styles.property}>
            <Shapes />
            <Text style={styles.propertyText}>
              {formatEnumKey(treeData.species?.tree_shape)}
            </Text>
          </View>
        )}

        {treeData.species.water_use && (
          <View style={styles.property}>
            <WateringCan />
            <Text style={styles.propertyText}>
              {formatEnumKey(treeData.species?.water_use)}
            </Text>
          </View>
        )}

        {treeData.species.root_damage_potential && (
          <View style={styles.property}>
            <Warning />
            <Text style={styles.propertyText}>
              {formatEnumKey(treeData.species.root_damage_potential)}
            </Text>
          </View>
        )}

        {treeData.species.litter_type && (
          <View style={styles.property}>
            <Fruit />
            <Text style={styles.propertyText}>
              {formatEnumKey(treeData.species.litter_type)} Fruit
            </Text>
          </View>
        )}

        {treeData.species.california_native && (
          <View style={styles.property}>
            <Bear />
            <Text style={styles.propertyText}>CA Native</Text>
          </View>
        )}

        {treeData.species.foliage_type && (
          <View style={styles.property}>
            <Leaf />
            <Text style={styles.propertyText}>
              {formatEnumKey(treeData.species.foliage_type)}
            </Text>
          </View>
        )}

        {treeData.species.utility_friendly && (
          <View style={styles.property}>
            <Flash />
            <Text style={styles.propertyText}>Powerline Friendly</Text>
          </View>
        )}
      </View>
    </View>
  );
};
