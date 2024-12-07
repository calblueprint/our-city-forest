import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackArrow from '@/icons/BackArrow';
import Call from '@/icons/Call';
import { RootStackParamList } from '@/types/navigation';
import { styles } from './styles';

type DirectoryProps = NativeStackScreenProps<RootStackParamList, 'Directory'>;

export default function Directory({ navigation }: DirectoryProps) {
  return (
    <View style={styles.backgroundContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <BackArrow style={styles.backIcon} />
      </TouchableOpacity>
      <View>
        <View></View>
      </View>
    </View>
  );
}
