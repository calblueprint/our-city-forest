import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllTreesScreen from '@/screens/all_trees/AllTreesScreen';
import AvailableTreesScreen from '@/screens/available_trees/AvailableTreesScreen';
import LoginScreen from '@/screens/Login/Login';
import { LoginStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<LoginStackParamList>();
DefaultTheme.colors.background = '#FFFFFF';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AvailableTrees"
          component={AvailableTreesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllTrees"
          component={AllTreesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
