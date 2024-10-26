import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginStackParamList } from '@/navigation/types';
import LoginScreen from '@/screens/LoginScreen';
import MemberLoginScreen from '@/screens/MemberLoginScreen';

const Stack = createNativeStackNavigator<LoginStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MemberLogin" component={MemberLoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
