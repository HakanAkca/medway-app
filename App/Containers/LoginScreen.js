import React, { Component } from 'react'
import {
    View,
    Image
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Button, FormLabel, FormInput} from 'react-native-elements'
import DrawerButton from '../Components/DrawerButton'
import {Images, Metrics} from '../Themes'
import Styles from './Styles/LoginScreenStyle'
import Config from '../Config/AppConfig'

import { withNavigation } from 'react-navigation'

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { signIn } from '../Api/Util';

const LOGIN = gql`
    mutation login ($email: String!, $password: String!) {
      patientLogin(email: $email, password: $password) {
        token
        _id
        email
      }
    }
`;

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: __DEV__ ? Config.devConfig.loginEmail : '',
            password: __DEV__ ? Config.devConfig.loginPassword : '',
            emailError: false,
            passwordError: false,
            container: {
                height: Metrics.screenHeight,
                paddingTop: 70
            },
            topLogo: {
                marginBottom: 70
            },
            keyboardOpen: false,
            errorStyle: {
                height: 0
            }
        }
    }

    handleInputChange = (field, value) => {
        const newState = {
            ...this.state,
            [field]: value,
        };
        this.setState(newState);
    };

    handlePressLogin(login) {

        const {email, password} = this.state;

        if (email.length === 0) {
            return this.setState({emailError: true});
        }
        this.setState({emailError: false});

        if (password.length === 0) {
            return this.setState({passwordError: true});
        }
        this.setState({passwordError: false});

        login().then(res => {
            signIn(res.data.patientLogin)
        })
    };

    render() {

        const { email, password } = this.state;

        return (
            <KeyboardAwareScrollView style={[Styles.container]}
                                     contentContainerStyle={{justifyContent: 'center'}}
                                     resetScrollToCoords={{x: 0, y: 0}}>
                <Image source={Images.logo} style={[Styles.topLogo]}/>
                <View style={Styles.form}>
                    <View style={Styles.row}>
                        <FormLabel labelStyle={{color: '#ffffff', fontSize: 20}}>Identifiant/Email</FormLabel>
                        <FormInput
                            placeholder="Identifiant/Email"
                            placeholderTextColor='#dbdcdd'
                            underlineColorAndroid="#FFFFFF"
                            inputStyle={{color: '#FFFFFF'}}

                            ref='email'
                            value={email}
                            defaultValue={email}
                            keyboardType='email-address'
                            returnKeyType='next'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={value => this.handleInputChange('email', value)}
                            onSubmitEditing={() => this.refs.password.focus()}
                        />
                    </View>

                    <View style={Styles.row}>
                        <FormLabel labelStyle={{color: '#ffffff', fontSize: 20}}>Mot de passe</FormLabel>
                        <FormInput
                            placeholder="Mot de passe"
                            placeholderTextColor='#dbdcdd'
                            underlineColorAndroid="#FFFFFF"
                            inputStyle={{color: '#FFFFFF'}}

                            ref='password'
                            value={password}
                            keyboardType='default'
                            returnKeyType='go'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry
                            onChangeText={value => this.handleInputChange('password', value)}
                        />
                    </View>
                </View>
                <DrawerButton style={Styles.sentence}
                              text='Pas encore inscrit ?'
                              onPress={() => this.props.navigation.navigate('Register')}
                />

                <DrawerButton style={Styles.sentence}
                              text='Mot de passe oublié ?'/>

                <Mutation mutation={LOGIN} variables={{email: this.state.email, password: this.state.password}}>
                    {(login, {data}) => (
                        <View>
                            <Button
                                small
                                containerViewStyle={{marginTop: 20}}
                                color={'#000'}
                                backgroundColor={'#FFFFFF'}
                                borderRadius={5}
                                icon={{name: 'text-document', type: 'entypo', color: '#000'}}
                                title="SE CONNECTER"
                                onPress={() => this.handlePressLogin(login)}
                            />
                        </View>
                    )}
                </Mutation>
            </KeyboardAwareScrollView>
        )
    }
}

export default withNavigation(LoginScreen)