import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MainScreen from '../Containers/MainScreen';
import LoginScreen from '../Containers/LoginScreen';
import RegisterScreen from "../Containers/RegisterScreen";


export default AuthStack = createStackNavigator({
    Main: {
        screen: MainScreen,
    },
    Login: {
        screen: LoginScreen
    },
    Register: {
        screen: RegisterScreen
    },
    }, {
        headerMode: 'none',
        initialRouteName: 'Main',
});