// @flow

import React from 'react'
import { View, WebView, Modal, TouchableOpacity } from 'react-native'
import { Metrics, Colors } from '../Themes'
import Icon from '../Components/Icon'
import Config from '../Config/AppConfig'

// Styles
import styles from './Styles/CGUModalStyle'

class CGUModal extends React.Component {

  composeUrl () {
    let url = __DEV__ ? Config.urls.dev.url : Config.urls.prod.url
    url += '/_internal/cgu'
    return url
  }

  render () {
    return (
      <Modal animationType='slide' transparent={false} onRequestClose={() => this.props.navigation.navigate('Register')}>
        <View style={styles.container}>
          <View style={styles.close}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
              <Icon family='ionic' name='ios-close' size={Metrics.icons.large} color={Colors.black} />
            </TouchableOpacity>
          </View>
          <WebView source={{uri: this.composeUrl()}} />
        </View>
      </Modal>
    )
  }
}

export default CGUModal
