import { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TreeBg from '@/../assets/tree-info-bg.png';
import colors from '@/colors';
import Dropdown from '@/components/Dropdown/Dropdown';
import { RootStackParamList } from '@/types';
import styles from './styles';
import { TreeHealth, TreeOwnership, TreeStatus } from './types';

type TreeInfoPageProps = NativeStackScreenProps<
  RootStackParamList,
  'TreeInfoScreen'
>;

// TODO: add check next to location
// TODO: fix drowdown color and arrow size
// TODO: add ownership address
// TODO: fix addional notes spacing
export default function TreeInfoPage({ route }: TreeInfoPageProps) {
  // Can be changed to API call later
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
      <ImageBackground source={TreeBg} style={styles.imageBg}>
        <View style={styles.headerFlex}>
          <View style={styles.idBadge}>
            <Text style={styles.idText}>ID-{id}</Text>
          </View>
          <Text style={styles.treeName}>{treeName}</Text>
          <Text style={styles.scientificName}>{scientificName}</Text>
        </View>
      </ImageBackground>
      <View style={styles.body}>
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

        <View>
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput placeholder="Write here..." />
        </View>
      </View>
    </ScrollView>
  );
}
