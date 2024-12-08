import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QRCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';
import ContactScreen from '@/screens/Contact/Contact';
import DirectoryScreen from '@/screens/Directory/Directory';
import LoginScreen from '@/screens/Login/Login';
import SpeciesInfoScreen from '@/screens/SpeciesInfo/SpeciesInfo';
import TreeInfoScreen from '@/screens/TreeInfo/TreeInfo';
import TreeSearchScreen from '@/screens/TreeSearch/TreeSearch';
import {
  BottomTabParamList,
  ContactStackParamList,
  HomeStackParamList,
  LoginStackParamList,
  RootStackParamList,
} from '@/types/navigation';

// Stack and Tab Navigators
const LoginStack = createStackNavigator<LoginStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const ContactStack = createStackNavigator<ContactStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

// Login Stack Navigator
function LoginStackNavigator() {
  return (
    <LoginStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <LoginStack.Screen name="Login" component={LoginScreen} />
    </LoginStack.Navigator>
  );
}

// Home Stack Navigator
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      initialRouteName="SpeciesInfo"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="TreeSearch" component={TreeSearchScreen} />
      <HomeStack.Screen name="QRCodeScanner" component={QRCodeScanner} />
      <HomeStack.Screen name="TreeInfo" component={TreeInfoScreen} />
      <HomeStack.Screen name="SpeciesInfo" component={SpeciesInfoScreen} />
    </HomeStack.Navigator>
  );
}

// Contact Stack Navigator
function ContactStackNavigator() {
  return (
    <ContactStack.Navigator
      initialRouteName="Contact"
      screenOptions={{ headerShown: false }}
    >
      <ContactStack.Screen name="Contact" component={ContactScreen} />
      <ContactStack.Screen name="Directory" component={DirectoryScreen} />
    </ContactStack.Navigator>
  );
}

// Tab Navigator
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <BottomTab.Screen name="Home" component={HomeStackNavigator} />
      <BottomTab.Screen name="Contact" component={ContactStackNavigator} />
    </BottomTab.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="LoginStack" component={LoginStackNavigator} />
        <RootStack.Screen name="BottomTabs" component={BottomTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
