import React, { Component } from 'react';
import {  View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'

class DoctorScreen extends Component {

    constructor(props) {
        super(props);
    }


    render () {
        return (
            <View style={{alignItems: 'center'}}>
                <View>
                    <Avatar
                        xlarge
                        rounded
                        source={{uri: this.props.user.avatarUrl}}
                        activeOpacity={0.7}
                    />
                </View>
                <View>
                    <Text>{this.props.user.name}</Text>
                </View>
            </View>
        )
    }
}

export default DoctorScreen