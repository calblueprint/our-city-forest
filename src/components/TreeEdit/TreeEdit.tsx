import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Heart, Repeat, User } from '@/icons';
import { colors } from '@/styles/colors';
import { updateTree } from '@/supabase/queries/trees';
import {
  formatEnumKey,
  Tree,
  TreeHealthStatus,
  TreeOwnershipStatus,
  TreeProductionStatus,
} from '@/types/tree';
import { Dropdown } from '../Dropdown/Dropdown';
import { styles } from './styles';

type TreeEditProps = {
  treeData: Tree;
  setTreeData: (treeData: Tree) => void;
};

export const TreeEdit: React.FC<TreeEditProps> = ({
  treeData,
  setTreeData,
}) => {
  const [isEditing, setIsEditing] = useState(false);

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
        <Text style={styles.header}>Information</Text>
        {!isEditing && (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.editButton}
          >
            <Text style={styles.editText}>Edit</Text>
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
                placeholder="Bank No."
                placeholderTextColor={colors.gray4}
                value={treeData?.bank?.toString() ?? ''}
                keyboardType="numeric"
                maxLength={1}
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
                placeholder="Row No."
                placeholderTextColor={colors.gray4}
                value={treeData?.row?.toString() ?? ''}
                keyboardType="numeric"
                maxLength={3}
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
            <View style={styles.location}>
              <View style={styles.bankPill}>
                <Text style={styles.bankText}>Bank #{treeData.bank ?? 0}</Text>
              </View>
              <View style={styles.rowPill}>
                <Text style={styles.rowText}>Row #{treeData.row ?? 0}</Text>
              </View>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.label}>Health Status</Text>
          {isEditing ? (
            <Dropdown
              options={Object.values(TreeHealthStatus)}
              onChange={value =>
                setTreeData({ ...treeData, health_status: value })
              }
              value={treeData.health_status ?? ''}
            />
          ) : (
            <View style={styles.iconTextView}>
              <Heart />
              <Text style={[styles.displayText, styles.greenText]}>
                {formatEnumKey(treeData.health_status ?? '')}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.label}>Production Status</Text>
          {isEditing ? (
            <Dropdown
              options={Object.values(TreeProductionStatus)}
              onChange={value =>
                setTreeData({ ...treeData, production_status: value })
              }
              value={treeData.production_status ?? ''}
            />
          ) : (
            <View style={styles.iconTextView}>
              <Repeat />
              <Text style={[styles.displayText, styles.greenText]}>
                {formatEnumKey(treeData.production_status ?? '')}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.label}>Ownership Status</Text>
          {isEditing ? (
            <Dropdown
              options={Object.values(TreeOwnershipStatus)}
              onChange={value =>
                setTreeData({ ...treeData, ownership_status: value })
              }
              value={treeData.ownership_status ?? ''}
            />
          ) : (
            <View style={styles.iconTextView}>
              <User />
              <Text style={[styles.displayText, styles.greenText]}>
                {formatEnumKey(treeData.ownership_status ?? '')}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.notes}>
        <Text style={styles.notesHeader}>Additional Notes</Text>
        <TextInput
          style={styles.notesTextBox}
          value={treeData.additional_notes ?? ''}
          onChangeText={newNotes =>
            setTreeData({ ...treeData, additional_notes: newNotes })
          }
          placeholder="Write here..."
          multiline
          editable={isEditing}
          // nestedScrollEnabled={true}
          scrollEnabled={true}
          numberOfLines={4}
        />
      </View>

      {isEditing && (
        <TouchableOpacity style={styles.button} onPress={saveTreeData}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
