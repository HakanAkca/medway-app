// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.background,
    flex: 1
  },
  container: {
    backgroundColor: Colors.background,
    paddingTop: 70,
    flex: 1
  },
  form: {
    backgroundColor: Colors.background,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    height: 120,
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  topLogo: {
    alignSelf: 'center',
    height: Metrics.images.large,
    resizeMode: 'contain',
    marginBottom: 40
  },
  sentence: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    // flexDirection: 'row',
    // alignItems: 'center',
    textAlign: 'center',
    color: Colors.snow
  },
  help: {
    textAlign: 'center',
    color: Colors.steel,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18
  },
  button: {
    marginTop: 30
  }
})

