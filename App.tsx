import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SvgContactSelected from '@/icons/ContactSelected';
import SvgContactUnselected from '@/icons/ContactUnselected';
import SvgHomeSelected from '@/icons/HomeSelected';
import SvgHomeUnselected from '@/icons/HomeUnselected';
import ContactScreen from '@/screens/contact/ContactScreen';
import LoginScreen from '@/screens/login/LoginScreen';
import TreeSearchScreen from '@/screens/tree_search/TreeSearchScreen';
import { LoginStackParamList } from '@/types/navigation';

DefaultTheme.colors.background = '#FFFFFF';
const LoginStack = createNativeStackNavigator<LoginStackParamList>();
const NavigationTab = createBottomTabNavigator();

function NavigationBar() {
  return (
    <NavigationTab.Navigator
      initialRouteName="TreeSearch"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 10 },
        tabBarIcon: ({ focused }) => {
          if (route.name === 'TreeSearch') {
            return focused ? (
              <SvgHomeSelected width={30} height={30} />
            ) : (
              <SvgHomeUnselected width={30} height={30} />
            );
          }
          if (route.name === 'Contact') {
            return focused ? (
              <SvgContactSelected width={30} height={30} />
            ) : (
              <SvgContactUnselected width={30} height={30} />
            );
          }
          return null;
        },
      })}
    >
      <NavigationTab.Screen
        name="TreeSearch"
        component={TreeSearchScreen}
        options={{ headerShown: false }}
      />
      <NavigationTab.Screen
        name="Contact"
        component={ContactScreen}
        options={{ headerShown: false }}
      />
    </NavigationTab.Navigator>
  );
}

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
          name="Main"
          component={NavigationBar}
          options={{ headerShown: false }}
        />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}
