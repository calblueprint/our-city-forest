import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BarChart } from '@/components/BarChart/BarChart';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import { HistoryButton } from '@/components/HistoryButton/HistoryButton';
import { ArrowLeft, ChevronLeft, ChevronRight, Search } from '@/icons';
import { getAllTreeHistory } from '@/supabase/queries/tree_history';
import { getAllTreeSpecies } from '@/supabase/queries/tree_species';
import {
  TreeHistoryRecord,
  TreeHistoryRecordSource,
} from '@/types/tree_history_record';
import { TreeSpecies } from '@/types/tree_species';
import { styles } from './styles';

type ButtonType = 'Total' | 'Healthy' | 'Diseased' | 'Dead';

type MonthlyData = {
  month: number;
  totalCount: number;
  date: string;
  initial: string;
  fullMonth: string;
  healthyCount: number;
  diseasedCount: number;
  deadCount: number;
};

type SourceOption = TreeHistoryRecordSource | 'All Sources';

export const HistoryScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allSpecies, setAllSpecies] = useState<TreeSpecies[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedButton, setSelectedButton] = useState<ButtonType>('Total');
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  const [historyRecords, setHistoryRecords] = useState<TreeHistoryRecord[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<TreeSpecies | null>(
    null,
  );
  const sourceOptions: SourceOption[] = [
    'All Sources',
    ...Object.values(TreeHistoryRecordSource),
  ];
  const [selectedSource, setSelectedSource] =
    useState<SourceOption>('All Sources');
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Calculate available years from history records
  const availableYears = React.useMemo(() => {
    if (historyRecords.length === 0 || !selectedSpecies) return [];

    const years = historyRecords
      .filter(record => record.species_name === selectedSpecies.name)
      .map(record => new Date(record.record_date).getFullYear())
      .filter((year, index, array) => array.indexOf(year) === index)
      .sort((a, b) => a - b);

    return years;
  }, [historyRecords, selectedSpecies]);

  const earliestYear =
    availableYears.length > 0 ? Math.min(...availableYears) : currentYear;

  // Functions to handle year navigation
  const handlePreviousYear = () => {
    if (selectedYear > earliestYear) {
      setSelectedYear(selectedYear - 1);
      setSelectedBarIndex(null); // Reset bar selection when year changes
    }
  };

  const handleNextYear = () => {
    if (selectedYear < currentYear) {
      setSelectedYear(selectedYear + 1);
      setSelectedBarIndex(null); // Reset bar selection when year changes
    }
  };

  useEffect(() => {
    const fetchTreeHistory = async () => {
      const records = await getAllTreeHistory();
      setHistoryRecords(records);
    };
    fetchTreeHistory();
  }, []);

  useEffect(() => {
    const fetchSpecies = async () => {
      const species = await getAllTreeSpecies();
      setAllSpecies(species);
    };
    fetchSpecies();
  }, []);

  const filteredSpecies = allSpecies.filter(species =>
    species.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  // Process history records into monthly data
  useEffect(() => {
    if (historyRecords.length === 0) return;

    // Filter records by species, year, and source
    const filteredRecords = historyRecords.filter(record => {
      const recordDate = new Date(record.record_date);
      const recordYear = recordDate.getFullYear();

      return (
        selectedSpecies &&
        record.species_name === selectedSpecies.name &&
        recordYear === selectedYear &&
        (selectedSource === 'All Sources' || record.source === selectedSource)
      );
    });

    const monthlyStats = Array.from({ length: 12 }, (_, monthIndex) => {
      // Get all records for this month
      const monthRecords = filteredRecords.filter(record => {
        const recordDate = new Date(record.record_date);
        return recordDate.getMonth() === monthIndex;
      });

      // Calculate totals for the month
      const healthyCount = monthRecords.reduce(
        (sum, record) => sum + record.healthy_count,
        0,
      );
      const diseasedCount = monthRecords.reduce(
        (sum, record) => sum + record.diseased_count,
        0,
      );
      const deadCount = monthRecords.reduce(
        (sum, record) => sum + record.dead_count,
        0,
      );
      const totalCount = healthyCount + diseasedCount + deadCount;

      // Get month info
      const monthDate = new Date(selectedYear, monthIndex);
      const monthAbbrev = monthDate.toLocaleString('default', {
        month: 'short',
      });
      const fullMonth = monthDate.toLocaleString('default', {
        month: 'long',
      });
      const initial = monthAbbrev.charAt(0);

      return {
        month: monthIndex + 1,
        totalCount,
        date: monthAbbrev,
        initial,
        fullMonth,
        healthyCount,
        diseasedCount,
        deadCount,
      };
    });

    setMonthlyData(monthlyStats);
  }, [historyRecords, selectedSpecies, selectedSource, selectedYear]);

  // Handle bar selection in BarChart
  const handleBarSelect = (index: number | null) => {
    setSelectedBarIndex(index);
  };

  // Handle button type selection
  const handleButtonSelect = (type: ButtonType) => {
    setSelectedButton(type);
  };

  // Get count value based on selected button type and bar
  const getCountValue = (type: ButtonType): number | null => {
    if (selectedBarIndex === null || monthlyData.length === 0) return null;

    const selectedMonth = monthlyData[selectedBarIndex];

    switch (type) {
      case 'Total':
        return (
          selectedMonth.healthyCount +
          selectedMonth.diseasedCount +
          selectedMonth.deadCount
        );
      case 'Healthy':
        return selectedMonth.healthyCount;
      case 'Diseased':
        return selectedMonth.diseasedCount;
      case 'Dead':
        return selectedMonth.deadCount;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tree Species History</Text>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => setIsModalVisible(true)}
        >
          <Search />
          <Text
            style={[
              styles.searchBarText,
              !selectedSpecies && styles.searchBarPlaceholder,
            ]}
          >
            {selectedSpecies?.name || 'Find a species...'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Tree Species History</Text>
              <View style={styles.modalSearchContainer}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.backButton}
                >
                  <ArrowLeft />
                </TouchableOpacity>
                <View style={styles.modalSearchBar}>
                  <Search />
                  <TextInput
                    style={styles.searchBarText}
                    placeholder="Find a species..."
                    autoFocus
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              </View>
            </View>

            <FlatList
              data={filteredSpecies}
              keyExtractor={item => item.name}
              style={styles.speciesList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text style={styles.emptyListText}>No species found.</Text>
              }
              ItemSeparatorComponent={() => (
                <View style={styles.listItemSeparator}></View>
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedSpecies(item);
                    setIsModalVisible(false);
                    setSearchQuery('');
                  }}
                  style={styles.listItem}
                >
                  <Text style={styles.listItemName}>{item.name}</Text>
                  <Text style={styles.listItemScientificName}>
                    {item.scientific_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>

      {selectedSpecies && (
        <View style={styles.contentContainer}>
          {/* Species Information Display */}
          <View style={styles.speciesHeader}>
            <View style={styles.speciesData}>
              <Text
                style={styles.speciesName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {selectedSpecies.name}
              </Text>
              <Text
                style={styles.scientificName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {selectedSpecies.scientific_name}
              </Text>
            </View>

            <View style={styles.yearAndSource}>
              <View style={styles.yearContainer}>
                <TouchableOpacity
                  style={[
                    styles.chevronButton,
                    selectedYear <= earliestYear &&
                      styles.chevronButtonDisabled,
                  ]}
                  onPress={
                    selectedYear > earliestYear ? handlePreviousYear : undefined
                  }
                  disabled={selectedYear <= earliestYear}
                >
                  <ChevronLeft />
                </TouchableOpacity>
                <Text style={styles.yearText}>{selectedYear}</Text>
                <TouchableOpacity
                  style={[
                    styles.chevronButton,
                    selectedYear >= currentYear && styles.chevronButtonDisabled,
                  ]}
                  onPress={
                    selectedYear < currentYear ? handleNextYear : undefined
                  }
                  disabled={selectedYear >= currentYear}
                >
                  <ChevronRight />
                </TouchableOpacity>
              </View>
              <Dropdown
                options={sourceOptions}
                value={selectedSource}
                onChange={value => setSelectedSource(value)}
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
              />
            </View>
          </View>

          <BarChart
            selectedButton={selectedButton}
            data={monthlyData}
            onBarSelect={handleBarSelect}
            selectedBarIndex={selectedBarIndex}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleButtonSelect('Total')}>
              <HistoryButton
                label={'Total'}
                value={getCountValue('Total')}
                selected={selectedButton === 'Total'}
                onPress={() => handleButtonSelect('Total')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleButtonSelect('Healthy')}>
              <HistoryButton
                label={'Healthy'}
                value={getCountValue('Healthy')}
                selected={selectedButton === 'Healthy'}
                onPress={() => handleButtonSelect('Healthy')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleButtonSelect('Diseased')}>
              <HistoryButton
                label={'Diseased'}
                value={getCountValue('Diseased')}
                selected={selectedButton === 'Diseased'}
                onPress={() => handleButtonSelect('Diseased')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleButtonSelect('Dead')}>
              <HistoryButton
                label={'Dead'}
                value={getCountValue('Dead')}
                selected={selectedButton === 'Dead'}
                onPress={() => handleButtonSelect('Dead')}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Year Selector */}
    </SafeAreaView>
  );
};
