import { StyleSheet } from 'react-native'
import { Colors, ColorSet, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    ...ApplicationStyles.screen.mainContainer,
    backgroundColor: Colors.background,
    flex: 1,
    paddingTop: 70
  },
  waitingLabel: {
    textAlign: 'center',
    color: ColorSet.TextLight,
    margin: 20,
    fontSize: 18
  },
  waitingSpinner: {
    margin: 40,
    alignSelf: 'center'
  },
  footer: {
    backgroundColor: '#ffffff',
    height: Metrics.screenHeight / 10,
    borderTopWidth: 1,
    borderTopColor: ColorSet.BackgroundElement
  },
  viewIconContainer: {

  },
  viewIconShare: {

  }
})
