import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CheckboxComponent from '@/components/Checkbox/Checkbox';
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
          <View style={styles.filterHeading}>
            <Text style={styles.filterHeadingText}>Filter Trees</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            {/* Height */}
            <View style={styles.filterProperties}>
              <Text style={styles.filterSubHeadingText}>Height</Text>
              <CheckboxComponent
                checked={heightChecks.small}
                onToggle={() => handleHeightChange('small')}
                label="Small"
              />
              <CheckboxComponent
                checked={heightChecks.medium}
                onToggle={() => handleHeightChange('medium')}
                label="Medium"
              />
              <CheckboxComponent
                checked={heightChecks.large}
                onToggle={() => handleHeightChange('large')}
                label="Large"
              />
            </View>

            {/* Tree Shape */}
            <View style={styles.filterProperties}>
              <Text style={styles.filterSubHeadingText}>Tree Shape</Text>
              <Dropdown
                options={treeShapeOptions}
                value={treeShape}
                setValue={setTreeShape}
              />
            </View>

            {/* Fruit Type */}
            <View style={styles.filterProperties}>
              <Text style={styles.filterSubHeadingText}>Fruit Type</Text>
              <CheckboxComponent
                checked={fruitChecks.wet}
                onToggle={() => handleFruitChange('wet')}
                label="Wet Fruit"
              />
              <CheckboxComponent
                checked={fruitChecks.dry}
                onToggle={() => handleFruitChange('dry')}
                label="Dry Fruit"
              />
            </View>

            {/* Water Amount  */}
            <View style={styles.filterProperties}>
              <Text style={styles.filterSubHeadingText}>Water Amount</Text>
              <CheckboxComponent
                checked={waterChecks.less}
                onToggle={() => handleWaterChange('less')}
                label="Less"
              />
              <CheckboxComponent
                checked={waterChecks.moderate}
                onToggle={() => handleWaterChange('moderate')}
                label="Moderate"
              />
              <CheckboxComponent
                checked={waterChecks.more}
                onToggle={() => handleWaterChange('more')}
                label="More"
              />
            </View>

            {/* Other Properties */}
            <View style={styles.filterProperties}>
              <Text style={styles.filterSubHeadingText}>Other Properties</Text>
              <CheckboxComponent
                checked={otherChecks.native}
                onToggle={() => handleOtherChange('native')}
                label="California Native"
              />
              <CheckboxComponent
                checked={otherChecks.evergreen}
                onToggle={() => handleOtherChange('evergreen')}
                label="Evergreen"
              />
              <CheckboxComponent
                checked={otherChecks.powerline}
                onToggle={() => handleOtherChange('powerline')}
                label="Powerline Friendly"
              />

              <CheckboxComponent
                checked={otherChecks.lowroot}
                onToggle={() => handleOtherChange('lowroot')}
                label="Low root damage"
              />
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
