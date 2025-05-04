import React from 'react';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { DefaultTheme } from '@react-navigation/native';
import { AuthContextProvider } from '@/context/AuthContext';
import { BookmarkProvider } from '@/context/BookmarksContext';
import { AppNavigator } from '@/navigation/AppNavigator';
import { colors } from '@/styles/colors';

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <BookmarkProvider>
          <AppNavigator />
        </BookmarkProvider>
      </AuthContextProvider>
    </GestureHandlerRootView>
  );
};
