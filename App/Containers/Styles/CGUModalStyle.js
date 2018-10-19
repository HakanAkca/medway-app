// @flow

import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  container: {
    paddingTop: Metrics.baseMargin * 4,
    flex: 1
  },

  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 2,
    backgroundColor: 'transparent'
  }
})
