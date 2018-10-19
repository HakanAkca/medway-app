// @flow

import { StyleSheet } from 'react-native'
import { Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  editIcon_Overlay: {
    backgroundColor: 'rgba(249, 249, 249, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 5
  }
})
