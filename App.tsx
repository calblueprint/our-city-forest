import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { DefaultTheme } from '@react-navigation/native';
import AppNavigator from '@/navigation/AppNavigator';
import colors from '@/styles/colors';
import {AuthContextProvider} from '@/context/AuthContext';

DefaultTheme.colors.background = colors.white;

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const defaultFontFamily = 'DMSans_400Regular';
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = { fontFamily: defaultFontFamily };

  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  );
}
