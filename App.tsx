import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';
import HomeScreen from '@/screens/Home/Home';
import TreeInfoPage from '@/screens/TreeInfo/TreeInfo';
import { RootStackParamList } from '@/types/navigation';

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
