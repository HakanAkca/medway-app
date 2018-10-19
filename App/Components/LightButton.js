// @flow

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Styles from './Styles/LightButtonStyle'

type LightButtonProps = {
  onPress: () => void,
  text: string,
  style: Object,
  color: Object,
  height: number,
  width: number,
  fontSize: number,
  textColor: Object,
  borderColor: Object,
  spacing: number
}

export default class LightButton extends React.Component {
  props: LightButtonProps

  render () {
    return (
      <TouchableOpacity style={[Styles.button, this.props.style, {borderColor: this.props.borderColor, backgroundColor: this.props.color, width: this.props.width, height: this.props.height, borderRadius: this.props.height / 2}]} onPress={this.props.onPress}>
        <Text style={{fontSize: this.props.fontSize, color: this.props.textColor, letterSpacing: this.props.spacing}}>{this.props.text.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}
