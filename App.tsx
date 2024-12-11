import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';
import Contact from '@/screens/Contact/Contact';
import Directory from '@/screens/Contact/Directory';
import HomeScreen from '@/screens/Home/Home';
import LoginScreen from '@/screens/login/LoginScreen';
import TreeInfoPage from '@/screens/TreeInfo/TreeInfo';
import TreeSearch from '@/screens/TreeSearch/TreeSearch';
import { LoginStackParamList, RootStackParamList } from '@/types/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const LoginStack = createNativeStackNavigator<LoginStackParamList>();

DefaultTheme.colors.background = '#FFFFFF';

const App = () => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      {/* <LoginStack.Navigator initialRouteName="Login">
        <LoginStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </LoginStack.Navigator> */}

      <RootStack.Navigator initialRouteName="TreeSearch">
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
        <RootStack.Screen
          name="TreeSearch"
          component={TreeSearch}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Contact"
          component={Contact}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Directory"
          component={Directory}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
