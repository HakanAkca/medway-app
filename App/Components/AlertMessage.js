// @flow

import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/AlertMessageStyle'
import * as Animatable from 'react-native-animatable'
import { Metrics } from '../Themes/'
import Icon from 'react-native-vector-icons/Ionicons'


type AlertMessageProps = {
  title: string,
  icon?: string,
  style?: Object,
  show?: bool
}

export default class AlertMessage extends React.Component {
  static defaultProps: { show: boolean }

  props: AlertMessageProps

  render () {
    let messageComponent = null
    if (this.props.show) {
      const { title } = this.props
      return (
        <Animatable.View
          style={[styles.container, this.props.style]}
          delay={800}
          animation='bounceIn'
        >
          <View style={styles.contentContainer}>
            <Icon
              name={this.props.icon || 'ios-alert'}
              size={Metrics.icons.medium}
              style={styles.icon}
            />
            <Text allowFontScaling={false} style={styles.message}>{title && title.toUpperCase()}</Text>
          </View>
        </Animatable.View>
      )
    }

    return messageComponent
  }
}

AlertMessage.defaultProps = {
  show: true
}
