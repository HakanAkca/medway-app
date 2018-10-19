// @flow

import { StyleSheet } from 'react-native'
import { Colors, ColorSet, Fonts, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    backgroundColor: ColorSet.background,
    flex: 1,
    paddingTop: 70,
  },
  pastConsultationsRow: {
    backgroundColor: ColorSet.Background,
    flex: 1,
    marginTop: 5,
    marginLeft: 12,
    marginRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    justifyContent: 'center'
  },
  pastConsultationsRowPicture: {
    width: 36,
    height: 36,
    borderRadius: 18,
    left: 10,
    position: 'absolute'
  },
  pastConsultationsRowName: {
    left: 58,
    color: ColorSet.Title,
    fontSize: 12,
    top: -1,
    letterSpacing: 0.3
  },
  pastConsultationsRowDate: {
    left: 58,
    color: ColorSet.Text,
    fontSize: 9
  },
  pastConsultationsRowArrowIcon: {
    position: 'absolute',
    color: ColorSet.Arrow,
    right: 16
  },
  appointmentDateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  appointmentDate: {
    fontSize: 20
  },
  appointmentStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  appointmentStatus: {
    color: ColorSet.Text,
    fontSize: 14
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
  declineButton: {
    backgroundColor: ColorSet.Background,
    borderWidth: 0.5,
    borderColor: '#959595',
    marginLeft: 10
  },
  declineText: {
    color: ColorSet.Text,
    fontSize: 12
  },
  validateButton: {
    backgroundColor: ColorSet.Primary
  },
  validateText: {
    color: ColorSet.TextLight,
    fontSize: 10
  },
  appointmentHeaderContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorSet.Secondary,
    width: Metrics.screenWidth,
  },
  appointmentHeaderTitle: {
    color: ColorSet.Background,
    fontWeight: '700',
    fontSize: 14
  },
  appointmentText: {
    color: ColorSet.Text,
    fontSize: 14,
    marginTop: 10
  },
  appointmentTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
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
