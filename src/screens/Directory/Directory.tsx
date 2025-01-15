import React from 'react';
import {
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BackArrow, CallBig } from '@/icons';
import { ContactStackParamList } from '@/types/navigation';
import { styles } from './styles';

type DirectoryScreenProps = NativeStackScreenProps<
  ContactStackParamList,
  'Directory'
>;

export const DirectoryScreen: React.FC<DirectoryScreenProps> = ({
  navigation,
}) => {
  const handlePhonePress = (phone: string, extension?: string) => {
    const formattedPhone = extension
      ? `${phone}${Platform.OS === 'ios' ? ',' : ';'}${extension}`
      : phone;

    Linking.openURL(`tel:${formattedPhone}`);
  };

  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrow style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <CallBig style={styles.callIcon} />
          <Text style={styles.headerText}>Directory</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.detailsContainer}>
            <Text style={styles.heading}>Nursery</Text>
            <Text style={styles.subheading}>
              For inventory and availability
            </Text>
            <TouchableOpacity
              onPress={() => handlePhonePress('4081232345', '123')}
            >
              <Text style={styles.lightText}>408-123-2345 Ext: 123</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEmailPress('treenursery@ourcityforest.org')}
            >
              <Text style={styles.lightText}>
                treenursery@ourcityforest.org
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.heading}>Planting</Text>
            <Text style={styles.subheading}>
              For delivery and planting status{' '}
            </Text>
            <Text style={styles.darkText}>San Jose</Text>
            <TouchableOpacity
              onPress={() => handlePhonePress('4081232345', '123')}
            >
              <Text style={styles.lightText}>408-123-2345 Ext: 123</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEmailPress('treenursery@ourcityforest.org')}
            >
              <Text style={styles.lightText}>
                treenursery@ourcityforest.org
              </Text>
            </TouchableOpacity>
            <Text style={styles.darkText}>
              Campbell, Morgan Hill, Saratoga, Gilroy
            </Text>
            <TouchableOpacity
              onPress={() => handlePhonePress('4081232345', '123')}
            >
              <Text style={styles.lightText}>408-123-2345 Ext: 123</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEmailPress('treenursery@ourcityforest.org')}
            >
              <Text style={styles.lightText}>
                treenursery@ourcityforest.org
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.heading}>Tree Care</Text>
            <Text style={styles.subheading}>
              For inquiries of already-planted trees
            </Text>
            <TouchableOpacity
              onPress={() => handlePhonePress('4081232345', '123')}
            >
              <Text style={styles.lightText}>408-123-2345 Ext: 123</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEmailPress('treenursery@ourcityforest.org')}
            >
              <Text style={styles.lightText}>
                treenursery@ourcityforest.org
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.heading}>Lawn Busters</Text>
            <Text style={styles.subheading}>For lawn conversions</Text>
            <TouchableOpacity
              onPress={() => handlePhonePress('4081232345', '107')}
            >
              <Text style={styles.lightText}>408-123-2345 Ext: 107</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEmailPress('lawnbusters@ourcityforest.org')}
            >
              <Text style={styles.lightText}>
                lawnbusters@ourcityforest.org
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
