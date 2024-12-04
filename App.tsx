import React from 'react';
import { DefaultTheme } from '@react-navigation/native';
import AppNavigator from '@/navigation/AppNavigator';

DefaultTheme.colors.background = '#FFFFFF';

export default function App() {
  return <AppNavigator />;
}
