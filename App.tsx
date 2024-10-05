import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/app';
import QRCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';
import TreeInfoPage from '@/components/TreeInfoPage/TreeInfoPage';
import { RootStackParamList } from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scanner"
          component={QRCodeScanner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TreeInfoPage"
          component={TreeInfoPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
