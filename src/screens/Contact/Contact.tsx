import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LogInButton } from '@/components/LogInButton/LogInButton';
import { LogOutButton } from '@/components/LogOutButton/LogOutButton';
import { useAuth } from '@/context/AuthContext';
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

type SocialButtonProps = {
  icon: React.ReactNode;
  onPress: () => void;
};

type ContactButtonProps = {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
};

const SocialButton: React.FC<SocialButtonProps> = ({ icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.socialButtonContainer}>
    <View style={styles.socialButton}>{icon}</View>
  </TouchableOpacity>
);

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

export const ContactScreen: React.FC<ContactScreenProps> = ({ navigation }) => {
  const { isAuthenticated } = useAuth();

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
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imageContainer}
        source={require('assets/ocf-logo-small.png')}
      />

      <Text style={styles.contactHeader}>Contact Us</Text>

      <View style={styles.socialContainer}>
        <SocialButton
          icon={<Instagram />}
          onPress={() => openLink('https://www.instagram.com/ourcityforest')}
        />

        <SocialButton
          icon={<Facebook />}
          onPress={() => openLink('https://www.facebook.com/OurCityForest')}
        />

        <SocialButton
          icon={<Youtube />}
          onPress={() => openLink('https://www.youtube.com/@OurCityForest_')}
        />

        <SocialButton
          icon={<X />}
          onPress={() => openLink('https://twitter.com/OurCityForest')}
        />
      </View>

      <View style={styles.divider} />
      <ContactButton
        icon={<Call />}
        text="Directory"
        onPress={() => navigation.navigate('Directory')}
      />
      <View style={styles.divider} />
      <ContactButton
        icon={<Website />}
        text="Website"
        onPress={() => openLink('https://www.ourcityforest.org/')}
      />
      <View style={styles.divider} />
      <ContactButton
        icon={<Location />}
        text="Visit Us"
        onPress={openLocation}
      />
      <View style={styles.divider} />

      <View style={styles.logOutContainer}>
        {isAuthenticated ? (
          <LogOutButton />
        ) : (
          // <View style={styles.adminContainer}>
          //   <Text style={styles.adminText}>Are you an admin? </Text>
          //   <LogInButton />
          // </View>

          <TouchableOpacity style={styles.logOutButton}> 
            <Text style={styles.buttonText}> 
              Login as admin
            </Text>
          </TouchableOpacity>

        )}
      </View>
    </SafeAreaView>
  );
};
