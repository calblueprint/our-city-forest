import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';
import AdminLoginScreen from '@/screens/AdminLoginScreen';
import HomeScreen from '@/screens/Home/Home';
import LoginScreen from '@/screens/LoginScreen';
import TreeInfoPage from '@/screens/TreeInfo/TreeInfo';
import { LoginStackParamList, RootStackParamList } from '@/types/navigation';

const LoginStack = createNativeStackNavigator<LoginStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function LoginStackNavigator() {
  return (
    <LoginStack.Navigator initialRouteName="Login">
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="AdminLogin" component={AdminLoginScreen} />
    </LoginStack.Navigator>
  );
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Scanner"
        component={QRCodeScanner}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="TreeInfoPage"
        component={TreeInfoPage}
        options={{ headerShown: false }}
      />
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
