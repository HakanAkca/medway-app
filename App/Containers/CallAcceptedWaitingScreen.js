import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

class DoctorScreen extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {caller} = this.props.navigation.state.params.data
    console.log(caller)
    return (
      <View style={{alignItems: 'center'}}>
        <View>
          <Avatar
            xlarge
            rounded
            source={{uri: caller.avatarUrl}}
            activeOpacity={0.7}
          />
        </View>
        <View>
          <Text> {caller.name}</Text>
        </View>
      </View>
    )
  }
}

export default DoctorScreen