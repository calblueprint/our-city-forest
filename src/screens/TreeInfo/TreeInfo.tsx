import { useEffect, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Switch } from 'react-native-switch';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TreeBg from '@/../assets/tree-info-bg.png';
import Dropdown from '@/components/Dropdown/Dropdown';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';
import colors from '@/styles/colors';
import { getTreeInfo, updateTree } from '@/supabase/queries/trees';
import { RootStackParamList } from '@/types/navigation';
import { Tree, TreeHealth, TreeReservedFor } from '@/types/tree';
import styles from './styles';

type TreeInfoPageProps = NativeStackScreenProps<
  RootStackParamList,
  'TreeInfoScreen'
>;

export default function TreeInfoPage({ route }: TreeInfoPageProps) {
  const treeId = route.params?.treeId ?? '9ce20e23-a66f-4df8-8696-421202f3d616';
  const [isEditing, setIsEditing] = useState(false);
  const [treeData, setTreeData] = useState<Tree>({
    tree_id: treeId,
  });

  useEffect(() => {
    (async () => {
      const data = await getTreeInfo(treeId);
      setTreeData(data);
      console.log(data);
    })();
  }, [treeId]);

  const saveTreeData = async () => {
    if (typeof treeData.row !== 'number') return;
    if (typeof treeData.bank !== 'number') return;
    const { species, ...treeWithoutSpecies } = treeData;
    await updateTree(treeId, treeWithoutSpecies);
    console.log('Saved tree data:', treeWithoutSpecies);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
      >
        <ScrollView style={styles.container}>
          <ImageBackground
            source={TreeBg}
            style={styles.imageBg}
          ></ImageBackground>
          <View style={styles.body}>
            <View>
              <ToggleSwitch
                value={isEditing}
                onValueChange={setIsEditing}
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

                <View style={styles.idPill}>
                  <Text style={styles.idText}>
                    BR-{treeData.bank}-{treeData.row}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.editFlex}>
              <Text style={[styles.header, styles.propertiesHeader]}>
                Properties
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={saveTreeData}
              >
                <Text style={styles.doneEditingText}>Save</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.propertiesFlex}>
              <View>
                <Text style={styles.label}>Location</Text>
                <View style={styles.locationInputView}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Row #"
                    placeholderTextColor={colors.gray4}
                    value={treeData?.row?.toString() ?? ''}
                    onChangeText={newRow => {
                      if (!isNaN(+newRow) && newRow.length > 0) {
                        setTreeData({ ...treeData, row: +newRow });
                      } else {
                        setTreeData({
                          ...treeData,
                          row: newRow as unknown as number, // So the user can have intermediate text
                        });
                      }
                    }}
                  ></TextInput>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Location #"
                    placeholderTextColor={colors.gray4}
                    value={treeData?.bank?.toString() ?? ''}
                    onChangeText={newBank =>
                      setTreeData({ ...treeData, bank: +newBank })
                    }
                  ></TextInput>
                </View>
              </View>

              <View>
                <Text style={styles.label}>Production Status</Text>
                <Dropdown
                  options={Object.values(TreeReservedFor)}
                  setValue={value =>
                    setTreeData({ ...treeData, reserved_for: value })
                  }
                  value={treeData.reserved_for ?? ''}
                />
              </View>

              <View>
                <Text style={styles.label}>Health Status</Text>
                <Dropdown
                  options={Object.values(TreeHealth)}
                  setValue={() => {}}
                  value={treeData.health_status ?? ''}
                />
              </View>

              <View>
                <Text style={styles.label}>Ownership Status</Text>
                <Dropdown
                  options={Object.values(TreeReservedFor)}
                  setValue={() => {}}
                  value={treeData.reserved_for ?? ''}
                />
              </View>
            </View>

            <View style={styles.propertiesFlex}>
              <Text style={[styles.header, styles.additionalNotes]}>
                Additional Notes
              </Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={treeData.additional_notes ?? ''}
                onChangeText={newNotes =>
                  setTreeData({ ...treeData, additional_notes: newNotes })
                }
                placeholder="Type notes here..."
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
