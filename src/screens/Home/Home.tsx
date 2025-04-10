import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/types/navigation';
import { styles } from './styles';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TreeSpeciesSearch')}
      >
        <Text style={styles.buttonText}>Trees</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShrubSpeciesSearch')}
      >
        <Text style={styles.buttonText}>Shrubs</Text>
      </TouchableOpacity>
    </View>
  );
};
