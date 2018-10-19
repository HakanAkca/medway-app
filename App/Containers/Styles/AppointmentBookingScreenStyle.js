// @flow

import { StyleSheet } from 'react-native'
import { Colors, ColorSet, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    height: Metrics.screenHeight - Metrics.navBarHeight,
    marginTop: Metrics.navBarHeight
  },
  section: {
    borderBottomColor: ColorSet.Border,
    borderBottomWidth: 0.5,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionCalendar: {
    borderBottomColor: ColorSet.Border,
    borderBottomWidth: 0.5,
//    height: 300,
    justifyContent: 'center'
  },
  sectionOptions: {
    borderBottomColor: ColorSet.Border,
    borderBottomWidth: 0.5,
    height: 80
  },
  tagline: {
    fontSize: 24,
    marginHorizontal: 30,
    textAlign: 'center',
    letterSpacing: 1.2,
    fontWeight: '200'
  },
  subTagline: {
    fontSize: 12,
    marginTop: 5,
    marginHorizontal: 20,
    textAlign: 'center',
    fontWeight: '200'
  },
  timeChosenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  timeChosenTagline: {
    fontSize: 16,
    color: ColorSet.Text,
    textAlign: 'center',
    marginBottom: 2
  },
  timeChosen: {
    fontSize: 16,
    color: ColorSet.Text,
    textAlign: 'center',
    marginBottom: 18
  },
  infoMotif: {
    fontSize: 16,
    color: ColorSet.Text,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  infoMotifCliquable: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: ColorSet.Text,
    textAlign: 'center',
    marginBottom: 10
  },
  actions: {
    marginTop: 20,
    alignItems: 'center',
  },
  textArea: {
    backgroundColor: '#f5f5f5',
    width: Metrics.screenWidth - 60,
    height: Metrics.screenHeight / 3,
    textAlignVertical: 'top',
    padding: 5,
    marginTop: 10,
  },
  text: {
    color: ColorSet.Text,
    fontSize: 12,
    marginTop: 10,
    letterSpacing: 0.3
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: ColorSet.Background,
    width: Metrics.screenWidth - 60,
    height: Metrics.screenHeight / 2,
    marginTop: Metrics.screenHeight / 5,
    marginLeft: 30,
    borderColor: ColorSet.Border,
    borderWidth: 0.5,
    borderRadius: 10
  }
})
