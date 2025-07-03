import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Bookmark } from '@/icons';
import { styles } from './styles';

export type ShrubSpeciesCardItem = {
  name: string;
  imageURL: string;
  availableCount: number;
  totalCount: number;
};

type Props = {
  item: ShrubSpeciesCardItem;
  isAuthenticated: boolean;
  onPress: () => void;
  onBookmarkPress: () => void;
  variant?: 'default' | 'full';
};

export const ShrubSpeciesCard: React.FC<Props> = ({
  item,
  isAuthenticated,
  onPress,
  onBookmarkPress,
  variant = 'default',
}) => {
  return (
    <TouchableOpacity
      style={
        variant === 'default' ? styles.speciesCard : styles.speciesCardFull
      }
      onPress={() => onPress()}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageURL }} style={styles.speciesImage} />
        <View style={styles.bookmarkButton}>
          <TouchableOpacity onPress={() => onBookmarkPress()}>
            <Bookmark />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.speciesName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.speciesStock}>
        {isAuthenticated
          ? `${item.totalCount} total`
          : `${item.availableCount} in stock`}
      </Text>
    </TouchableOpacity>
  );
};
