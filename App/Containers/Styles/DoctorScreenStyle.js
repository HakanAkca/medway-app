import { StyleSheet } from 'react-native'
import { Colors, ColorSet, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,

    screen: {
        backgroundColor: Colors.background,
    },
    header: {
        marginHorizontal: 50,
        marginVertical: 15
    },
    headerText: {
        color: ColorSet.TextLight,
        fontSize: 18,
        letterSpacing: 0.3,
        textAlign: 'center',
        lineHeight: 18
    },
    profileContainer: {
        alignItems: 'center',
    },
    divider: {
        backgroundColor: Colors.snow,
        width: 350,
        marginTop: 20
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.background,
        marginTop: 10
    },
    action: {
        flex: 1,
        flexDirection: 'column'
    },
})
