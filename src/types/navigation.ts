import { NavigatorScreenParams } from '@react-navigation/native';

export type LoginStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  SpeciesSearch: undefined;
  QRCodeScanner: undefined;
  TreeInfo: { treeId: string };
  TreeSpeciesInfo: { speciesName: string };
  ShrubSpeciesInfo: { speciesName: string };
  ShrubSearchFilter: undefined;
  TreeSearchFilter: undefined;
  HistorySpeciesScreen: { speciesName: string };
};

export type HistoryStackParamList = {
  History: undefined;
};

export type ContactStackParamList = {
  Contact: undefined;
  Directory: undefined;
};

export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  HistoryTab: NavigatorScreenParams<HistoryStackParamList>;
  ContactTab: NavigatorScreenParams<ContactStackParamList>;
};

export type RootStackParamList = {
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};
