import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import { TreeSpeciesShape } from '@/types/tree_species';
import { styles } from './styles';

type TreeFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  filters: {
    height: string[];
    shape: string;
    fruit: string[];
    water: string[];
    other: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      height: string[];
      shape: string;
      fruit: string[];
      water: string[];
      other: string[];
    }>
  >;
};

export const TreeFilterModal: React.FC<TreeFilterModalProps> = ({
  visible,
  onClose,
  filters,
  setFilters,
}) => {
  // Individual filter states
  const [heightChecks, setHeightChecks] = useState({
    small: filters.height.includes('small'),
    medium: filters.height.includes('medium'),
    large: filters.height.includes('large'),
  });

  const [fruitChecks, setFruitChecks] = useState({
    wet: filters.fruit.includes('wet'),
    dry: filters.fruit.includes('dry'),
  });

  const [waterChecks, setWaterChecks] = useState({
    less: filters.water.includes('less'),
    moderate: filters.water.includes('moderate'),
    more: filters.water.includes('more'),
  });

  const [otherChecks, setOtherChecks] = useState({
    native: filters.other.includes('native'),
    evergreen: filters.other.includes('evergreen'),
    powerline: filters.other.includes('powerline'),
    lowroot: filters.other.includes('lowroot'),
  });

  const [treeShape, setTreeShape] = useState<string>(filters.shape);

  useEffect(() => {
    setFilters({
      height: Object.keys(heightChecks).filter(
        key => heightChecks[key as keyof typeof heightChecks],
      ) as string[],
      shape: treeShape,
      fruit: Object.keys(fruitChecks).filter(
        key => fruitChecks[key as keyof typeof fruitChecks],
      ) as string[],
      water: Object.keys(waterChecks).filter(
        key => waterChecks[key as keyof typeof waterChecks],
      ) as string[],
      other: Object.keys(otherChecks).filter(
        key => otherChecks[key as keyof typeof otherChecks],
      ) as string[],
    });
  }, [
    heightChecks,
    treeShape,
    fruitChecks,
    waterChecks,
    otherChecks,
    setFilters,
  ]);

  useEffect(() => {
    console.log('Updated filters:', {
      heightChecks,
      fruitChecks,
      waterChecks,
      otherChecks,
      treeShape,
    });
  }, [heightChecks, fruitChecks, waterChecks, otherChecks, treeShape]);

  const handleHeightChange = (key: keyof typeof heightChecks) => {
    setHeightChecks(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFruitChange = (key: keyof typeof fruitChecks) => {
    setFruitChecks(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleWaterChange = (key: keyof typeof waterChecks) => {
    setWaterChecks(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleOtherChange = (key: keyof typeof otherChecks) => {
    setOtherChecks(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetFilters = () => {
    console.log('Resetting filters');
    setHeightChecks({
      small: false,
      medium: false,
      large: false,
    });
    setFruitChecks({
      wet: false,
      dry: false,
    });
    setWaterChecks({
      less: false,
      moderate: false,
      more: false,
    });
    setOtherChecks({
      native: false,
      evergreen: false,
      powerline: false,
      lowroot: false,
    });
    setTreeShape('');
    setFilters({
      height: [],
      shape: '',
      fruit: [],
      water: [],
      other: [],
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.filterBackground}>
        <View style={styles.filterContainer}>
          <View style={styles.grabber}></View>
          <View style={styles.filterHeading}>
            <Text style={styles.headerText}>Filter Trees</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            {/* Height */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Height</Text>
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={heightChecks.small}
                    onChange={() => handleHeightChange('small')}
                  />
                  <Text style={styles.checkboxLabel}>Small (&lt; 40')</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={heightChecks.medium}
                    onChange={() => handleHeightChange('medium')}
                  />
                  <Text style={styles.checkboxLabel}>Medium (40 - 60')</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={heightChecks.large}
                    onChange={() => handleHeightChange('large')}
                  />
                  <Text style={styles.checkboxLabel}>Large (60' +)</Text>
                </View>
              </View>
            </View>

            {/* Tree Shape */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Tree Shape</Text>
              <Dropdown
                options={Object.values(TreeSpeciesShape)}
                value={treeShape}
                onChange={setTreeShape}
              />
            </View>

            {/* Fruit Type */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Fruit Type</Text>
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={fruitChecks.wet}
                    onChange={() => handleFruitChange('wet')}
                  />
                  <Text style={styles.checkboxLabel}>Wet Fruit</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={fruitChecks.dry}
                    onChange={() => handleFruitChange('dry')}
                  />
                  <Text style={styles.checkboxLabel}>Dry Fruit</Text>
                </View>
              </View>
            </View>

            {/* Water Amount  */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Water Amount</Text>
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={waterChecks.less}
                    onChange={() => handleWaterChange('less')}
                  />
                  <Text style={styles.checkboxLabel}>Less</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={waterChecks.moderate}
                    onChange={() => handleWaterChange('moderate')}
                  />
                  <Text style={styles.checkboxLabel}>Moderate</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={waterChecks.more}
                    onChange={() => handleWaterChange('more')}
                  />
                  <Text style={styles.checkboxLabel}>More</Text>
                </View>
              </View>
            </View>

            {/* Other Properties */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Other Properties</Text>
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={otherChecks.native}
                    onChange={() => handleOtherChange('native')}
                  />
                  <Text style={styles.checkboxLabel}>California native</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={otherChecks.evergreen}
                    onChange={() => handleOtherChange('evergreen')}
                  />
                  <Text style={styles.checkboxLabel}>Evergreen</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={otherChecks.powerline}
                    onChange={() => handleOtherChange('powerline')}
                  />
                  <Text style={styles.checkboxLabel}>Powerline friendly</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={otherChecks.lowroot}
                    onChange={() => handleOtherChange('lowroot')}
                  />
                  <Text style={styles.checkboxLabel}>Low root damage</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Complete Button */}
          <TouchableOpacity style={styles.completeButton} onPress={onClose}>
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
