import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import { TreeSpeciesShape } from '@/types/tree_species';
import { styles } from './styles';

type SearchFilterProps = {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: {
    height: string[];
    shape: string;
    litter: string[];
    water: string[];
    other: string[];
  };
  onActiveFilterChange: React.Dispatch<
    React.SetStateAction<{
      height: string[];
      shape: string;
      litter: string[];
      water: string[];
      other: string[];
    }>
  >;
};

export const SearchFilter: React.FC<SearchFilterProps> = ({
  isOpen,
  onClose,
  activeFilters,
  onActiveFilterChange,
}) => {
  // Individual filter states
  const [activeHeightFilters, setActiveHeightFilters] = useState({
    small: activeFilters.height.includes('small'),
    medium: activeFilters.height.includes('medium'),
    large: activeFilters.height.includes('large'),
  });

  const [activeLitterFilters, setActiveLitterFilters] = useState({
    wet: activeFilters.litter.includes('wet'),
    dry: activeFilters.litter.includes('dry'),
  });

  const [activeWaterFilters, setActiveWaterFilters] = useState({
    less: activeFilters.water.includes('less'),
    moderate: activeFilters.water.includes('moderate'),
    more: activeFilters.water.includes('more'),
  });

  const [activeOtherFilters, setActiveOtherFilters] = useState({
    native: activeFilters.other.includes('native'),
    evergreen: activeFilters.other.includes('evergreen'),
    powerline: activeFilters.other.includes('powerline'),
    lowroot: activeFilters.other.includes('lowroot'),
  });

  const [selectedTreeShape, setSelectedTreeShape] = useState<string>(
    activeFilters.shape,
  );

  useEffect(() => {
    onActiveFilterChange({
      height: Object.keys(activeHeightFilters).filter(
        key => activeHeightFilters[key as keyof typeof activeHeightFilters],
      ) as string[],
      shape: selectedTreeShape,
      litter: Object.keys(activeLitterFilters).filter(
        key => activeLitterFilters[key as keyof typeof activeLitterFilters],
      ) as string[],
      water: Object.keys(activeWaterFilters).filter(
        key => activeWaterFilters[key as keyof typeof activeWaterFilters],
      ) as string[],
      other: Object.keys(activeOtherFilters).filter(
        key => activeOtherFilters[key as keyof typeof activeOtherFilters],
      ) as string[],
    });
  }, [
    activeHeightFilters,
    selectedTreeShape,
    activeLitterFilters,
    activeWaterFilters,
    activeOtherFilters,
    onActiveFilterChange,
  ]);

  useEffect(() => {}, [
    activeHeightFilters,
    activeLitterFilters,
    activeWaterFilters,
    activeOtherFilters,
    selectedTreeShape,
  ]);

  const toggleHeightFilter = (key: keyof typeof activeHeightFilters) => {
    setActiveHeightFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleLitterFilter = (key: keyof typeof activeLitterFilters) => {
    setActiveLitterFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleWaterFilter = (key: keyof typeof activeWaterFilters) => {
    setActiveWaterFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleOtherFilter = (key: keyof typeof activeOtherFilters) => {
    setActiveOtherFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetFilters = () => {
    setActiveHeightFilters({
      small: false,
      medium: false,
      large: false,
    });
    setActiveLitterFilters({
      wet: false,
      dry: false,
    });
    setActiveWaterFilters({
      less: false,
      moderate: false,
      more: false,
    });
    setActiveOtherFilters({
      native: false,
      evergreen: false,
      powerline: false,
      lowroot: false,
    });
    setSelectedTreeShape('');
    onActiveFilterChange({
      height: [],
      shape: '',
      litter: [],
      water: [],
      other: [],
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
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
                    isChecked={activeHeightFilters.small}
                    onChange={() => toggleHeightFilter('small')}
                  />
                  <Text style={styles.checkboxLabel}>Small (&lt; 40')</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={activeHeightFilters.medium}
                    onChange={() => toggleHeightFilter('medium')}
                  />
                  <Text style={styles.checkboxLabel}>Medium (40 - 60')</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={activeHeightFilters.large}
                    onChange={() => toggleHeightFilter('large')}
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
                value={selectedTreeShape}
                onChange={setSelectedTreeShape}
              />
            </View>

            {/* Litter Type */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Litter Type</Text>
              <View style={styles.checkboxGroup}>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={activeLitterFilters.wet}
                    onChange={() => toggleLitterFilter('wet')}
                  />
                  <Text style={styles.checkboxLabel}>Wet Fruit</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={activeLitterFilters.dry}
                    onChange={() => toggleLitterFilter('dry')}
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
                    isChecked={activeWaterFilters.less}
                    onChange={() => toggleWaterFilter('less')}
                  />
                  <Text style={styles.checkboxLabel}>Less</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={activeWaterFilters.moderate}
                    onChange={() => toggleWaterFilter('moderate')}
                  />
                  <Text style={styles.checkboxLabel}>Moderate</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={activeWaterFilters.more}
                    onChange={() => toggleWaterFilter('more')}
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
                    isChecked={activeOtherFilters.native}
                    onChange={() => toggleOtherFilter('native')}
                  />
                  <Text style={styles.checkboxLabel}>California native</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={activeOtherFilters.evergreen}
                    onChange={() => toggleOtherFilter('evergreen')}
                  />
                  <Text style={styles.checkboxLabel}>Evergreen</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={activeOtherFilters.powerline}
                    onChange={() => toggleOtherFilter('powerline')}
                  />
                  <Text style={styles.checkboxLabel}>Powerline friendly</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isChecked={activeOtherFilters.lowroot}
                    onChange={() => toggleOtherFilter('lowroot')}
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
