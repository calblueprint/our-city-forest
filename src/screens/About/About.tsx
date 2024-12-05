import React from 'react';
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ArrowRight from '@/icons/ArrowRight';
import Call from '@/icons/Call';
import Location from '@/icons/Location';
import OcfLogo from '@/icons/OcfLogo';
import Website from '@/icons/Website';
import { RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

type AboutProps = NativeStackScreenProps<RootStackParamList, 'About'>;

type AboutButtonProps = {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
};

const AboutButton: React.FC<AboutButtonProps> = ({ icon, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.linksButton}>
    <View style={styles.linksButtonContent}>
      {icon}
      <Text style={styles.contactboldText}>{text}</Text>
      <ArrowRight style={styles.contactIcons} />
    </View>
  </TouchableOpacity>
);

export default function Contact({ navigation }: AboutProps) {
  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.warn('Cannot open URL:', url);
      }
    } catch (err) {
      console.error('Error opening URL:', err);
    }
  };

  const openLocation = () => {
    const locationUrl =
      'https://www.google.com/maps/place/Our+City+Forest/@37.590136,-122.3968825,10z/data=!4m20!...';
    openLink(locationUrl);
  };

  console.log('Rendering Contact screen');

  return (
    <ScrollView style={styles.backgroundContainer}>
      <View>
        <View style={styles.headerContainer}>
          <OcfLogo style={styles.ocfLogo} />
          <Text style={styles.Heading4Contact}>Contact Us</Text>
        </View>

        <AboutButton
          icon={<Call style={styles.contactIcons} />}
          text="Directory"
          onPress={() => navigation.navigate('Directory')}
        />
        <AboutButton
          icon={<Website style={styles.contactIcons} />}
          text="Website"
          onPress={() => openLink('https://www.ourcityforest.org/')}
        />
        <AboutButton
          icon={<Location style={styles.contactIcons} />}
          text="Visit Us"
          onPress={openLocation}
        />
      </View>
    </ScrollView>
  );
}
