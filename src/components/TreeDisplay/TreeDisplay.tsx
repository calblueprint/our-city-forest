import { Text, TextInput, View } from 'react-native';
import Lightbulb from '@/icons/Lightbulb';
import SvgLocationPin from '@/icons/Location';
import SvgNuts from '@/icons/Nuts';
import SvgPaintbucket from '@/icons/Paintbucket';
import SvgRuler from '@/icons/Ruler';
import SvgTree from '@/icons/Tree';
import SvgWarning2 from '@/icons/Warning2';
import { Tree } from '@/types/tree';
import styles from './styles';

type TreeDisplayProps = {
  treeData: Tree;
};
export default function TreeDisplay({ treeData }: TreeDisplayProps) {
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
        <View style={styles.locationEntry}>
          <SvgLocationPin />
          <Text style={styles.propertyText}>
            Bank #{treeData.bank} {'  '}|{'  '} Row #{treeData.row}
            {/* TODO: Needs to support range of rows */}
          </Text>
        </View>
      </View>

      <Text style={styles.header}>Properties</Text>
      <View style={styles.properties}>
        {treeData.species?.height_ft && (
          <View style={styles.property}>
            <SvgRuler />
            <Text style={styles.propertyText}>
              {treeData.species?.height_ft}ft
            </Text>
          </View>
        )}

        {treeData.species?.has_nuts !== null && (
          <View style={styles.property}>
            <SvgNuts />
            <Text style={styles.propertyText}>
              {treeData.species?.has_nuts ? 'Has nuts' : 'No nuts'}
            </Text>
          </View>
        )}

        {treeData.species?.tree_shape && (
          <View style={styles.property}>
            <SvgTree />
            <Text style={styles.propertyText}>
              {treeData.species?.tree_shape}
            </Text>
          </View>
        )}

        {treeData.species?.utility_friendly && (
          <View style={styles.property}>
            <SvgWarning2 />
            <Text style={styles.propertyText}>Utility Friendly</Text>
          </View>
        )}

        {treeData.species?.flower_color && (
          <View style={styles.property}>
            <SvgPaintbucket />
            <Text style={styles.propertyText}>
              {treeData.species?.flower_color}
            </Text>
          </View>
        )}

        {treeData.species?.has_nuts && (
          <View style={styles.property}>
            <SvgNuts />
            <Text style={styles.propertyText}>
              {treeData.species?.has_nuts ? 'Has nuts' : 'No nuts'}
            </Text>
          </View>
        )}

        {treeData.species?.has_nuts && (
          <View style={styles.property}>
            <SvgNuts />
            <Text style={styles.propertyText}>
              {treeData.species?.has_nuts ? 'Has nuts' : 'No nuts'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
