import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { styles } from './styles';

type TreeFilterModalProps = {
  visible: boolean;
  onClose: () => void;
};

// type SelectedHeightFilters = {
//   [key: string]: boolean;
// };

const TreeFilterModal: React.FC<TreeFilterModalProps> = ({
  visible,
  onClose,
}) => {
  // const [selectedHeightFilters, setSelectedHeightFilters] = useState<SelectedHeightFilters>({
  //   small: false,
  //   medium: false,
  //   large: false,
  // });

  // const handleCheckboxChange = (filter: string) => {
  //   setSelectedHeightFilters(prevState => ({
  //     ...prevState,
  //     [filter]: !prevState[filter],
  //   }));
  // };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.filterContainer}>
        <View style={styles.filterContent}>
          <View style={styles.filterHeading}>
            <Text style={styles.filterHeadingText}>Filter</Text>
          </View>

          {/* <View style={styles.checkboxContainer}>
            <View style={styles.checkboxRow}>
              <CheckBox
                value={selectedHeightFilters.small}
                onValueChange={() => handleCheckboxChange('small')}
              />
              <Text style={styles.checkboxLabel}>Small(< 40’) </Text>
            </View>

            <View style={styles.checkboxRow}>
              <CheckBox
                value={selectedHeightFilters.medium}
                onValueChange={() => handleCheckboxChange('medium')}
              />
              <Text style={styles.checkboxLabel}>Medium (40 - 60’)</Text>
            </View>

            <View style={styles.checkboxRow}>
              <CheckBox
                value={selectedHeightFilters.Large}
                onValueChange={() => handleCheckboxChange('large')}
              />
              <Text style={styles.checkboxLabel}>Large(60’ +) </Text>
          </View> */}

          <TouchableOpacity style={styles.completeButton} onPress={onClose}>
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TreeFilterModal;
