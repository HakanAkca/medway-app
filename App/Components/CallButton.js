// @flow

import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import styles from './Styles/CallButtonStyle'

import Icon from 'react-native-vector-icons/FontAwesome'
import { ColorSet } from '../Themes/'

type CallButtonProps = {
  onPress: () => void,
  children?: string,
  navigator?: Object
}

export default class CallButton extends React.Component {
  props: CallButtonProps

  render () {
    return (
      <View style={styles.container}>
        <Animatable.View style={styles.outBorder1} animation='sizePulse' duration={1800} iterationCount='infinite' />
        <Animatable.View style={styles.outBorder2} animation='sizePulse' duration={1800} delay={900} iterationCount='infinite' />
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Icon name={'video-camera'} size={36} color={ColorSet.Background} />
        </TouchableOpacity>
      </View>
    )
  }
}
