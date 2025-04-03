import { NavigatorScreenParams } from '@react-navigation/native';

export type LoginStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  TreeSpeciesSearch: undefined;
  ShrubSpeciesSearch: undefined;
  QRCodeScanner: undefined;
  TreeInfo: { treeId: string };
  TreeSpeciesInfo: { speciesName: string };
  ShrubSpeciesInfo: { speciesName: string };
  ShrubSearchFilter: undefined;
  TreeSearchFilter: undefined;
  HistorySpeciesScreen: { speciesName: string };
};

export type ContactStackParamList = {
  Contact: undefined;
  Directory: undefined;
};

export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ContactTab: NavigatorScreenParams<ContactStackParamList>;
};

export type RootStackParamList = {
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};
