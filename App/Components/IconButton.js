// @flow

import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from './Icon'
import styles from './Styles/IconButtonStyle'

type IconButtonProps = {
  onPress: () => void,
  name: string,
  size: Number,
  color: string,
  family: string
}

export default class IconButton extends React.Component {
  props: IconButtonProps

  render () {
    const {family, name, size, color} = this.props
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Icon family={family} name={name} color={color} size={size} />
      </TouchableOpacity>
    )
  }
}
