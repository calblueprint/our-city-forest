export type LoginStackParamList = {
  Login: undefined;
  GuestLogin: undefined;
  AdminLogin: undefined;
  afterlogin: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Scanner: undefined;
  TreeInfoPage: { treeId: string };
};

export type LoginStackParamList = {
  Login: undefined;
  AvailableTrees: undefined;
  AllTrees: undefined;
};
