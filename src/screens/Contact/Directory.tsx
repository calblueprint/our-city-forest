import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackArrow from '@/icons/BackArrow';
import Call from '@/icons/Call';
import { RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

type DirectoryProps = NativeStackScreenProps<RootStackParamList, 'Directory'>;

export default function Directory({ navigation }: DirectoryProps) {
  const handleGoBack = () => {
    navigation.navigate('Contact');
  };

  return (
    <ScrollView style={styles.directoryContainer}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <BackArrow style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.directoryHeader}>
        <Call style={styles.callIcon} />
        <Text style={styles.contactHeading}>Directory</Text>
      </View>

      <View style={styles.directoryContent}>
        <View style={styles.directoryDetailsContainer}>
          <Text style={styles.directoryHeading}>Nursery</Text>
          <Text style={styles.directorySubHeading}>
            For inventory and availability
          </Text>
          <Text style={styles.directoryTextLight}>408-123-2345 Ext: 123</Text>
          <Text style={styles.directoryTextLight}>
            treenursery@ourcityforest.org
          </Text>
        </View>

        <View style={styles.directoryDetailsContainer}>
          <Text style={styles.directoryHeading}>Planting</Text>
          <Text style={styles.directorySubHeading}>
            For delivery and planting status{' '}
          </Text>
        </View>

        <View style={styles.directoryDetailsContainer}>
          <Text style={styles.directoryTextBold}>San Jose</Text>
          <Text style={styles.directoryTextLight}>408-123-2345 Ext: 123</Text>
          <Text style={styles.directoryTextLight}>
            treenursery@ourcityforest.org{' '}
          </Text>
        </View>

        <View style={styles.directoryDetailsContainer}>
          <Text style={styles.directoryTextBold}>
            Campbell, Morgan Hill, Saratoga, Gilroy
          </Text>
          <Text style={styles.directoryTextLight}>408-123-2345 Ext: 123</Text>
          <Text style={styles.directoryTextLight}>
            treenursery@ourcityforest.org{' '}
          </Text>
        </View>

        <View style={styles.directoryDetailsContainer}>
          <Text style={styles.directoryHeading}>Tree Care</Text>
          <Text style={styles.directorySubHeading}>
            Inquiries of already-planted trees
          </Text>
          <Text style={styles.directoryTextLight}>408-123-2345 Ext: 123</Text>
          <Text style={styles.directoryTextLight}>
            treenursery@ourcityforest.org{' '}
          </Text>
        </View>

        <View style={styles.directoryDetailsContainer}>
          <Text style={styles.directoryHeading}>Lawn Busters</Text>
          <Text style={styles.directorySubHeading}>Lawn conversions</Text>
          <Text style={styles.directoryTextLight}>408-123-2345 Ext: 123</Text>
          <Text style={styles.directoryTextLight}>
            treenursery@ourcityforest.org{' '}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
