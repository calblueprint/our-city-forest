/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { DefaultTheme } from '@react-navigation/native';
import { AuthContextProvider } from '@/context/AuthContext';
import { AppNavigator } from '@/navigation/AppNavigator';
import { colors } from '@/styles/colors';

DefaultTheme.colors.background = colors.white;

export const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_700Bold,
  });

  // if (!fontsLoaded) {
  //   return null;
  // }

  // const defaultFontFamily = 'DMSans_400Regular';
  // (Text as any).defaultProps = (Text as any).defaultProps || {};
  // (Text as any).defaultProps.style = { fontFamily: defaultFontFamily };

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const handleOrientationChange = () => {
      setDimensions(Dimensions.get('window'));
    };

    // Set up listener
    const subscription = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );

    // Clean up
    return () => {
      subscription.remove();
    };
  }, []);

  const defaultFontFamily = 'DMSans_400Regular';
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = { fontFamily: defaultFontFamily };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <AppNavigator />
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
};
