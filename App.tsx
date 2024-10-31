import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminLoginScreen from '@/screens/AdminLoginScreen';
import LoginScreen from '@/screens/LoginScreen';
import { LoginStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
