// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors, ColorSet, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    marginBottom: 10
  },
  outBorder1: {
    position: 'absolute',
    height: 160,
    width: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(242, 242, 242, 1)',
    //backgroundColor: 'red'
  },
  outBorder2: {
    position: 'absolute',
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(235, 235, 235, 1)',
    //backgroundColor: 'blue'
  },
  button: {
    height: 120,
    width: 120,
    borderRadius: 60,
    /* marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.baseMargin, */
    backgroundColor: '#2c4149',
    justifyContent: 'center',
    //borderWidth: 10,
    //borderColor: 'rgba(249, 249, 249, 1)'
    alignItems: 'center',
    zIndex: 3
  }
})
