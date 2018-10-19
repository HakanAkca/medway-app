// @flow

import React from 'react'
import { Colors, Metrics } from '../Themes/index'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import GOIcon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

type IconProps = {
  name: string,
  size: Number,
  color: string,
  family: string
}

export default class Icon extends React.Component {
  props: IconProps

  constructor (props: IconProps) {
    super(props)
    this.icons = {
      'fa': FAIcon,
      'google': GOIcon,
      'ionic': IonIcon
    }
  }
  render () {
    return React.createElement(this.icons[this.props.family], {
      name: this.props.name,
      size: this.props.size || Metrics.icons.medium,
      color: this.props.color || Colors.ember
    })
  }
}

// // Prop type warnings
// Icon.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Icon.defaultProps = {
//   someSetting: false
// }
