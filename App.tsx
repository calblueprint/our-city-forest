import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactPage from './src/screens/contactPage';
import SearchScreen from './src/screens/searchScreen';

export type RootStackParamList = {
  Search: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Contact" component={ContactPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
