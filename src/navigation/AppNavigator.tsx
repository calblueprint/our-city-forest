import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactScreen from './screens/ContactScreen';
import DirectoryScreen from './screens/DirectoryScreen';
// Import screen components
import LoginScreen from './screens/LoginScreen';
import QRCodeScannerScreen from './screens/QRCodeScannerScreen';
import SpeciesInfoScreen from './screens/SpeciesInfoScreen';
import TreeInfoScreen from './screens/TreeInfoScreen';
import TreeSearchScreen from './screens/TreeSearchScreen';
// Types
import {
  ContactStackParamList,
  HomeStackParamList,
  RootStackParamList,
  RootTabParamList,
} from './types';

// Stack and Tab Navigators
const LoginStack = createStackNavigator<LoginStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const ContactStack = createStackNavigator<ContactStackParamList>();
const RootTab = createBottomTabNavigator<RootTabParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

// Home Stack Navigator
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator initialRouteName="TreeSearch">
      <HomeStack.Screen name="TreeSearch" component={TreeSearchScreen} />
      <HomeStack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
      <HomeStack.Screen name="TreeInfo" component={TreeInfoScreen} />
      <HomeStack.Screen name="SpeciesInfo" component={SpeciesInfoScreen} />
    </HomeStack.Navigator>
  );
}

// Contact Stack Navigator
function ContactStackNavigator() {
  return (
    <ContactStack.Navigator initialRouteName="Contact">
      <ContactStack.Screen name="Contact" component={ContactScreen} />
      <ContactStack.Screen name="Directory" component={DirectoryScreen} />
    </ContactStack.Navigator>
  );
}

// Tab Navigator
function RootTabNavigator() {
  return (
    <RootTab.Navigator initialRouteName="Home">
      <RootTab.Screen name="Home" component={HomeStackNavigator} />
      <RootTab.Screen name="Contact" component={ContactStackNavigator} />
    </RootTab.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="LoginStack">
        <RootStack.Screen
          name="LoginStack"
          component={() => (
            <LoginStack.Navigator initialRouteName="Login">
              <LoginStack.Screen name="Login" component={LoginScreen} />
            </LoginStack.Navigator>
          )}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="MainTabs"
          component={RootTabNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
