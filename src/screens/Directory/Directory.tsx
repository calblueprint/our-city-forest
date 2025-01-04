import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackArrow, CallBig } from '@/icons';
import { ContactStackParamList } from '@/types/navigation';
import { styles } from './styles';

type DirectoryScreenProps = NativeStackScreenProps<
  ContactStackParamList,
  'Directory'
>;

export function DirectoryScreen({ navigation }: DirectoryScreenProps) {
  const handleGoBack = () => {
    navigation.navigate('Contact');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <BackArrow style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <CallBig style={styles.callIcon} />
        <Text style={styles.headerText}>Directory</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.detailsContainer}>
          <Text style={styles.heading}>Nursery</Text>
          <Text style={styles.subheading}>For inventory and availability</Text>
          <Text style={styles.lightText}>408-123-2345 Ext: 123</Text>
          <Text style={styles.lightText}>treenursery@ourcityforest.org</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.heading}>Planting</Text>
          <Text style={styles.subheading}>
            For delivery and planting status{' '}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.darkText}>San Jose</Text>
          <Text style={styles.lightText}>408-123-2345 Ext: 123</Text>
          <Text style={styles.lightText}>treenursery@ourcityforest.org </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.darkText}>
            Campbell, Morgan Hill, Saratoga, Gilroy
          </Text>
          <Text style={styles.lightText}>408-123-2345 Ext: 123</Text>
          <Text style={styles.lightText}>treenursery@ourcityforest.org </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.heading}>Tree Care</Text>
          <Text style={styles.subheading}>
            Inquiries of already-planted trees
          </Text>
          <Text style={styles.lightText}>408-123-2345 Ext: 123</Text>
          <Text style={styles.lightText}>treenursery@ourcityforest.org </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.heading}>Lawn Busters</Text>
          <Text style={styles.subheading}>Lawn conversions</Text>
          <Text style={styles.lightText}>408-123-2345 Ext: 123</Text>
          <Text style={styles.lightText}>treenursery@ourcityforest.org </Text>
        </View>
      </View>
    </ScrollView>
  );
}
