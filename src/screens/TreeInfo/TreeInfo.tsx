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
import { getTreeInfo } from '@/supabase/queries/trees';
import { RootStackParamList } from '@/types/navigation';
import { Tree } from '@/types/tree';
import styles from './styles';

type TreeInfoPageProps = NativeStackScreenProps<
  RootStackParamList,
  'TreeInfoScreen'
>;

export default function TreeInfoPage({ route }: TreeInfoPageProps) {
  const treeId = route.params?.treeId ?? '9ce20e23-a66f-4df8-8696-421202f3d616';
  const [isSpecies, setIsSpecies] = useState(false);
  const [treeData, setTreeData] = useState<Tree>({
    tree_id: treeId,
  });
  const treeBgImage = treeData.species?.image_link;

  useEffect(() => {
    (async () => {
      const data = await getTreeInfo(treeId);
      setTreeData(data);
    })();
  }, [treeId]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white1 }}>
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
              <TreeDisplay treeData={treeData} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
