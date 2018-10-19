import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  DeviceEventEmitter
} from 'react-native'

import styles from './Styles/HomeScreenStyle'
import MedwayTwilio from "./MedwayTwilio";


class HomeScreen extends Component {

  constructor (props) {
    super(props)
    this._navigateTo = this._navigateTo.bind(this);
  }

  _navigateTo(pageName, params) {
    this.props.navigation.navigate(pageName, params)
  }

  componentWillMount () {
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('NativeAndroid_CallAccept', (event) => {
        this._navigateTo("CallAcceptedWaiting", {data: JSON.parse(event.NotificationInfo)})
      })
    }
  }
  call (doctor) {
      console.log(doctor)
      let data = { patientId: this.props.user.data.email, doctorId: doctor.email }
      if (!doctor.isActive) {
          this.setState({isInactiveModalVisible: true, isCallDoctorSelected: doctor})
          this.setState({doctorText: 'Le docteur ' + doctor.lastName + ' s\'est signalé inactif et ne pourra pas recevoir votre appel.\n\n Vous pouvez lui proposer un rendez-vous ou cliquer sur "Notifier" pour l\'informer que vous avez essayé de le joindre.'})
      } else this.state.api.signaling.call(data)
      NavigationActions.waitingScreen()
  }


  start () {
      if (!this.props.provider.doctors) {
          Alert.alert('Information', 'Veuillez réessayer dans quelques secondes...', [{text: 'Retour', onPress: () => {} }])
      } else {
          if (!this.props.user.data.provider && !this.props.user.data.providerId || this.props.provider.doctors.length === 0) {
              Alert.alert('Information', 'Vous n\'êtes suivi par aucun médecin traitant utilisant Medway et ne pouvez donc pas déclarer d\'appel.', [{text: 'Retour', onPress: () => {} }])
          } else {
              if (this.props.provider.doctors.length > 1) {
                  this.setState({isModalVisible: true})
              } else if (this.props.provider.doctors.length === 1) {
                  this.call(this.props.provider.doctors[0])
              }
          }
      }
  }

  render () {
    return (
      <View style={[styles.mainContainer, styles.screen]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Cliquez pour appeler votre médecin
          </Text>
        </View>
        <View style={styles.callButtonContainer}>
          {/*<CallButton onPress={() => {
            this.
            start()
          }}/>*/}
          <MedwayTwilio />
        </View>
      </View>
    )
  }
}

export default HomeScreen
