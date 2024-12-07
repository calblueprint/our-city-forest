import { Text, TextInput, View } from 'react-native';
import Lightbulb from '@/icons/Lightbulb';
import SvgLocationPin from '@/icons/Location';
import { Tree } from '@/types/tree';
import styles from './styles';

type TreeDisplayProps = {
  treeData: Tree;
};
export default function TreeDisplay({ treeData }: TreeDisplayProps) {
  return (
    <View>
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
            <Text style={styles.text}>
              Bank #{treeData.bank} {'  '} | {'  '} Row #{treeData.row}
              {/* TODO: Needs to support range of rows */}
            </Text>
          </View>
        </View>

        <Text style={styles.header}>Properties</Text>
        <View style={styles.properties}>
          <Text style={styles.text}>{treeData.species?.height_ft}ft</Text>
          <Text style={styles.text}>
            {treeData.species?.has_nuts ? 'Has nuts' : 'No nuts'}
          </Text>
          <Text style={styles.text}>{treeData.species?.height_ft}</Text>
          <Text style={styles.text}>{treeData.species?.height_ft}</Text>
          <Text style={styles.text}>{treeData.species?.height_ft}</Text>
        </View>
      </View>
    </View>
  );
}
