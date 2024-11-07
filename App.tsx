import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/login/LoginScreen';
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
        {/* <Stack.Screen name="TreeAvailability" component={TreeAvailabilityScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
