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
import { styles } from './styles';

type ShrubSearchFilterProps = {
  isModalVisible: boolean;
  onClose: () => void;
  activeFilters: {
    bloom: string[];
    sun_exposure: string[];
    water_use: string[];
    growth_rate: string[];
    other: string[];
  };
  onActiveFilterChange: React.Dispatch<
    React.SetStateAction<{
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
  const [activeBloomFilters, setActiveBloomFilters] = useState({
    winter: activeFilters.bloom.includes('winter'),
    spring: activeFilters.bloom.includes('spring'),
    summer: activeFilters.bloom.includes('summer'),
    fall: activeFilters.bloom.includes('fall'),
  });

  const [activeSunFilters, setActiveSunFilters] = useState({
    fullSun: activeFilters.sun_exposure.includes('full sun'),
    partialShade: activeFilters.sun_exposure.includes('partial shade'),
    shade: activeFilters.sun_exposure.includes('shade'),
  });

  const [activeWaterFilters, setActiveWaterFilters] = useState({
    low: activeFilters.water_use.includes('low'),
    moderate: activeFilters.water_use.includes('moderate'),
    high: activeFilters.water_use.includes('high'),
  });

  const [activeGrowthFilters, setActiveGrowthFilters] = useState({
    slow: activeFilters.water_use.includes('slow'),
    moderate: activeFilters.water_use.includes('moderate'),
    fast: activeFilters.water_use.includes('fast'),
  });

  const [activeOtherFilters, setActiveOtherFilters] = useState({
    californiaNative: activeFilters.other.includes('californiaNative'),
    lowGrowing: activeFilters.other.includes('lowGrowing'),
  });

  const anyFiltersActive = () => {
    return (
      Object.values(activeSunFilters).some(Boolean) ||
      Object.values(activeBloomFilters).some(Boolean) ||
      Object.values(activeWaterFilters).some(Boolean) ||
      Object.values(activeGrowthFilters).some(Boolean) ||
      Object.values(activeOtherFilters).some(Boolean)
    );
  };

  useEffect(() => {
    onActiveFilterChange({
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
    activeBloomFilters,
    activeSunFilters,
    activeWaterFilters,
    activeOtherFilters,
    activeGrowthFilters,
    onActiveFilterChange,
  ]);

  useEffect(() => {}, [
    activeBloomFilters,
    activeSunFilters,
    activeWaterFilters,
    activeOtherFilters,
    activeGrowthFilters,
  ]);

  const toggleBloomFilter = (key: keyof typeof activeBloomFilters) => {
    setActiveBloomFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleSunFilter = (key: keyof typeof activeSunFilters) => {
    setActiveSunFilters(prev => ({
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

  const toggleGrowthFilter = (key: keyof typeof activeGrowthFilters) => {
    setActiveGrowthFilters(prev => ({
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
    setActiveBloomFilters({
      winter: false,
      spring: false,
      summer: false,
      fall: false,
    });
    setActiveSunFilters({
      fullSun: false,
      partialShade: false,
      shade: false,
    });
    setActiveWaterFilters({
      low: false,
      moderate: false,
      high: false,
    });
    setActiveGrowthFilters({
      slow: false,
      moderate: false,
      fast: false,
    });
    setActiveOtherFilters({
      californiaNative: false,
      lowGrowing: false,
    });
    onActiveFilterChange({
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
            <Text style={styles.headerText}>Filter Shrubs</Text>
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
            {/* Growth Rate  */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Growth Rate</Text>
              <View style={styles.checkboxGroup}>
                <Checkbox
                  label="Slow"
                  isChecked={activeGrowthFilters.slow}
                  onChange={() => toggleGrowthFilter('slow')}
                />
                <Checkbox
                  label="Moderate"
                  isChecked={activeGrowthFilters.moderate}
                  onChange={() => toggleGrowthFilter('moderate')}
                />
                <Checkbox
                  label="Fast"
                  isChecked={activeGrowthFilters.fast}
                  onChange={() => toggleGrowthFilter('fast')}
                />
              </View>
            </View>

            {/* Sun Exposure  */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Sun Exposure</Text>
              <View style={styles.checkboxGroup}>
                <Checkbox
                  label="Full Sun"
                  isChecked={activeSunFilters.fullSun}
                  onChange={() => toggleSunFilter('fullSun')}
                />
                <Checkbox
                  label="Partial Shade"
                  isChecked={activeSunFilters.partialShade}
                  onChange={() => toggleSunFilter('partialShade')}
                />
                <Checkbox
                  label="Shade"
                  isChecked={activeSunFilters.shade}
                  onChange={() => toggleSunFilter('shade')}
                />
              </View>
            </View>

            {/* Bloom  */}
            <View style={styles.filterProperties}>
              <Text style={styles.subheaderText}>Bloom Season</Text>
              <View style={styles.checkboxGroup}>
                <Checkbox
                  label="Spring"
                  isChecked={activeBloomFilters.spring}
                  onChange={() => toggleBloomFilter('spring')}
                />
                <Checkbox
                  label="Summer"
                  isChecked={activeBloomFilters.summer}
                  onChange={() => toggleBloomFilter('summer')}
                />
                <Checkbox
                  label="Fall"
                  isChecked={activeBloomFilters.fall}
                  onChange={() => toggleBloomFilter('fall')}
                />
                <Checkbox
                  label="Winter"
                  isChecked={activeBloomFilters.winter}
                  onChange={() => toggleBloomFilter('winter')}
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
                  label="Low growing"
                  isChecked={activeOtherFilters.lowGrowing}
                  onChange={() => toggleOtherFilter('lowGrowing')}
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
