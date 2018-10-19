// @flow

import { StyleSheet } from 'react-native'
import { Colors, ColorSet, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: ColorSet.Background,
  },
  firstRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: 15
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
  },
  date: {
    top: 15,
    color: ColorSet.TextTitle,
    fontSize: 11,
    letterSpacing: 0.3
  },
  block: {
    top: 42
  },
  diagnostic: {

  },
  toDo: {

  },
  header: {
    height: 40,
    justifyContent: 'center',
    backgroundColor: ColorSet.BackgroundElement
  },
  titleHeader: {
    paddingLeft: 20,
    color: ColorSet.TextTitle,
    fontSize: 13,
    letterSpacing: 1.2
  },
  textBlock: {
    padding: 10,
    color: ColorSet.Text,
    fontSize: 12,
    letterSpacing: 0.3
  },
  roundedButton: {
    width: 120,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17.5
  },
  circleButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22.5,
    backgroundColor: 'black'
  },
  invisibleButton: {
    backgroundColor: ColorSet.Background,
    left: 10
  },
  rdvButton: {
    right: 10,
    backgroundColor: ColorSet.Primary
  },
  callButton: {
    backgroundColor: '#2C4149'
  },
  mailButton: {
    backgroundColor: '#19A0D8'
  },
  thirdRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    top: 25,
    width: 250,
    alignSelf: 'center'
  },
  roundedButton: {
    width: 120,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17.5
  },
  uploadButton: {
    backgroundColor: ColorSet.Primary
  },
  uploadText: {
    color: ColorSet.TextLight,
    fontSize: 10
  },
  ordonnancePicture: {
    width: Metrics.screenWidth - 40,
    height: Metrics.screenHeight - 250,
    marginHorizontal: 20,
    marginTop: 10
  },
  ordonnanceMasterBlock: {
  },
  ordonnanceBlock: {
    alignItems: 'center',
  },
  ordonnanceText: {
    fontSize: 14,
    letterSpacing: 1.1,
    color: ColorSet.Text,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 12
  },
  viewIconContainer: {
    marginTop: 20,
    marginBottom: 40
  },
  viewIcon: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: ColorSet.Secondary,
  },
  reportInfoContainer: {
  },
  reportHeaderContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorSet.Secondary,
    width: Metrics.screenWidth
  },
  reportHeaderTitle: {
    color: ColorSet.Background,
    fontWeight: '700',
    fontSize: 14
  },
  reportText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: ColorSet.TextLight,
    color: ColorSet.Text,
    fontWeight: '400'
  },
  reportEmergencyContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorSet.Error,
    width: Metrics.screenWidth
  },
  reportEmergencyTitle: {
    color: ColorSet.Background,
    fontWeight: '800',
    fontSize: 14
  },
})
