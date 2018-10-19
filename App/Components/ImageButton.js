// @flow

import React from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import styles from './Styles/ImageButtonStyle'
import Icon from 'react-native-vector-icons/FontAwesome'
import {ColorSet} from '../Themes/'

type ImageButtonProps = {
  onPress: () => void,
  source: string,
  style: Object,
  rounded: boolean,
  editable: boolean
}

export default class ImageButton extends React.Component {
  props: ImageButtonProps

  renderEditIcon = () => {
    const {style, rounded} = this.props
    const borderRadius = rounded ? {borderBottomLeftRadius: style.borderRadius, borderBottomRightRadius: style.borderRadius} : {}
    return (
      <View style={[styles.editIcon_Overlay, borderRadius]}>
        <Icon name={'camera'} size={18} color={ColorSet.BackgroundElement} />
      </View>
    )
  }

  render () {
    const {onPress, source, style, rounded, editable} = this.props
    const containerStyle = rounded ? {borderRadius: style.borderRadius, width: style.width, height: style.height} : styles.container
    return (
      <TouchableOpacity style={[containerStyle, {overflow: 'hidden'}]} onPress={onPress}>
        <Image source={source} style={style} />
        {editable && this.renderEditIcon()}
      </TouchableOpacity>
    )
  }
}
