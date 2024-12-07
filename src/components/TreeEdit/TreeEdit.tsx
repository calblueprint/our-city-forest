import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import SvgEdit from '@/icons/EditPen';
import SvgHeart from '@/icons/Heart';
import SvgLocationPin from '@/icons/Location';
import SvgRepeat from '@/icons/Repeat';
import SvgUser from '@/icons/User';
import colors from '@/styles/colors';
import { updateTree } from '@/supabase/queries/trees';
import {
  Tree,
  TreeHealth,
  TreeProductionStatus,
  TreeReservedFor,
} from '@/types/tree';
import Dropdown from '../Dropdown/Dropdown';
import styles from './styles';

type TreeEditProps = {
  treeData: Tree;
  setTreeData: (treeData: Tree) => void;
};

export default function TreeEdit({ treeData, setTreeData }: TreeEditProps) {
  const [isEditing, setIsEditing] = useState(false);

  const titleCase = (str: string) =>
    str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    );

  const displayValue = (s: string) => titleCase(s.replace('_', ' '));

  const saveTreeData = async () => {
    setIsEditing(false);
    if (typeof treeData.row !== 'number') return;
    if (typeof treeData.bank !== 'number') return;

    const { species, ...treeWithoutSpecies } = treeData;
    await updateTree(treeData.tree_id, treeWithoutSpecies);
  };

  return (
    <View>
      <View style={styles.editFlex}>
        <Text style={[styles.header, styles.propertiesHeader]}>Properties</Text>
        {isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={saveTreeData}>
            <Text style={styles.doneEditingText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: undefined }]}
            onPress={() => setIsEditing(true)}
          >
            <SvgEdit />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.propertiesFlex}>
        <View>
          <Text style={styles.label}>Location</Text>
          {isEditing ? (
            <View style={styles.locationInputView}>
              <TextInput
                style={styles.textInput}
                placeholder="Bank #"
                placeholderTextColor={colors.gray4}
                value={treeData?.bank?.toString() ?? ''}
                keyboardType="numeric"
                onChangeText={newBank => {
                  if (!isNaN(+newBank) && newBank.length > 0) {
                    setTreeData({ ...treeData, bank: +newBank });
                  } else {
                    setTreeData({
                      ...treeData,
                      bank: newBank as unknown as number, // So the user can have intermediate text
                    });
                  }
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Row #"
                placeholderTextColor={colors.gray4}
                value={treeData?.row?.toString() ?? ''}
                keyboardType="numeric"
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
              />
            </View>
          ) : (
            <View style={styles.iconTextView}>
              <SvgLocationPin />
              <Text style={styles.displayText}>
                Bank #{treeData.bank}
                {'  '}|{'  '}Row #{treeData.row}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.label}>Health Status</Text>
          {isEditing ? (
            <Dropdown
              options={Object.values(TreeHealth)}
              displayValue={displayValue}
              setValue={value =>
                setTreeData({ ...treeData, health_status: value })
              }
              value={treeData.health_status ?? ''}
            />
          ) : (
            <View style={styles.iconTextView}>
              <SvgHeart />
              <Text style={[styles.displayText, styles.greenText]}>
                {displayValue(treeData.health_status ?? '')}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.label}>Production Status</Text>
          {isEditing ? (
            <Dropdown
              options={Object.values(TreeProductionStatus)}
              displayValue={displayValue}
              setValue={value =>
                setTreeData({ ...treeData, production_status: value })
              }
              value={treeData.production_status ?? ''}
            />
          ) : (
            <View style={styles.iconTextView}>
              <SvgRepeat />
              <Text style={[styles.displayText, styles.greenText]}>
                {displayValue(treeData.reserved_for ?? '')}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.label}>Ownership Status</Text>
          {isEditing ? (
            <Dropdown
              options={Object.values(TreeReservedFor)}
              displayValue={displayValue}
              setValue={value =>
                setTreeData({ ...treeData, reserved_for: value })
              }
              value={treeData.reserved_for ?? ''}
            />
          ) : (
            <View style={styles.iconTextView}>
              <SvgUser />
              <Text style={[styles.displayText, styles.greenText]}>
                {displayValue(treeData.reserved_for ?? '')}
              </Text>
            </View>
          )}
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
          editable={isEditing}
          numberOfLines={4}
        />
      </View>
    </View>
  );
}
