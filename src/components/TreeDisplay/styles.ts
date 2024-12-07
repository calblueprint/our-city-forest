import { StyleSheet } from 'react-native';
import colors from '@/styles/colors';

export default StyleSheet.create({
  main: {
    flexDirection: 'column',
    marginTop: 25,
    gap: 25,
    paddingBottom: 25,
  },
  text: {
    fontSize: 14,
    fontFamily: 'DM Sans',
    color: colors.gray3,
  },
  funFact: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: 'DM Sans Bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray5,
  },
  header: {
    fontSize: 18,
    fontFamily: 'DM Sans',
    color: colors.gray1,
  },
  textInput: {
    flex: 1,
    color: colors.gray3,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.gray5,
    paddingVertical: 11,
    paddingHorizontal: 20,
    fontSize: 14,
    fontFamily: 'DM Sans',
  },
  locations: {
    flexDirection: 'column',
  },
  locationEntry: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  properties: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  },
  property: {
    fontFamily: 'DM Sans',
    marginTop: 15,
    width: '50%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  propertyText: {
    fontSize: 16,
    fontFamily: 'DM Sans',
    color: colors.gray3,
  },

  funFactHeader: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
