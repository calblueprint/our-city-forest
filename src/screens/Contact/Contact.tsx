import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignOutButton } from '@/components/SignOutButton/SignOutButton';
import {
  ArrowRight,
  Call,
  Facebook,
  Instagram,
  Location,
  Website,
  X,
  Youtube,
} from '@/icons';
import { ContactStackParamList } from '@/types/navigation';
import { styles } from './styles';

type ContactScreenProps = NativeStackScreenProps<
  ContactStackParamList,
  'Contact'
>;

type ContactButtonProps = {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
};

type SocialButtonProps = {
  icon: React.ReactNode;
  onPress: () => void;
};

const ContactButton: React.FC<ContactButtonProps> = ({
  icon,
  text,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.linksButton}>
    <View style={styles.linksButtonContent}>
      <View style={styles.contactIcons}>{icon}</View>
      <Text style={styles.contactText}>{text}</Text>
      <ArrowRight style={styles.contactIcons} />
    </View>
  </TouchableOpacity>
);

const SocialButton: React.FC<SocialButtonProps> = ({ icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.socialButtonContainer}>
    <View style={styles.socialButton}>{icon}</View>
  </TouchableOpacity>
);

export const ContactScreen: React.FC<ContactScreenProps> = ({ navigation }) => {
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
    const locationUrl = 'https://maps.app.goo.gl/rDpfbsyELgx8zgnm8';
    openLink(locationUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('assets/OCF.png')} />
        <Text style={styles.contactHeading}>Contact Us</Text>
      </View>

      <View style={styles.socialContainer}>
        <SocialButton
          icon={<Instagram style={styles.socialIcons} />}
          onPress={() => openLink('https://www.instagram.com/ourcityforest')}
        />

        <SocialButton
          icon={<Facebook style={styles.socialIcons} />}
          onPress={() => openLink('https://www.facebook.com/OurCityForest')}
        />

        <SocialButton
          icon={<Youtube style={styles.socialIcons} />}
          onPress={() => openLink('https://www.youtube.com/@OurCityForest_')}
        />

        <SocialButton
          icon={<X style={styles.socialIcons} />}
          onPress={() => openLink('https://twitter.com/OurCityForest')}
        />
      </View>

      <ContactButton
        icon={<Call />}
        text="Directory"
        onPress={() => navigation.navigate('Directory')}
      />
      <ContactButton
        icon={<Website />}
        text="Website"
        onPress={() => openLink('https://www.ourcityforest.org/')}
      />
      <ContactButton
        icon={<Location />}
        text="Visit Us"
        onPress={openLocation}
      />

      <View style={styles.signOutContainer}>
        <SignOutButton />
      </View>
    </View>
  );
};
