import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), 'ourcityforest://'],
  config: {
    screens: {
      LoginStack: {
        screens: {
          Login: 'login',
        },
      },
      BottomTabs: {
        screens: {
          HomeTab: {
            screens: {
              TreeSpeciesSearch: 'tree-species',
              ShrubSpeciesSearch: 'shrub-species',
              QRCodeScanner: 'scan',
              TreeInfo: 'tree/:treeId',
              TreeSpeciesInfo: 'tree-species/:speciesName',
              ShrubSpeciesInfo: 'shrub-species/:speciesName',
            },
          },
          ContactTab: {
            screens: {
              Contact: 'contact',
              Directory: 'directory',
            },
          },
        },
      },
    },
  },
};
