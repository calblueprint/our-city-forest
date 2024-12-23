import { useEffect, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TreeBg from '@/../assets/tree-info-bg.png';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import TreeDisplay from '@/components/TreeDisplay/TreeDisplay';
import TreeEdit from '@/components/TreeEdit/TreeEdit';
import colors from '@/styles/colors';
import { getAllTreesForSpecies } from '@/supabase/queries/species';
import { getTreeInfo } from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import { Tree } from '@/types/tree';
import styles from './styles';

type TreeInfoScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'TreeInfo'
>;

export default function TreeInfoPage({ route }: TreeInfoScreenProps) {
  const treeId = route.params?.treeId ?? '9ce20e23-a66f-4df8-8696-421202f3d616';
  const [isSpecies, setIsSpecies] = useState(true);
  const [treeData, setTreeData] = useState<Tree>({
    tree_id: treeId,
  });
  const [allTreesData, setAllTreesData] = useState<Tree[]>([]);
  const treeBgImage = treeData.species?.image_link;

  useEffect(() => {
    (async () => {
      const data = await getTreeInfo(treeId);
      setTreeData(data);
    })();
    (async () => {
      const data = await getAllTreesForSpecies(treeData.species?.name ?? '');
      setAllTreesData(data);
    })();
  }, [treeData.species?.name, treeId]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
      >
        <ScrollView style={styles.container}>
          <ImageBackground
            source={treeBgImage ? { uri: treeBgImage } : TreeBg}
            style={styles.imageBg}
          ></ImageBackground>
          <View style={styles.body}>
            <View style={styles.switch}>
              <ToggleSwitch
                value={isSpecies}
                onValueChange={setIsSpecies}
                trueLabel="This tree"
                falseLabel="Species"
              />
            </View>
            <View>
              <Text style={styles.header}>{treeData.species?.name ?? ''}</Text>
              <View style={styles.idPillFlex}>
                <Text style={styles.scientificName}>
                  {treeData.species?.scientific_name ?? ''}
                </Text>

                {isSpecies && (
                  <View style={styles.idPill}>
                    <Text style={styles.idText}>
                      BR-{treeData.bank}-{treeData.row}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.separator}></View>

            {isSpecies ? (
              <TreeEdit treeData={treeData} setTreeData={setTreeData} />
            ) : (
              <TreeDisplay treeData={treeData} allTreesData={allTreesData} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
