/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { DefaultTheme } from '@react-navigation/native';
import { AuthContextProvider } from '@/context/AuthContext';
import { AppNavigator } from '@/navigation/AppNavigator';
import { colors } from '@/styles/colors';

// Override console methods in production
if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
}

DefaultTheme.colors.background = colors.white;

export const App: React.FC = () => {
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
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <AppNavigator />
        </AuthContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
