import React from 'react';
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import ArrowRight from '../svg/arrow-right.svg';
import Call from '../svg/call.svg';
import Location from '../svg/location.svg';
import OcfLogo from '../svg/ocf-logo.svg';
import Website from '../svg/website.svg';
import { styles } from './styles';

type ContactProps = NativeStackScreenProps<RootStackParamList, 'About'>;

export default function Contact({ navigation }: ContactProps) {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  const openLocation = () => {
    const locationUrl =
      'https://www.google.com/maps/place/Our+City+Forest/@37.590136,-122.3968825,10z/data=!4m20!...';
    Linking.openURL(locationUrl).catch(err =>
      console.error('Failed to open location:', err),
    );
  };

  return (
    <ScrollView style={styles.backgroundContainer}>
      <View>
        <View>
          <OcfLogo style={styles.ocfLogo} />
          <Text style={styles.Heading4Contact}>Contact Us</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Directory')}>
          <View style={styles.linksButton}>
            <Call style={styles.contactIcons} />
            <Text style={styles.contactboldText}>Directory</Text>
            <ArrowRight style={styles.contactIcons} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openLink('https://www.ourcityforest.org/')}
        >
          <View style={styles.linksButton}>
            <Website style={styles.contactIcons} />
            <Text style={styles.contactboldText}>Website</Text>
            <ArrowRight style={styles.contactIcons} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={openLocation}>
          <View style={styles.linksButton}>
            <Location style={styles.contactIcons} />
            <Text style={styles.contactboldText}>Visit Us</Text>
            <ArrowRight style={styles.contactIcons} />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}