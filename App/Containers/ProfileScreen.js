import React, { Component } from 'react'
import {
    View,
    Keyboard,
    ActivityIndicator,
    Switch,
    Text,
    ScrollView
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { Avatar, Icon } from 'react-native-elements'

import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-picker'
import styles from "./Styles/ProfileScreenStyle";
import {Colors, ColorSet, Fonts, Images, Metrics} from "../Themes";
import Styles from "./Styles/RegisterScreenStyle";
import { signOut } from "../Api/Util";



class ProfileScreen extends Component {

    props: RegisterScreenProps;

    state: {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        passwordConfirmation: string,
        birthDate: string,
        sex: string,
        colorFemale: string,
        colorMale: string,
        avatarBase64: string,
        tel: string,
        cguAccepted: boolean,
        code: string,
        container: {
            height: number,
            paddingTop: number
        },
        topLogo: {
            marginBottom: number
        },
        keyboardOpen: boolean,
        registerButtonStyle: Object,
        registerButtonLayoutHeight: number,
    }

    constructor (props: RegisterScreenProps) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            birthDate: '',
            sex: 'male',
            avatarBase64: '',
            tel: '',
            code: '',
            visibleHeight: Metrics.screenHeight,
            colorFemale: Colors.silver,
            colorMale: Colors.charcoal,
            container: {
                paddingTop: 15,
                minHeight: Metrics.screenHeight
            },
            registerButtonStyle: {},
            registerButtonSize: Metrics.buttonHeight + Metrics.baseMargin * 2,
        }
    }

    componentWillReceiveProps (newProps) {
        // Did the login attempt complete?
        /*       const {user} = newProps

               if (user.error) {
                   MessageBarManager.showAlert({
                       title: 'Erreur',
                       message: user.error.message,
                       alertType: 'error'
                   })
               }*/
    }

    componentDidMount () {
        /*       const { removeUser } = this.props
               removeUser()*/
    }

    handlePressRegister = () => {
        const { firstName, lastName, email, password, birthDate, sex, avatarBase64, tel, passwordConfirmation, cguAccepted, code } =
            this.state

        const errors = [
            {
                value: (firstName === ''),
                message: 'Le prénom est requis'
            },
            {
                value: (lastName === ''),
                message: 'Le nom de famille est requis'
            },
            {
                value: (email === ''),
                message: 'L\'addresse email est obligatoire'
            },
            {
                value: (password.length < 6),
                message: 'Veuillez entrer un mot de passe d\'au moins 6 caractères'
            },
            {
                value: (password !== passwordConfirmation),
                message: 'Les mots de passes ne correspondent pas'
            },
            {
                value: (birthDate === ''),
                message: 'Veuillez entrer votre date de naissance'
            },
            {
                value: (!sex || sex === ''),
                message: 'Veuillez choisir votre sex'
            },
            {
                value: (avatarBase64 === ''),
                message: 'Veuillez choisir une photo de profil'
            },
            {
                value: (tel === ''),
                message: 'Veuillez renseigner votre numéro de téléphone'
            },
            {
                value: (code === ''),
                message: 'Veuillez entrer votre code d\'accès'
            },
            {
                value: (!cguAccepted),
                message: 'Veuillez accepter les CGU'
            }
        ]

        for (var error of errors) {
            if (error.value) {
                return MessageBarManager.showAlert({
                    alertType: 'error',
                    title: 'Erreur',
                    message: error.message
                })
            }
        }

        this.props.register({
            firstName,
            lastName,
            email,
            password,
            birthDate,
            sex,
            avatarBase64,
            tel,
            code
        })
    }

    handleChangeSex = (text) => {
        const {sex} = this.state
        if (text === 'male' && sex !== 'male') {
            this.setState({
                colorMale: Colors.charcoal,
                colorFemale: Colors.silver,
                sex: text
            })
        } else if (sex !== 'female') {
            this.setState({
                colorFemale: Colors.charcoal,
                colorMale: Colors.silver,
                sex: text
            })
        }
    }

    handleChangeAvatar = () => {
        const options = {
            title: 'Choisir une photo de profil',
            chooseFromLibraryButtonTitle: 'Depuis la gallerie',
            takePhotoButtonTitle: 'Utiliser la caméra',
            cameraType: 'front',
            mediaType: 'photo',
            allowsEditing: true,
            maxWidth: 500,
            maxHeight: 500
        }
        ImagePicker.showImagePicker(options, (response) => {
            if (response.error) {
                MessageBarManager.showAlert({
                    title: 'Erreur',
                    alertType: 'error',
                    message: 'Veuillez sélectionner une autre image'
                })
            } else if (!response.didCancel) {
                console.tron.log({message: 'FILENAME PHOTO', response})
                // Trick to get extension from filename on ios
                let type = response.type ? response.type
                    : response.uri.substr(response.uri.lastIndexOf('.') + 1).toLowerCase()
                this.setState({avatarBase64: 'data:image/' + type + ';base64,' + response.data})
                console.tron.display({name: 'IMAGE PICKER', value: {base64: this.state.avatarBase64}})
            }
        })
    }

    toggleCGU = (cguAccepted) => {
        this.setState({cguAccepted})
    };

    showCGU = () => {
        NavigationActions.cgu()
    };

    render () {
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirmation,
            birthDate,
            avatarBase64,
            registerButtonStyle,
            tel,
            code,
            cguAccepted
        } = this.state
        const { fetching } = this.props
        /*        const editable = !fetching*/
        return (
            <View style={[styles.mainContainer, styles.screen]}>
                <View style={styles.profileContainer}>
                    <Avatar
                        containerStyle={{marginTop: 30}}
                        xlarge
                        rounded
                        source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                    <Text>Patient 22</Text>
                    <Icon
                        name="exit-to-app"
                        type="material-community"
                        size={24}
                        color={'#ffffff'}
                        onPress={() => signOut()}
                    />
                </View>
                <ScrollView>
                    <KeyboardAwareScrollView style={[Styles.container, this.state.container]}
                                             contentContainerStyle={{justifyContent: 'center'}}
                                             resetScrollToCoords={{x: 0, y: 0}}>
                        {/*<ActivityIndicator size='small' animating={fetching} color={Colors.snow} />*/}
                        <View style={Styles.form}>
                            <View style={Styles.row}>
                              {/*
                                <FormLabel labelStyle={{color: '#ffffff', fontSize: 20}}>Prénom</FormLabel>
                                <FormInput
                                    placeholder="Prénom"
                                    placeholderTextColor='#dbdcdd'
                                    underlineColorAndroid="#FFFFFF"
                                    inputStyle={{color: '#FFFFFF'}}

                                    ref='firstName'
                                    value={firstName}
                                    defaultValue={firstName}
                                    //editable={editable}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    maxLength={30}
                                    autoCorrect={false}
                                    onChangeText={(firstName) => this.setState({ firstName })}
                                    onSubmitEditing={() => this.refs.lastName.focus()}

                                />
                            </View>
                            <View style={Styles.row}>
                                <FormLabel labelStyle={{color: '#ffffff', fontSize: 20 }}>Nom</FormLabel>
                                <FormInput
                                    placeholder="Nom"
                                    placeholderTextColor='#dbdcdd'
                                    underlineColorAndroid="#FFFFFF"
                                    inputStyle={{color: '#FFFFFF'}}

                                    ref='lastName'
                                    value={lastName}
                                    defaultValue={lastName}
                                    //editable={editable}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    maxLength={30}
                                    autoCorrect={false}
                                    onChangeText={(lastName) => this.setState({ lastName })}
                                    onSubmitEditing={() => this.refs.email.focus()}
                                />
                            </View>

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
                                    //editable={editable}
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(email) => this.setState({ email })}
                                    onSubmitEditing={() => this.refs.tel.focus()}
                                />
                            </View>

                            <View style={Styles.row}>
                                <FormLabel labelStyle={{color: '#ffffff', fontSize: 20}}>Numéro de téléphone</FormLabel>
                                <FormInput
                                    placeholder="Numéro de téléphone"
                                    placeholderTextColor='#dbdcdd'
                                    underlineColorAndroid="#FFFFFF"
                                    inputStyle={{color: '#FFFFFF'}}

                                    ref='tel'
                                    value={tel}
                                    defaultValue={tel}
                                    //editable={editable}
                                    keyboardType='phone-pad'
                                    returnKeyType='done'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(tel) => this.setState({ tel })}
                                    onSubmitEditing={() => this.refs.code.focus()}
                                />
                            </View>

                            <View style={Styles.row}>
                                <FormLabel labelStyle={{color: '#ffffff', fontSize: 20}}>Code d'accès</FormLabel>
                                <FormInput
                                    placeholder="Code d'accès"
                                    placeholderTextColor='#dbdcdd'
                                    underlineColorAndroid="#FFFFFF"
                                    inputStyle={{color: '#FFFFFF'}}

                                    ref='code'
                                    value={code}
                                    defaultValue={code}
                                    //editable={editable}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={(code) => this.setState({ code })}
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
                                    //editable={editable}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={(password) => this.setState({ password })}
                                    onSubmitEditing={() => this.refs.passwordConfirmation.focus()}
                                />
                            </View>

                            <View style={Styles.row}>
                                <FormLabel labelStyle={{color: '#ffffff', fontSize: 20}}>Confirmez votre mot de passe</FormLabel>
                                <FormInput
                                    placeholder="Confirmez votre mot de passe"
                                    placeholderTextColor='#dbdcdd'
                                    underlineColorAndroid="#FFFFFF"
                                    inputStyle={{color: '#FFFFFF'}}

                                    ref='passwordConfirmation'
                                    value={passwordConfirmation}
                                    //editable={editable}
                                    keyboardType='default'
                                    returnKeyType='next'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    secureTextEntry
                                    onChangeText={(passwordConfirmation) => this.setState({ passwordConfirmation })}
                                    onSubmitEditing={Keyboard.dismiss}

                                />
                            </View>

                            <View style={Styles.rowDate} ref='birthdate'>
                                <DatePicker
                                    style={{
                                        width: 250
                                    }}
                                    date={birthDate}
                                    mode='date'
                                    placeholder='Date de naissance'
                                    format='YYYY-MM-DD'
                                    confirmBtnText='Confirmer'
                                    cancelBtnText='Retour'
                                    showIcon={false}
                                    customStyles={{
                                        dateInput: {
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            width: 50,
                                            margin: 0,
                                            borderWidth: 0
                                        },
                                        placeholderText: {
                                            fontSize: Fonts.size.large,
                                            color: Colors.snow
                                        },
                                        dateText: {
                                            fontSize: Fonts.size.regular
                                        },
                                        dateTouch: {
                                            width: 400
                                        },
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(birthDate) => this.setState({ birthDate })}
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                            </View>
                            <View style={{marginBottom: 30}}>
                                <Button
                                    small
                                    color={'#000'}
                                    backgroundColor={'#FFFFFF'}
                                    borderRadius={5}
                                    icon={{name: 'text-document', type: 'entypo', color: '#000'}}
                                    title="S'INSCRIRE"
                                />
                            */}
                            </View>
                        </View>

                    </KeyboardAwareScrollView>
                </ScrollView>
            </View>
        )
    }
}

export default ProfileScreen