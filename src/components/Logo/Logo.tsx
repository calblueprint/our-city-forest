import React from 'react';
import { Image } from 'react-native';
import BPLogo from '~/assets/bp-adaptive-icon.png';
import { styles } from './styles';

export function Logo() {
  return <Image source={BPLogo} style={styles.logo} />;
}
