import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ColorSet } from '../Themes/index'

const Styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 20,
    backgroundColor: ColorSet.Secondary,
    paddingVertical: 5
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: ColorSet.TextLight
  }
})

class MedicalFileTimeIndicator extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>{this.props.time.toUpperCase()}</Text>
      </View>
    );
  }
}


export default MedicalFileTimeIndicator
