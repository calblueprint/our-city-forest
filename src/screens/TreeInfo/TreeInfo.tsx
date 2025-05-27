import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImageBackground } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ToggleSwitch } from '@/components/ToggleSwitch/ToggleSwitch';
import { TreeDisplay } from '@/components/TreeDisplay/TreeDisplay';
import { TreeEdit } from '@/components/TreeEdit/TreeEdit';
import { XButton } from '@/icons';
import { getAllTreesForSpecies, getTreeInfo } from '@/supabase/queries/trees';
import { HomeStackParamList } from '@/types/navigation';
import { Tree } from '@/types/tree';
import { styles } from './styles';

type TreeInfoScreenProps = NativeStackScreenProps<
  HomeStackParamList,
  'TreeInfo'
>;

export const TreeInfoScreen: React.FC<TreeInfoScreenProps> = ({
  route,
  navigation,
}) => {
  const treeId = route.params?.treeId ?? '';
  const [isSpecies, setIsSpecies] = useState(true);
  const [treeData, setTreeData] = useState<Tree | null>(null);
  const [allTreesData, setAllTreesData] = useState<Tree[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getTreeInfo(treeId);
      setTreeData(data);
    })();
    (async () => {
      const data = await getAllTreesForSpecies(treeData?.species?.name ?? '');
      setAllTreesData(data);
    })();
  }, [treeData?.species?.name, treeId]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
      >
        <ScrollView>
          <ImageBackground
            source={{ uri: treeData?.species?.image_url }}
            style={styles.imageBackground}
          >
            <View style={styles.topNavigation}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <XButton />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={styles.body}>
            <View style={styles.switch}>
              <ToggleSwitch
                value={isSpecies}
                onValueChange={setIsSpecies}
                leftLabel="This tree"
                rightLabel="Species"
              />
            </View>
            <View>
              <Text style={styles.header}>{treeData?.species?.name ?? ''}</Text>
              <View style={styles.idPillFlex}>
                <Text style={styles.scientificName}>
                  {treeData?.species?.scientific_name ?? ''}
                </Text>

                {isSpecies && (
                  <View style={styles.idPill}>
                    <Text style={styles.idText}>
                      BR-{treeData?.bank}-{treeData?.row}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.divider}></View>

            {treeData ? (
              isSpecies ? (
                <TreeEdit treeData={treeData} setTreeData={setTreeData} />
              ) : (
                <TreeDisplay treeData={treeData} allTreesData={allTreesData} />
              )
            ) : (
              <Text>Loading tree data...</Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
