import { NavigatorScreenParams } from '@react-navigation/native';

export type LoginStackParamList = {
  Login: undefined;
};

export type HomeStackParamList = {
  TreeSpeciesSearch: undefined;
  QRCodeScanner: undefined;
  TreeInfo: { treeId: string };
  TreeSpeciesInfo: { speciesName: string };
};

export type ContactStackParamList = {
  Contact: undefined;
  Directory: undefined;
};

export type BookmarksStackParamList = {
  BookmarkButton: undefined;
};

export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  ContactTab: NavigatorScreenParams<ContactStackParamList>;
  BookmarksTab: undefined;
};

export type RootStackParamList = {
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
};
