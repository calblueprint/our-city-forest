import { NavigatorScreenParams } from '@react-navigation/native';

export type LoginStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  SpeciesSearch: undefined; //TreeSpeciesSearch: undefined;
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
  SpeciesTab: NavigatorScreenParams<HomeStackParamList>; // Idk if this line is right
};

export type RootStackParamList = {
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};
