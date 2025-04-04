import React, { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import { styles } from './styles';

type ShrubSearchFilterProps = {
  isModalVisible: boolean;
  onClose: () => void;
  activeFilters: {
    max_height: string[];
    bloom: string[];
    sun_exposure: string[];
    water_use: string[];
    growth_rate: string[];
    other: string[];
  };
  onActiveFilterChange: React.Dispatch<
    React.SetStateAction<{
      max_height: string[];
      bloom: string[];
      sun_exposure: string[];
      water_use: string[];
      growth_rate: string[];
      other: string[];
    }>
  >;
};

export const ShrubSearchFilter: React.FC<ShrubSearchFilterProps> = ({
  isModalVisible,
  onClose,
  activeFilters,
  onActiveFilterChange,
}) => {
  // Individual filter states
  const [activeHeightFilters, setActiveHeightFilters] = useState({
    lowGrowing: activeFilters.max_height.includes('low growing'),
    notLowGrowing: activeFilters.max_height.includes('not low growing'),
  });

  const [activeBloomFilters, setActiveBloomFilters] = useState({
    winter: activeFilters.bloom.includes('winter'),
    spring: activeFilters.bloom.includes('spring'),
    summer: activeFilters.bloom.includes('summer'),
    fall: activeFilters.bloom.includes('fall'),
  });

  const [activeSunFilters, setActiveSunFilters] = useState({
    fullSun: activeFilters.sun_exposure.includes('full sun'),
    partialShade: activeFilters.sun_exposure.includes('partial shade'),
    coarseGrained: activeFilters.sun_exposure.includes('coarse-grained'),
  });

  const [activeWaterFilters, setActiveWaterFilters] = useState({
    low: activeFilters.water_use.includes('low'),
    moderate: activeFilters.water_use.includes('moderate'),
    high: activeFilters.water_use.includes('high'),
  });

  const [activeGrowthFilters, setActiveGrowthFilters] = useState({
    low: activeFilters.water_use.includes('slow'),
    moderate: activeFilters.water_use.includes('moderate'),
    high: activeFilters.water_use.includes('fast'),
  });

  const [activeOtherFilters, setActiveOtherFilters] = useState({
    californiaNative: activeFilters.other.includes('californiaNative'),
    evergreen: activeFilters.other.includes('evergreen'),
  });

  const anyFiltersActive = () => {
    return (
      Object.values(activeHeightFilters).some(Boolean) ||
      Object.values(activeSunFilters).some(Boolean) ||
      Object.values(activeBloomFilters).some(Boolean) ||
      Object.values(activeWaterFilters).some(Boolean) ||
      Object.values(activeGrowthFilters).some(Boolean) ||
      Object.values(activeOtherFilters).some(Boolean)
    );
  };

  useEffect(() => {
    onActiveFilterChange({
      max_height: Object.keys(activeHeightFilters).filter(
        key => activeHeightFilters[key as keyof typeof activeHeightFilters],
      ) as string[],
      bloom: Object.keys(activeBloomFilters).filter(
        key => activeBloomFilters[key as keyof typeof activeBloomFilters],
      ) as string[],
      sun_exposure: Object.keys(activeSunFilters).filter(
        key => activeSunFilters[key as keyof typeof activeSunFilters],
      ) as string[],
      water_use: Object.keys(activeWaterFilters).filter(
        key => activeWaterFilters[key as keyof typeof activeWaterFilters],
      ) as string[],
      growth_rate: Object.keys(activeGrowthFilters).filter(
        key => activeGrowthFilters[key as keyof typeof activeGrowthFilters],
      ) as string[],
      other: Object.keys(activeOtherFilters).filter(
        key => activeOtherFilters[key as keyof typeof activeOtherFilters],
      ) as string[],
    });
  }, [
    activeHeightFilters,
    activeBloomFilters,
    activeSunFilters,
    activeWaterFilters,
    activeOtherFilters,
    onActiveFilterChange,
  ]);

  useEffect(() => {}, [
    activeHeightFilters,
    activeBloomFilters,
    activeSunFilters,
    activeWaterFilters,
    activeOtherFilters,
  ]);

  const toggleHeightFilter = (key: keyof typeof activeHeightFilters) => {
    setActiveHeightFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleBloomFilter = (key: keyof typeof activeBloomFilters) => {
    setActiveBloomFilters(prev => ({
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
      lowGrowing: false,
      notLowGrowing: false,
    });
    setActiveBloomFilters({
      winter: false,
      spring: false,
      summer: false,
      fall: false,
    });
    setActiveWaterFilters({
      low: false,
      moderate: false,
      high: false,
    });
    setActiveOtherFilters({
      californiaNative: false,
      evergreen: false,
    });
    onActiveFilterChange({
      max_height: [],
      bloom: [],
      sun_exposure: [],
      water_use: [],
      growth_rate: [],
      other: [],
    });
  };

  return (
    <SafeAreaView>
      <Modal
        visible={isModalVisible}
        onRequestClose={onClose}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.filterContainer}>
          <View style={styles.grabber}></View>
          <View style={styles.filterHeading}>
            <Text style={styles.headerText}>Filter Trees</Text>
            <TouchableOpacity
              style={
                anyFiltersActive()
                  ? styles.resetButtonActive
                  : styles.resetButtonInactive
              }
              onPress={resetFilters}
            >
              <Text
                style={
                  anyFiltersActive()
                    ? styles.resetTextActive
                    : styles.resetTextInactive
                }
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
            {/* Height */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Height</Text>
              <View style={styles.checkboxGroup}>
                <Checkbox
                  label="Low Growing (&lt; 2')"
                  isChecked={activeHeightFilters.lowGrowing}
                  onChange={() => toggleHeightFilter('lowGrowing')}
                />
                <Checkbox
                  label="Not Low Growing (2' +)"
                  isChecked={activeHeightFilters.notLowGrowing}
                  onChange={() => toggleHeightFilter('notLowGrowing')}
                />
              </View>
            </View>

            {/* Water Use  */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Water Use</Text>
              <View style={styles.checkboxGroup}>
                <Checkbox
                  label="Low"
                  isChecked={activeWaterFilters.low}
                  onChange={() => toggleWaterFilter('low')}
                />
                <Checkbox
                  label="Moderate"
                  isChecked={activeWaterFilters.moderate}
                  onChange={() => toggleWaterFilter('moderate')}
                />
                <Checkbox
                  label="High"
                  isChecked={activeWaterFilters.high}
                  onChange={() => toggleWaterFilter('high')}
                />
              </View>
            </View>

            {/* Other Properties */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Other Properties</Text>
              <View style={styles.checkboxGroup}>
                <Checkbox
                  label="California native"
                  isChecked={activeOtherFilters.californiaNative}
                  onChange={() => toggleOtherFilter('californiaNative')}
                />
                <Checkbox
                  label="Evergreen"
                  isChecked={activeOtherFilters.evergreen}
                  onChange={() => toggleOtherFilter('evergreen')}
                />
              </View>
            </View>
          </ScrollView>

          {/* Complete Button */}
          <TouchableOpacity style={styles.completeButton} onPress={onClose}>
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
