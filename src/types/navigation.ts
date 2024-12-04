import { NavigatorScreenParams } from '@react-navigation/native';

export type LoginStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  TreeSearch: undefined;
  QRCodeScanner: undefined;
  TreeInfo: { treeId: string };
  SpeciesInfo: { speciesId: string };
};

export type ContactStackParamList = {
  Contact: undefined;
  Directory: undefined;
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Contact: NavigatorScreenParams<ContactStackParamList>;
};

export type RootStackParamList = {
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  MainTabs: NavigatorScreenParams<RootTabParamList>;
};
