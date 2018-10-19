// @flow

import { StyleSheet } from 'react-native'
import { Colors, ColorSet, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    backgroundColor: ColorSet.background,
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 5
  },
  firstRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: 20
  },
  secondRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 10,
    height: 55
  },
  name: {
    color: ColorSet.TextTitle,
    fontSize: 14,
    letterSpacing: 0.3,
    fontWeight: '500'
  },
  email: {
    color: ColorSet.TextTitle,
    fontSize: 13,
    letterSpacing: 0.3
  },
  tel: {
    color: ColorSet.TextTitle,
    fontSize: 13,
    letterSpacing: 0.3
  }
})
