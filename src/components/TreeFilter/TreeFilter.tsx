import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import Dropdown from '@/components/Dropdown/Dropdown';
import { styles } from './styles';

type TreeFilterModalProps = {
  visible: boolean;
  onClose: () => void;
};

const TreeFilterModal: React.FC<TreeFilterModalProps> = ({
  visible,
  onClose,
}) => {
  // Individual filter states
  const [heightChecks, setHeightChecks] = useState({
    small: false,
    medium: false,
    large: false,
  });

  const [fruitChecks, setFruitChecks] = useState({
    wet: false,
    dry: false,
  });

  const [waterChecks, setWaterChecks] = useState({
    less: false,
    moderate: false,
    more: false,
  });

  const [otherChecks, setOtherChecks] = useState({
    native: false,
    evergreen: false,
    powerline: false,
    lowroot: false,
  });

  const [treeShape, setTreeShape] = useState<string>('');

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
  };

  const treeShapeOptions = [
    'Columnar',
    'Conical',
    'Irregular',
    'Palm',
    'Rounded',
  ];

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
                    value={heightChecks.small}
                    onValueChange={() => handleHeightChange('small')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>Small</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={heightChecks.medium}
                    onValueChange={() => handleHeightChange('medium')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>Medium</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={heightChecks.large}
                    onValueChange={() => handleHeightChange('large')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>Large</Text>
                </View>
              </View>
            </View>

            {/* Tree Shape */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Tree Shape</Text>
              <Dropdown
                options={treeShapeOptions}
                value={treeShape}
                setValue={setTreeShape}
              />
            </View>

            {/* Fruit Type */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Fruit Type</Text>
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={fruitChecks.wet}
                    onValueChange={() => handleFruitChange('wet')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>Wet Fruit</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={fruitChecks.dry}
                    onValueChange={() => handleFruitChange('dry')}
                    style={styles.checkbox}
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
                    value={waterChecks.less}
                    onValueChange={() => handleWaterChange('less')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>Less</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={waterChecks.moderate}
                    onValueChange={() => handleWaterChange('moderate')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>Moderate</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={waterChecks.more}
                    onValueChange={() => handleWaterChange('more')}
                    style={styles.checkbox}
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
                    value={otherChecks.native}
                    onValueChange={() => handleOtherChange('native')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>California Native</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={otherChecks.evergreen}
                    onValueChange={() => handleOtherChange('evergreen')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>Evergreen</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={otherChecks.powerline}
                    onValueChange={() => handleOtherChange('powerline')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>Powerline Friendly</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    value={otherChecks.lowroot}
                    onValueChange={() => handleOtherChange('lowroot')}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>Low Root Damage</Text>
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

export default TreeFilterModal;
