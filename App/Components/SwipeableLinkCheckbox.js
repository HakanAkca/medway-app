import React from 'react'
import { View, Linking, TouchableOpacity, Text } from 'react-native'
import { ColorSet, Metrics, Fonts } from '../Themes'
import PropTypes from 'prop-types'
import Button from 'react-native-elements/src/buttons/Button'
import { FormLabel, FormValidationMessage, CheckBox } from 'react-native-elements'
import AppConfig from '../Config/AppConfig'
import { withNavigation } from 'react-navigation'

class SwipeableLinkCheckbox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this._navigateTo = this._navigateTo.bind(this);
  }

  _navigateTo(pageName, params = {}) {
    this.props.navigation.navigate(pageName, params)
  }

  focus () {}

  render () {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: ColorSet.BackgroundGreyed,
        paddingBottom: 20
      }}>
        <TouchableOpacity onPress={() => this._navigateTo('CGU')}>
          <Text
            containerStyle={!this.props.sublabel ? {marginBottom: 15} : {}}
            labelStyle={{fontSize: Fonts.size.medium, color: ColorSet.Text}}>
            {this.props.label}
          </Text>
        </TouchableOpacity>
        {
          this.props.sublabel &&
          <Text
            containerStyle={{marginBottom: 15}}
            labelStyle={{fontSize: Fonts.size.small, color: ColorSet.Greyed}}>
            {this.props.sublabel}
          </Text>
        }
        <View
          contentContainerStyle={{}}
          style={{flexDirection: 'row'}}>
          <CheckBox
            center
            icon
            title="Cliquez ici"
            iconType='material'
            checkedIcon='check'
            uncheckedIcon='check'
            uncheckedColor='#bfbfbf'
            checkedColor='green'
            checked={this.props.checked}
            onPress={this.props.onPress}
          />
        </View>
        <Text errorStyle={{ color: 'red' }}>{this.props.errorMessage}</Text>
        <View
          contentContainerStyle={{}}
          style={{
            flexDirection: 'row-reverse',
            marginTop: 60
          }}>
          <Button
            style={{
              width: Metrics.screenWidth / 3,
              alignSelf: 'flex-end'
            }}
            disabledStyle={{
              backgroundColor: ColorSet.TextSilver
            }}
            disabledTextStyle={{
              color: ColorSet.Secondary
            }}
            disabled={!this.props.isValid}
            medium
            loading={this.props.loading}
            color={ColorSet.TextLight}
            backgroundColor={ColorSet.Secondary}
            borderRadius={5}
            rightIcon={!this.props.loading ? {
              name: 'chevron-right',
              type: 'material-community',
              color: this.props.isValid ? ColorSet.TextLight : ColorSet.Secondary,
              size: Fonts.size.input
            } : {}}
            title={this.props.loading ? '' : this.props.nextButtonLabel}
            onPress={() => {
              this.props.isValid ? this.props.onPressNext() : this.setState({error: this.props.errorMessage})
            }}
          />
          {
            this.props.previousButton &&
            <Button
              style={{
                width: Metrics.screenWidth / 3,
                alignSelf: 'flex-start'
              }}
              medium
              color={ColorSet.Text}
              backgroundColor='transparent'
              borderRadius={5}
              leftIcon={{
                name: 'chevron-left',
                type: 'material-community',
                color: ColorSet.Text,
                size: Fonts.size.input
              }}
              title='Précédent'
              onPress={() => this.props.onPressPrev()}
            />
          }

        </View>
      </View>
    )
  }
}

SwipeableLinkCheckbox.propTypes = {
  onPressNext: PropTypes.func,
  onPressPrev: PropTypes.func,
  onPress: PropTypes.func,
  label: PropTypes.string,
  checkboxLabel: PropTypes.string,
  sublabel: PropTypes.string,
  previousButton: PropTypes.bool,
  checked: PropTypes.bool,
  isValid: PropTypes.bool,
  nextButtonLabel: PropTypes.string
}

SwipeableLinkCheckbox.defaultProps = {
  previousButton: true,
  keyboardType: 'default',
  isValid: true,
  nextButtonLabel: 'Confirmer',
  errorMessage: ''
}

export default withNavigation(SwipeableLinkCheckbox)
