import React from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Lightbulb, Production, StreetReady } from '@/icons';
import { formatEnumKey, Tree } from '@/types/tree';
import { TreeSpecies } from '@/types/tree_species';
import { styles } from './styles';

type TreeSpeciesDisplayProps = {
  speciesData: Partial<TreeSpecies>;
  treeData: Tree[];
};

export const TreeSpeciesDisplay: React.FC<TreeSpeciesDisplayProps> = ({
  speciesData,
  treeData,
}) => {
  const { isAuthenticated } = useAuth();

  const uniqueLocations = treeData.filter(
    (tree, index, self) =>
      index === self.findIndex(t => t.bank === tree.bank && t.row === tree.row),
  );

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

      {treeData?.length > 0 && isAuthenticated && (
        <View style={styles.subContainer}>
          <Text style={styles.header}>Production Quantities</Text>
          <View style={styles.properties}>
            <View style={styles.production}>
              <Production />
              <View style={styles.productionPill}>
                <Text style={styles.productionQuantity}>
                  {
                    treeData.filter(
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
                    treeData.filter(
                      tree => tree.production_status === 'street_ready',
                    ).length
                  }
                </Text>
              </View>
              <Text style={styles.productionText}>Street ready</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.subContainer}>
        <Text style={styles.header}>Properties</Text>

        <View style={styles.properties}>
          {speciesData.max_height_ft && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Height</Text>
              <Text style={styles.propertyText}>
                {speciesData.max_height_ft} ft
              </Text>
            </View>
          )}

          {speciesData.tree_shape && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Shape</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.tree_shape)}
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

          {speciesData.root_damage_potential && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Root damage potential</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.root_damage_potential)}
              </Text>
            </View>
          )}

          {speciesData.litter_type && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Litter type</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.litter_type)} fruit
              </Text>
            </View>
          )}

          {speciesData.foliage_type && (
            <View style={styles.property}>
              <Text style={styles.propertyName}>Foliage type</Text>
              <Text style={styles.propertyText}>
                {formatEnumKey(speciesData.foliage_type)}
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

          {speciesData.utility_friendly !== null &&
            speciesData.utility_friendly !== undefined && (
              <View style={styles.property}>
                <Text style={styles.propertyName}>Powerline friendly</Text>
                <Text style={styles.propertyText}>
                  {speciesData.utility_friendly ? 'Yes' : 'No'}
                </Text>
              </View>
            )}
        </View>
      </View>

      {treeData?.length > 0 && isAuthenticated && (
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
      )}
    </View>
  );
};
