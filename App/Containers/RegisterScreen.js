import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Swiper from 'react-native-swiper';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { Query } from 'react-apollo';
import Queries from '../Queries';
import Config from "../Config/AppConfig";

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

const MessageBarManager = require('react-native-message-bar').MessageBarManager;

class RegisterScreen extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            code: 'DAMIAN',
            firstName: '',
            secu: ''
        }
    }

    handlePressRegister () {
        if (this.state.firstName === ''){
            return MessageBarManager.showAlert({
                alertType: 'error',
                title: 'Erreur',
                message: 'Merci de saisir un prénom'
            })
        } else {
            console.log('ok')
        }
    }

    render(){
        const {
            firstName,
            code,
            secu
        } = this.state

        return (
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                showsPagination={false}
                ref='mySwiper'
            >
                <View style={styles.slide1}>
                    <Text style={styles.text}>Code</Text>
                    <FormLabel>Code</FormLabel>
                    <FormInput
                        placeholder="Code"
                        placeholderTextColor='#dbdcdd'
                        underlineColorAndroid="#FFFFFF"
                        inputStyle={{color: '#FFFFFF'}}

                        ref='code'
                        value={code}
                        defaultValue={code}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(code) => this.setState({ code })}

                    />
                    <Query query={Queries.patient.auth.useRegisterCode} variables={{code: this.state.code}}>
                        {({ loading, error, data }) => {
                            if (loading) return <Text>"Loading..."</Text>;
                            if (error) return <Text>`Error! ${error.message}`</Text>;
                            if (data) return <View><Text>Vos données on bien été charger, merci de passer a l'étape suivante</Text><Button data={data.useRegisterCode} onPress={() => this.refs.mySwiper.scrollBy(1)} Title='Suivant'/></View>;

                        }}

                    </Query>
                </View>
                <View style={styles.slide2}>
                    <FormLabel>Prénom</FormLabel>
                    <FormInput
                        placeholder="Code"
                        placeholderTextColor='#dbdcdd'
                        underlineColorAndroid="#FFFFFF"
                        inputStyle={{color: '#FFFFFF'}}

                        ref='firstName'
                        value={firstName}
                        defaultValue={firstName}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(firstName) => this.setState({ firstName })}

                    />
                    <FormLabel>Nom</FormLabel>
                    <FormInput
                        placeholder="Code"
                        placeholderTextColor='#dbdcdd'
                        underlineColorAndroid="#FFFFFF"
                        inputStyle={{color: '#FFFFFF'}}

                        ref='firstName'
                        value={firstName}
                        defaultValue={firstName}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(firstName) => this.setState({ firstName })}

                    />
                    <FormLabel>Nom de naissance</FormLabel>
                    <FormInput
                        placeholder="Code"
                        placeholderTextColor='#dbdcdd'
                        underlineColorAndroid="#FFFFFF"
                        inputStyle={{color: '#FFFFFF'}}

                        ref='firstName'
                        value={firstName}
                        defaultValue={firstName}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(firstName) => this.setState({ firstName })}

                    />
                    <FormLabel>Firstname</FormLabel>
                    <FormInput
                        placeholder="Code"
                        placeholderTextColor='#dbdcdd'
                        underlineColorAndroid="#FFFFFF"
                        inputStyle={{color: '#FFFFFF'}}

                        ref='firstName'
                        value={firstName}
                        defaultValue={firstName}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(firstName) => this.setState({ firstName })}

                    />
                    <FormLabel>Numéro de sécurité social</FormLabel>
                    <FormInput
                        placeholder="secu"
                        placeholderTextColor='#dbdcdd'
                        underlineColorAndroid="#FFFFFF"
                        inputStyle={{color: '#FFFFFF'}}

                        ref='firstName'
                        value={secu}
                        defaultValue={secu}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(secu) => this.setState({ secu })}

                    />
                    <FormLabel>Mot de passe</FormLabel>
                    <FormInput
                        placeholder="Code"
                        placeholderTextColor='#dbdcdd'
                        underlineColorAndroid="#FFFFFF"
                        inputStyle={{color: '#FFFFFF'}}

                        ref='firstName'
                        value={firstName}
                        defaultValue={firstName}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(firstName) => this.setState({ firstName })}

                    />
                    <FormLabel>Confirmation du mot de passe</FormLabel>
                    <FormInput
                        placeholder="Code"
                        placeholderTextColor='#dbdcdd'
                        underlineColorAndroid="#FFFFFF"
                        inputStyle={{color: '#FFFFFF'}}

                        ref='firstName'
                        value={firstName}
                        defaultValue={firstName}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(firstName) => this.setState({ firstName })}

                    />
                    <Button onPress={this.handlePressRegister.bind(this)} title='Register' />
                </View>
            </Swiper>
        );
    }
}


export default RegisterScreen
