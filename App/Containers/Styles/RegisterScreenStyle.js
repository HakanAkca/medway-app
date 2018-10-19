// @flow

import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
    mainContainer: {
       // flex: 1,
        backgroundColor: Colors.background
    },
    container: {
        backgroundColor: Colors.background
        // flex: 1
    },
    form: {
        backgroundColor: Colors.background,
        marginHorizontal: Metrics.baseMargin * 2,
        borderRadius: 4,
    },
    row: {
        paddingVertical: Metrics.baseMargin,
        paddingHorizontal: Metrics.baseMargin,
        height: 90
    },
    rowLabel: {
        color: Colors.charcoal
    },
    rowDate: {
        paddingVertical: Metrics.baseMargin,
        paddingHorizontal: Metrics.baseMargin,
        // alignSelf: 'center'
        //alignItems: 'center'
        marginLeft: 19,
        marginTop: 5
    },
    rowPicker: {
        paddingVertical: Metrics.doubleBaseMargin,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: 90
    },
    textInput: {
        height: 40,
        color: Colors.coal
    },
    textInputReadonly: {
        height: 40,
        color: Colors.steel
    },
    loginRow: {
        paddingBottom: Metrics.doubleBaseMargin,
        paddingHorizontal: Metrics.doubleBaseMargin,
        flexDirection: 'row'
    },
    loginText: {
        textAlign: 'center',
        color: Colors.silver
    },
    topLogo: {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: Metrics.images.large,
        width: Metrics.screenWidth
    },
    sentence: {
        paddingHorizontal: Metrics.doubleBaseMargin,
        // flexDirection: 'row',
        // alignItems: 'center',
        textAlign: 'center'
    },
    registerButton: {
        width: Metrics.screenWidth,
        borderRadius: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 2
    },
    cgu: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: Metrics.baseMargin * 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cguText: {
        color: Colors.ember
    }
})
