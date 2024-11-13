import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminLoginScreen from '@/screens/AdminLoginScreen';
import LoginScreen from '@/screens/LoginScreen';
import QRCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';
import HomeScreen from '@/screens/Home/Home';
import TreeInfoPage from '@/screens/TreeInfo/TreeInfo';
import { LoginStackParamList, RootStackParamList } from '@/types/navigation';

const LoginStack = createNativeStackNavigator<LoginStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function LoginStackNavigator() {
  return (
    <LoginStack.Navigator initialRouteName="Login">
      <LoginStack.Screen
        name="Login"
        component={LoginScreen} />
      <LoginStack.Screen
        name="AdminLogin"
        component={AdminLoginScreen} />
    </LoginStack.Navigator>
  );
}

function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} />
      <RootStack.Screen
        name="Scanner"
        component={QRCodeScanner}
        options={{ headerShown: false }} />
      <RootStack.Screen
        name="TreeInfoPage"
        component={TreeInfoPage}
        options={{ headerShown: false }}
    </RootStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <LoginStackNavigator />
    </NavigationContainer>
  );
}

export default App;
