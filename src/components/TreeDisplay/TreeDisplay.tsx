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
import { displayValue, Tree } from '@/types/tree';
import styles from './styles';

type TreeDisplayProps = {
  treeData: Tree;
  allTreesData: Tree[];
};
export default function TreeDisplay({
  treeData,
  allTreesData,
}: TreeDisplayProps) {
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
            <SvgLocationPin />
            <Text style={styles.propertyText}>
              Bank #{location.bank} {'  '}|{'  '} Row #{location.row}
              {/* TODO: Needs to support range of rows */}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.header}>Properties</Text>
      <View style={styles.properties}>
        {treeData.species?.height_ft && (
          <View style={styles.property}>
            <SvgRuler />
            <Text style={styles.propertyText}>
              {treeData.species?.height_ft} ft
            </Text>
          </View>
        )}

        {treeData.species?.tree_shape && (
          <View style={styles.property}>
            <SvgShapes />
            <Text style={styles.propertyText}>
              {displayValue(treeData.species?.tree_shape)}
            </Text>
          </View>
        )}

        {treeData.species?.water_amount && (
          <View style={styles.property}>
            <SvgWateringCan />
            <Text style={styles.propertyText}>
              {displayValue(treeData.species?.water_amount)}
            </Text>
          </View>
        )}

        {treeData.species?.root_damage_potential && (
          <View style={styles.property}>
            <SvgWarning2 />
            <Text style={styles.propertyText}>
              {displayValue(treeData.species.root_damage_potential)}
            </Text>
          </View>
        )}

        {treeData.species?.fruit_type && (
          <View style={styles.property}>
            <SvgFruit />
            <Text style={styles.propertyText}>
              {displayValue(treeData.species.fruit_type)} Fruit
            </Text>
          </View>
        )}

        {treeData.species?.ca_native && (
          <View style={styles.property}>
            <SvgBear />
            <Text style={styles.propertyText}>CA Native</Text>
          </View>
        )}

        {treeData.species?.evergreen && (
          <View style={styles.property}>
            <SvgLeaf />
            <Text style={styles.propertyText}>Evegreen</Text>
          </View>
        )}

        {treeData.species?.powerline_friendly && (
          <View style={styles.property}>
            <SvgFlash />
            <Text style={styles.propertyText}>Powerline Friendly</Text>
          </View>
        )}
      </View>
    </View>
  );
}
