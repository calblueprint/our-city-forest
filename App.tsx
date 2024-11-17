import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import QRCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';
// import HomeScreen from '@/screens/Home/Home';
// import TreeInfoPage from '@/screens/TreeInfo/TreeInfo';
import AllTreesScreen from '@/screens/all_trees/AllTreesScreen';
import AvailableTreesScreen from '@/screens/available_trees/AvailableTreesScreen';
import LoginScreen from '@/screens/login/LoginScreen';
import { LoginStackParamList } from '@/types/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const LoginStack = createNativeStackNavigator<LoginStackParamList>();
DefaultTheme.colors.background = '#FFFFFF';

DefaultTheme.colors.background = '#FFFFFF';

export default function App() {
  return (
    <NavigationContainer>
      <LoginStack.Navigator initialRouteName="Login">
        <LoginStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <LoginStack.Screen
          name="AllTrees"
          component={AllTreesScreen}
          options={{ headerShown: false }}
        />
        <LoginStack.Screen
          name="AvailableTrees"
          component={AvailableTreesScreen}
          options={{ headerShown: false }}
        />
      </LoginStack.Navigator>
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
    </NavigationContainer>
  );
}
