import { Fragment } from 'react';
import { Text, TextInput, View } from 'react-native';
import SvgBear from '@/icons/Bear';
import SvgFlash from '@/icons/Flash';
import SvgFruit from '@/icons/Fruit';
import SvgLeaf from '@/icons/Leaf';
import Lightbulb from '@/icons/Lightbulb';
import SvgLocationPin from '@/icons/Location';
import SvgRuler from '@/icons/Ruler';
import SvgShapes from '@/icons/Shapes';
import SvgWarning2 from '@/icons/Warning2';
import SvgWateringCan from '@/icons/WateringCan';
import { Species } from '@/types/species';
import { displayValue, Tree } from '@/types/tree';
import styles from './styles';

type SpeciesDisplayProps = {
  speciesData: Partial<Species>;
  treeData: Tree[];
};
export default function SpeciesDisplay({
  speciesData,
  treeData,
}: SpeciesDisplayProps) {
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
        {speciesData.height_ft && (
          <View style={styles.property}>
            <SvgRuler />
            <Text style={styles.propertyText}>{speciesData.height_ft} ft</Text>
          </View>
        )}

        {speciesData.tree_shape && (
          <View style={styles.property}>
            <SvgShapes />
            <Text style={styles.propertyText}>
              {displayValue(speciesData.tree_shape)}
            </Text>
          </View>
        )}

        {speciesData.water_amount && (
          <View style={styles.property}>
            <SvgWateringCan />
            <Text style={styles.propertyText}>
              {displayValue(speciesData.water_amount)}
            </Text>
          </View>
        )}

        {speciesData.root_damage_potential && (
          <View style={styles.property}>
            <SvgWarning2 />
            <Text style={styles.propertyText}>
              {displayValue(speciesData.root_damage_potential)}
            </Text>
          </View>
        )}

        {speciesData.fruit_type && (
          <View style={styles.property}>
            <SvgFruit />
            <Text style={styles.propertyText}>
              {displayValue(speciesData.fruit_type)} Fruit
            </Text>
          </View>
        )}

        {speciesData.ca_native && (
          <View style={styles.property}>
            <SvgBear />
            <Text style={styles.propertyText}>CA Native</Text>
          </View>
        )}

        {speciesData.evegreen && (
          <View style={styles.property}>
            <SvgLeaf />
            <Text style={styles.propertyText}>Evegreen</Text>
          </View>
        )}

        {speciesData.powerline_friendly && (
          <View style={styles.property}>
            <SvgFlash />
            <Text style={styles.propertyText}>Powerline Friendly</Text>
          </View>
        )}
      </View>

      {treeData?.length > 0 && (
        <>
          <Text style={styles.header}>Location</Text>
          <View style={styles.locations}>
            {treeData?.map(tree => (
              <View style={styles.locationEntry} key={tree.tree_id}>
                <SvgLocationPin />
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
}
