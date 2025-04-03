import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QRCodeScanner } from '@/components/QRCodeScanner/QRCodeScanner';
import { useAuth } from '@/context/AuthContext';
import {
  ContactSelected,
  ContactUnselected,
  HomeSelected,
  HomeUnselected,
} from '@/icons';
import { ContactScreen } from '@/screens/Contact/Contact';
import { DirectoryScreen } from '@/screens/Directory/Directory';
import { HomeScreen } from '@/screens/Home/Home';
import { LoginScreen } from '@/screens/Login/Login';
import { ShrubSpeciesSearchScreen } from '@/screens/ShrubSearch/ShrubSpeciesSearch';
import { ShrubSpeciesInfoScreen } from '@/screens/ShrubSpeciesInfo/ShrubSpeciesInfo';
import { TreeInfoScreen } from '@/screens/TreeInfo/TreeInfo';
import { TreeSpeciesInfoScreen } from '@/screens/TreeSpeciesInfo/TreeSpeciesInfo';
import { TreeSpeciesSearchScreen } from '@/screens/TreeSpeciesSearch/TreeSpeciesSearch';
import {
  BottomTabParamList,
  ContactStackParamList,
  HomeStackParamList,
  LoginStackParamList,
  RootStackParamList,
} from '@/types/navigation';

// Stack and Tab Navigators
const LoginStack = createNativeStackNavigator<LoginStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ContactStack = createNativeStackNavigator<ContactStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

// Login Stack Navigator
const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <LoginStack.Screen name="Login" component={LoginScreen} />
    </LoginStack.Navigator>
  );
};

// Home Stack Navigator
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="TreeSpeciesSearch"
        component={TreeSpeciesSearchScreen}
      />
      <HomeStack.Screen
        name="ShrubSpeciesSearch"
        component={ShrubSpeciesSearchScreen}
      />
      <HomeStack.Screen
        name="QRCodeScanner"
        component={QRCodeScanner}
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animation: 'fade',
        }}
      />
      <HomeStack.Screen name="TreeInfo" component={TreeInfoScreen} />
      <HomeStack.Screen
        name="TreeSpeciesInfo"
        component={TreeSpeciesInfoScreen}
      />
      <HomeStack.Screen
        name="ShrubSpeciesInfo"
        component={ShrubSpeciesInfoScreen}
      />
    </HomeStack.Navigator>
  );
};

// Contact Stack Navigator
const ContactStackNavigator = () => {
  return (
    <ContactStack.Navigator
      initialRouteName="Contact"
      screenOptions={{ headerShown: false }}
    >
      <ContactStack.Screen name="Contact" component={ContactScreen} />
      <ContactStack.Screen name="Directory" component={DirectoryScreen} />
    </ContactStack.Navigator>
  );
};

// Tab Navigator
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 12 },
        tabBarIcon: ({ focused }) => {
          if (route.name === 'HomeTab') {
            return focused ? (
              <HomeSelected width={30} height={30} />
            ) : (
              <HomeUnselected width={30} height={30} />
            );
          }
          if (route.name === 'ContactTab') {
            return focused ? (
              <ContactSelected width={30} height={30} />
            ) : (
              <ContactUnselected width={30} height={30} />
            );
          }
          return null;
        },
      })}
    >
      <BottomTab.Screen name="HomeTab" component={HomeStackNavigator} />
      <BottomTab.Screen name="ContactTab" component={ContactStackNavigator} />
    </BottomTab.Navigator>
  );
};

// Root Navigator
export const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <RootStack.Navigator
          initialRouteName="BottomTabs"
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="LoginStack" component={LoginStackNavigator} />
          <RootStack.Screen name="BottomTabs" component={BottomTabNavigator} />
        </RootStack.Navigator>
      ) : (
        <RootStack.Navigator
          initialRouteName="LoginStack"
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="LoginStack" component={LoginStackNavigator} />
          <RootStack.Screen name="BottomTabs" component={BottomTabNavigator} />
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};
