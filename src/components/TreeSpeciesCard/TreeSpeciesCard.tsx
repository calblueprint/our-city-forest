import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Bookmark } from '@/icons';
import { styles } from './styles';

export type TreeSpeciesCardItem = {
  name: string;
  imageURL: string;
  stockCount: number;
  maxHeight: string;
  treeShape: string;
  litterType: string;
  waterUse: string;
  isCaliforniaNative: boolean;
  isEvergreen: boolean;
  isPowerlineFriendly: boolean;
  rootDamagePotential: string;
};

type TreeSpeciesCardProps = {
  item: TreeSpeciesCardItem;
  onPress: (speciesName: string) => void;
  onBookmarkPress: (item: TreeSpeciesCardItem) => void;
  variant?: 'default' | 'fullWidth';
};

export const TreeSpeciesCard: React.FC<TreeSpeciesCardProps> = ({
  item,
  onPress,
  onBookmarkPress,
  variant = 'default',
}) => {
  const cardStyle = variant === 'fullWidth' 
  ? [styles.speciesCardContainer, styles.speciesCardFullContainer] 
  : styles.speciesCardContainer;

  return (
    <TouchableOpacity
      onPress={() => onPress(item.name)}
      style={cardStyle}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageURL }} style={styles.speciesImage} />
        <View style={styles.overlaySvg}>
          <TouchableOpacity onPress={() => onBookmarkPress(item)}>
            <Bookmark width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.speciesName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.speciesStock}>{item.stockCount} in stock</Text>
    </TouchableOpacity>
  );
};
