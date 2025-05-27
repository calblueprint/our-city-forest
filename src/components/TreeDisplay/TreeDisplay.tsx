import React from 'react';
import { Text, View } from 'react-native';
import { Lightbulb, Production, StreetReady } from '@/icons';
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
    <View style={styles.container}>
      <Text style={styles.text}>{treeData.species?.description}</Text>

      <View style={styles.funFactContainer}>
        <View style={styles.funFactHeader}>
          <Lightbulb />
          <Text style={styles.funFact}>Fun Fact</Text>
        </View>
        <Text style={styles.funFactText}>
          {treeData.species?.fun_fact ?? ''}
        </Text>
      </View>

      <View style={styles.divider}></View>

      <View style={styles.subContainer}>
        <Text style={styles.header}>Production Quantities</Text>
        <View style={styles.properties}>
          <View style={styles.production}>
            <Production />
            <View style={styles.productionPill}>
              <Text style={styles.productionQuantity}>
                {
                  allTreesData.filter(
                    tree => tree.production_status === 'in_production',
                  ).length
                }
              </Text>
            </View>
            <Text style={styles.productionText}>In production</Text>
          </View>

          <View style={styles.production}>
            <StreetReady />
            <View style={styles.productionPill}>
              <Text style={styles.productionQuantity}>
                {
                  allTreesData.filter(
                    tree => tree.production_status === 'street_ready',
                  ).length
                }
              </Text>
            </View>
            <Text style={styles.productionText}>Street ready</Text>
          </View>
        </View>
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.header}>Properties</Text>
        <View style={styles.properties}>
          {treeData.species.max_height_ft && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Height</Text>
              <Text style={styles.propertyText}>
                {treeData.species.max_height_ft} ft
              </Text>
            </View>
          )}

          {treeData.species.tree_shape && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Shape</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(treeData.species.tree_shape)}
              </Text>
            </View>
          )}

          {treeData.species.water_use && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Water use</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(treeData.species.water_use)}
              </Text>
            </View>
          )}

          {treeData.species.root_damage_potential && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Root damage potential</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(treeData.species.root_damage_potential)}
              </Text>
            </View>
          )}

          {treeData.species.litter_type && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Litter type</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(treeData.species.litter_type)} fruit
              </Text>
            </View>
          )}

          {treeData.species.foliage_type && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Foliage type</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(treeData.species.foliage_type)}
              </Text>
            </View>
          )}

          {treeData.species.california_native !== null &&
            treeData.species.california_native !== undefined && (
              <View style={styles.property}>
                <Text style={styles.propertyName}>California native</Text>
                <Text style={styles.propertyText}>
                  {treeData.species.california_native ? 'Yes' : 'No'}
                </Text>
              </View>
            )}

          {treeData.species.utility_friendly !== null &&
            treeData.species.utility_friendly !== undefined && (
              <View style={styles.property}>
                <Text style={styles.propertyName}>Powerline friendly</Text>
                <Text style={styles.propertyText}>
                  {treeData.species.utility_friendly ? 'Yes' : 'No'}
                </Text>
              </View>
            )}
        </View>

        {/* TODO: Needs to support range of rows */}
        <View style={styles.subContainer}>
          <Text style={styles.header}>Locations</Text>
          <View style={styles.locations}>
            {uniqueLocations?.map((tree, index) => (
              <View
                style={styles.locationEntry}
                key={`${tree.bank}-${tree.row}-${index}`}
              >
                <View style={styles.bankPill}>
                  <Text style={styles.bankText}>Bank #{tree.bank ?? 0}</Text>
                </View>
                <View style={styles.rowPill}>
                  <Text style={styles.rowText}>Row #{tree.row ?? 0}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
