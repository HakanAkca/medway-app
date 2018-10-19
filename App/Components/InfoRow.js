import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    marginVertical: 3
  },
  infoNameContainer: {
    width: 120,
    alignItems: 'flex-end'
  },
  infoName: {
    color: '#959595',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoValue: {
    color: '#000',
    fontSize: 12,
    flex: 1,
    marginLeft: 20
  },

})

class InfoRow extends Component {

  render () {
    return (
      <View style={Styles.infoRow}>
        <View style={Styles.infoNameContainer}>
          <Text style={Styles.infoName}>{this.props.name.toUpperCase()}</Text>
        </View>
        <Text style={Styles.infoValue}>{this.props.value}</Text>
      </View>

    )
  }
}

export default InfoRow