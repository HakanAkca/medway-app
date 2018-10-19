import React from 'react'
import { Icon, Input } from 'react-native-elements'
import { Text, View } from 'react-native'
import { ColorSet, Metrics, Fonts } from '../Themes'
import PropTypes from 'prop-types'
import Button from 'react-native-elements/src/buttons/Button'

class SwipeableFormInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      secured: props.secureTextEntry
    }
  }

  toggleSecuredEntry () {
    this.setState({secured: !this.state.secured})
  }

  focus () {
    this.refs.formInput.refs.input.focus()
  }

  render () {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: ColorSet.BackgroundGreyed,
        paddingBottom: 20
      }}>
        <Text
          containerStyle={!this.props.sublabel ? {marginBottom: 15} : {}}
          labelStyle={{fontSize: Fonts.size.medium, color: ColorSet.Text}}>
          {this.props.label}
        </Text>
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
          <Input
            placeholder={this.props.placeholder}
            placeholderTextColor={ColorSet.Silver}
            underlineColorAndroid={ColorSet.Greyed}
            containerStyle={this.props.secureTextEntry ? {width: Metrics.screenWidth / 10 * 7} : {flex: 1}}
            inputStyle={{color: ColorSet.Greyed, fontSize: Fonts.size.input}}
            value={this.props.value}
            defaultValue={this.props.value}
            returnKeyType='next'
            ref='formInput'
            textInputRef='input'
            secureTextEntry={this.state.secured}
            autoCapitalize={this.props.autoCapitalize}
            autoCorrect={false}
            keyboardType={this.props.keyboardType}
            maxLength={this.props.maxLength}
            onChangeText={this.props.onChangeText}
            onSubmitEditing={() => this.props.onPressNext()}
            errorStyle={{ color: 'red' }}
            errorMessage={this.props.errorMessage}
          />
          {
            this.props.secureTextEntry &&
            <Icon
              size={Fonts.size.input}
              reverse
              containerStyle={{alignSelf: 'flex-end', height: Fonts.size.large}}
              type='material-community'
              reverseColor={ColorSet.TextLight}
              color={ColorSet.Secondary}
              name={this.state.secured ? 'eye' : 'eye-off'}
              onPress={() => {
                this.toggleSecuredEntry()
              }}
            />
          }
        </View>
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

SwipeableFormInput.propTypes = {
  onPressNext: PropTypes.func,
  onPressPrev: PropTypes.func,
  onChangeText: PropTypes.func,
  label: PropTypes.string,
  sublabel: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  autoCapitalize: PropTypes.string,
  previousButton: PropTypes.bool,
  maxLength: PropTypes.number,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  isValid: PropTypes.bool,
  loading: PropTypes.bool,
  nextButtonLabel: PropTypes.string,
  errorMessage: PropTypes.string
}

SwipeableFormInput.defaultProps = {
  autoCapitalize: 'none',
  previousButton: true,
  secureTextEntry: false,
  placeholder: '',
  maxLength: 1000,
  keyboardType: 'default',
  isValid: true,
  loading: false,
  nextButtonLabel: 'Confirmer',
  errorMessage: ''
}

export default SwipeableFormInput
