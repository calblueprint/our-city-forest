import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingScreen } from '@/components/LoadingScreen/LoadingScreen';
import { QRCodeScanner } from '@/components/QRCodeScanner/QRCodeScanner';
import { useAuth } from '@/context/AuthContext';
import {
  ContactSelected,
  ContactUnselected,
  HistorySelected,
  HistoryUnselected,
  HomeSelected,
  HomeUnselected,
} from '@/icons';
import { linking } from '@/linking';
import { ContactScreen } from '@/screens/Contact/Contact';
import { DirectoryScreen } from '@/screens/Directory/Directory';
import { HistoryScreen } from '@/screens/History/History';
import { LoginScreen } from '@/screens/Login/Login';
import { ShrubSpeciesInfoScreen } from '@/screens/ShrubSpeciesInfo/ShrubSpeciesInfo';
import { SpeciesSearchScreen } from '@/screens/SpeciesSearch/SpeciesSearch';
import { TreeInfoScreen } from '@/screens/TreeInfo/TreeInfo';
import { TreeSpeciesInfoScreen } from '@/screens/TreeSpeciesInfo/TreeSpeciesInfo';
import {
  BottomTabParamList,
  ContactStackParamList,
  HistoryStackParamList,
  HomeStackParamList,
  LoginStackParamList,
  RootStackParamList,
} from '@/types/navigation';

// Stack and Tab Navigators
const LoginStack = createNativeStackNavigator<LoginStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();
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
      initialRouteName="SpeciesSearch"
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="SpeciesSearch" component={SpeciesSearchScreen} />
      <HomeStack.Screen
        name="QRCodeScanner"
        component={QRCodeScanner}
        options={{
          presentation: 'fullScreenModal',
          animation: 'fade',
          headerShown: false,
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

// History Stack Navigator
const HistoryStackNavigator = () => {
  return (
    <HistoryStack.Navigator
      initialRouteName="History"
      screenOptions={{ headerShown: false }}
    >
      <HistoryStack.Screen name="History" component={HistoryScreen} />
    </HistoryStack.Navigator>
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
  const { isAuthenticated } = useAuth();

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
          if (route.name === 'HistoryTab') {
            return focused ? (
              <HistorySelected width={30} height={30} />
            ) : (
              <HistoryUnselected width={30} height={30} />
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
      {isAuthenticated && (
        <BottomTab.Screen name="HistoryTab" component={HistoryStackNavigator} />
      )}
      <BottomTab.Screen name="ContactTab" component={ContactStackNavigator} />
    </BottomTab.Navigator>
  );
};

// Root Navigator
export const AppNavigator = () => {
  const { isLoading, hasLaunched } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        initialRouteName={hasLaunched ? 'BottomTabs' : 'LoginStack'}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="LoginStack" component={LoginStackNavigator} />
        <RootStack.Screen name="BottomTabs" component={BottomTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
