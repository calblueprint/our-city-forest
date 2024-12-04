import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QRCodeScanner from '@/components/QRCodeScanner/QRCodeScanner';
import ContactScreen from '@/screens/Contact';
// import DirectoryScreen from '@/screens/Directory/Directory';
import LoginScreen from '@/screens/login/Login';
// import SpeciesInfoScreen from '@/screens/SpeciesInfo/SpeciesInfo';
import TreeInfoScreen from '@/screens/TreeInfo/TreeInfo';
import TreeSearchScreen from '@/screens/TreeSearch/TreeSearch';
import {
  ContactStackParamList,
  HomeStackParamList,
  LoginStackParamList,
  RootStackParamList,
  RootTabParamList,
} from '@/types/navigation';

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
      <HomeStack.Screen name="QRCodeScanner" component={QRCodeScanner} />
      <HomeStack.Screen name="TreeInfo" component={TreeInfoScreen} />
      {/* <HomeStack.Screen name="SpeciesInfo" component={SpeciesInfoScreen} /> */}
    </HomeStack.Navigator>
  );
}

// Contact Stack Navigator
function ContactStackNavigator() {
  return (
    <ContactStack.Navigator initialRouteName="Contact">
      <ContactStack.Screen name="Contact" component={ContactScreen} />
      {/* <ContactStack.Screen name="Directory" component={DirectoryScreen} /> */}
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
