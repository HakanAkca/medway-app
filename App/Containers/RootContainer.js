import React, { Component } from 'react'
import { View } from 'react-native'
import NavigationMain from '../Navigation/NavigationMain'
import NavigationApp from '../Navigation/NavigationApp'
import { isLoggedIn } from '../Services/IsLoggedIn'
import Config from '../Config/AppConfig'

import styles from './Styles/RootContainerStyle'
import OneSignal from 'react-native-onesignal'
import Queries from '../Queries'
import {withApollo} from 'react-apollo'

class RootContainer extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isUserAuthenticated: false
    }
  }

  _onIds (device) {
    this.props.client.mutate({
      mutation: Queries.patient.user.setOneSignalId,
      variables: { id: device.userId }
    }).then(result => {}).catch(error => {})
  }

  async componentWillMount () {
    OneSignal.init(Config.oneSignal.app_id)
    OneSignal.configure()
    OneSignal.addEventListener('ids', (device) => this._onIds(device))
    this.setState({isUserAuthenticated: await isLoggedIn() !== null})
  }

  render () {
    return (
      <View style={styles.applicationView}>
        {this.state.isUserAuthenticated ? <NavigationApp/> : <NavigationMain/>}
      </View>
    )
  }
}

export default withApollo(RootContainer)
