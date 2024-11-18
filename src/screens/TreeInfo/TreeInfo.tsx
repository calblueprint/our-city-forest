import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TreeBg from '@/../assets/tree-info-bg.png';
import Dropdown from '@/components/Dropdown/Dropdown';
import colors from '@/styles/colors';
import { RootStackParamList } from '@/types/navigation';
import { TreeHealth, TreeOwnership, TreeStatus } from '@/types/trees';
import styles from './styles';

type TreeInfoPageProps = NativeStackScreenProps<
  RootStackParamList,
  'TreeInfoScreen'
>;

export default function TreeInfoPage({ route }: TreeInfoPageProps) {
  const { treeName, scientificName, id } = {
    treeName: 'Strawberry Tree',
    scientificName: 'Arbutus ‘Marina’',
    id: '245-123',
  };

  const treeInfo = {
    datePlanted: new Date(),
    sourcingLocation: '2112 Berkeley Way',
    bankNumber: 3,
    rowNumber: 23,
    status: TreeStatus.Available,
    health: TreeHealth.Healthy,
    treeOwnership: TreeOwnership.Planted,
  };

  const [rowNumber, setRowNumber] = useState(treeInfo.rowNumber.toString());
  const [bankNumber, setBankNumber] = useState(treeInfo.bankNumber.toString());

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position" enabled>
        <ImageBackground
          source={TreeBg}
          style={styles.imageBg}
        ></ImageBackground>
        <View style={styles.body}>
          <View>
            <Text style={styles.header}>{treeName}</Text>
            <View style={styles.idPillFlex}>
              <Text style={styles.scientificName}>{scientificName}</Text>

              <View style={styles.idPill}>
                <Text style={styles.idText}>ID-{id}</Text>
              </View>
            </View>
          </View>

          <View style={styles.separator}></View>

          <View style={styles.editFlex}>
            <Text style={[styles.header, styles.propertiesHeader]}>
              Properties
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.doneEditingText}>Done</Text>
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
                  value={rowNumber}
                  onChangeText={setRowNumber}
                ></TextInput>
                <TextInput
                  style={styles.textInput}
                  placeholder="Location #"
                  placeholderTextColor={colors.gray4}
                  value={bankNumber}
                  onChangeText={setBankNumber}
                ></TextInput>
              </View>
            </View>

            <View>
              <Text style={styles.label}>Production Status</Text>
              <Dropdown
                options={Object.values(TreeStatus)}
                setValue={() => {}}
                value={treeInfo.status}
              />
            </View>

            <View>
              <Text style={styles.label}>Health</Text>
              <Dropdown
                options={Object.values(TreeHealth)}
                setValue={() => {}}
                value={treeInfo.health}
              />
            </View>

            <View>
              <Text style={styles.label}>Ownership Status</Text>
              <Dropdown
                options={Object.values(TreeOwnership)}
                setValue={() => {}}
                value={treeInfo.treeOwnership}
              />
            </View>
          </View>

          <View style={styles.propertiesFlex}>
            <Text style={styles.header}>Additional Notes</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Type notes here..."
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
