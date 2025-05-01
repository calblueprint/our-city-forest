import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LogOutButton } from '@/components/LogOutButton/LogOutButton';
import { useAuth } from '@/context/AuthContext';
import {
  ArrowRight,
  Call,
  Facebook,
  Instagram,
  Location,
  LogoSmall,
  TikTok,
  Website,
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
  const { isAuthenticated, login, userInfo } = useAuth();

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
      <View style={styles.logo}>
        <LogoSmall />
      </View>

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
          icon={<TikTok />}
          onPress={() => openLink('https://www.tiktok.com/@ourcityforest')}
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

      <View style={styles.authContainer}>
        {isAuthenticated ? (
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>{userInfo?.email}</Text>
            <LogOutButton />
          </View>
        ) : (
          <TouchableOpacity onPress={login} style={styles.logInButton}>
            <Text style={styles.buttonText}>Log in as admin</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
