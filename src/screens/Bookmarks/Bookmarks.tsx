<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateFolderModal } from '@/components/CreateFolderModal/CreateFolderModal';
import { useBookmarks } from '@/context/BookmarksContext';
import { AddIcon } from '@/icons';
import { BookmarksStackParamList } from '@/types/navigation';
import { styles } from './styles';

type BookmarksScreenProps = NativeStackScreenProps<
  BookmarksStackParamList,
  'BookmarkButton'
>;

type EnhancedFolder = {
  name: string;
  folderImage?: string;
};

export const BookmarksScreen: React.FC<BookmarksScreenProps> = ({
  navigation,
}) => {
  const { folders, addFolder, removeFolder } = useBookmarks();
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [enhancedFolders, setEnhancedFolders] = useState<EnhancedFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadFolderImages();
  }, [folders]);

  const loadFolderImages = async () => {
    setIsLoading(true);
    try {
      const enhanced = await Promise.all(
        folders.map(async folder => {
          const storedData = await AsyncStorage.getItem(folder.name);

          if (storedData) {
            try {
              const parsedData = JSON.parse(storedData);

              if (
                parsedData &&
                typeof parsedData === 'object' &&
                !Array.isArray(parsedData) &&
                parsedData.folderImage
              ) {
                return {
                  ...folder,
                  folderImage: parsedData.folderImage,
                };
              }
            } catch (error) {
              console.error('Error parsing folder data:', error);
            }
          }
          return folder;
        }),
      );

      setEnhancedFolders(enhanced);
    } catch (error) {
      console.error('Error loading folder images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateFolder = (folderName: string) => {
    addFolder(folderName);
    setShowCreateFolderModal(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const renderFolderCard = ({ item }: { item: EnhancedFolder }) => {
    if (item.name === '__create_new__') {
      return (
        <TouchableOpacity
          style={[styles.folderCard, styles.createFolderCard]}
          onPress={() => setShowCreateFolderModal(true)}
        >
          <View style={styles.folderItem}>
            <View style={[styles.imageContainer, styles.createImageContainer]}>
              <AddIcon />
            </View>
            <Text style={styles.folderName}>Create new list</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.folderCard}
        onPress={() => {
          if (!editMode) {
            navigation.navigate('BookmarkDisplay', {
              folderName: item.name,
            });
          }
        }}
      >
        <View style={styles.folderItem}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.folderImage }}
              style={styles.speciesImage}
            />
          </View>
          <Text style={styles.folderName}>{item.name}</Text>

          {editMode && (
            <View style={styles.overlaySvg}>
              <TouchableOpacity
                onPress={() => removeFolder(item.name)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
=======
import React from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

export const BookmarksScreen: React.FC<ContactScreenProps> = ({ navigation }) => {
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
>>>>>>> 10d645f (recognize new icons)
  };

  return (
    <SafeAreaView style={styles.container}>
<<<<<<< HEAD
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>Bookmarked</Text>
        <TouchableOpacity
          onPress={toggleEditMode}
          style={[styles.editButton, editMode ? styles.editButtonActive : null]}
        >
          <Text
            style={[
              styles.editButtonText,
              editMode ? styles.editButtonTextActive : null,
            ]}
          >
            {editMode ? 'Done' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading folders...</Text>
        </View>
      ) : (
        <FlatList
          data={
            editMode
              ? [{ name: '__create_new__' }, ...enhancedFolders]
              : enhancedFolders
          }
          keyExtractor={item => item.name}
          renderItem={renderFolderCard}
          numColumns={2}
          contentContainerStyle={styles.speciesContainer}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {editMode
                ? 'No folders yet. Exit edit mode to create a folder.'
                : 'No folders yet. Create your first folder!'}
            </Text>
          }
        />
      )}

      <CreateFolderModal
        visible={showCreateFolderModal}
        onClose={() => setShowCreateFolderModal(false)}
        onCreate={handleCreateFolder}
      />
=======
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

      <View style={styles.signOutContainer}>
        <SignOutButton />
      </View>
>>>>>>> 10d645f (recognize new icons)
    </SafeAreaView>
  );
};
