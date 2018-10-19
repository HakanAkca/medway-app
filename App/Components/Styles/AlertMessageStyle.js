// @flow

import { StyleSheet } from 'react-native'
import { Colors, ColorSet, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: Metrics.section
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  message: {
    // marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    fontWeight: 'bold',
    color: Colors.steel,
    fontSize: 11,
  },
  icon: {
    color: Colors.steel
  }
})
