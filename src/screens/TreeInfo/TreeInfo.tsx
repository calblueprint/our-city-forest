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
  const [isTree, setIsTree] = useState(true);
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
            <View style={styles.pill}>
              <Text style={styles.pillText}>{allTreesData.length} total</Text>
            </View>
          </ImageBackground>
          <View style={styles.body}>
            <View style={styles.switch}>
              <ToggleSwitch
                value={isTree}
                onValueChange={setIsTree}
                leftLabel="This tree"
                rightLabel="Species"
                wide={false}
              />
            </View>
            <View style={styles.nameAndId}>
              <View style={styles.nameContainer}>
                <Text
                  style={styles.commonName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {treeData?.species?.name ?? ''}
                </Text>
                <Text
                  style={styles.scientificName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {treeData?.species?.scientific_name ?? ''}
                </Text>
              </View>

              {isTree && (
                <View style={styles.tagIdContainer}>
                  <Text style={styles.tagIdText}>{treeData?.tag_id}</Text>
                </View>
              )}
            </View>

            {treeData ? (
              isTree ? (
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
