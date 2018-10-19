import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

import styles from './Styles/OrderScreenStyle'


class ReportScreen extends React.Component {

    constructor(props) {
        super(props);

        this._navigateTo = this._navigateTo.bind(this);

        console.log(this.props.navigation.state.params.report)
    }

    _navigateTo(pageName, params) {
        this.props.navigation.navigate(pageName, params)
    }

    render () {
        const report = this.props.navigation.state.params.report;
        return(
            <View style={{paddingBottom: 100}}>
                {
                    report.isEmergency &&
                    <View style={styles.reportEmergencyContainer}>
                        <Text style={styles.reportEmergencyTitle}>{"Il s'agit d'une urgence !".toUpperCase()}</Text>
                    </View>}
                {
                    report.text &&
                    <View style={styles.reportInfoContainer} >
                        <View style={styles.reportHeaderContainer}>
                            <Text style={styles.reportHeaderTitle}>{'Rapport du médecin'.toUpperCase()}</Text>
                        </View>
                        <Text style={styles.reportText}>
                            {report.text}
                        </Text>
                    </View>
                }
                <View style={styles.reportInfoContainer} >
                    <View style={styles.reportHeaderContainer}>
                        <Text style={styles.reportHeaderTitle}>{'Ordonnances'.toUpperCase()}</Text>
                    </View>
                    <View style={styles.ordonnanceBlock}>
                        {
                            report.ordonnances.length > 0 ? (
                                <View>
                                    <Text style={styles.ordonnanceText}>{report.ordonnances.length + " ordonnance" + (report.ordonnances.length > 1 ? 's sont' : ' est') + " disponible" + (report.ordonnances.length > 1 ? 's' : '') + ". Cliquez sur l'icône suivant pour " + (report.ordonnances.length > 1 ? 'les ' : "l'") + "afficher. Vous " + (report.ordonnances.length > 1 ? 'les ' : "l'") + "avez également reçue" + (report.ordonnances.length > 1 ? 's' : "") + " par email."}</Text>
                                    <View style={styles.viewIconContainer}>
                                        <View style={styles.viewIcon}>
                                            <Icon
                                                name="account-settings-variant"
                                                type="material-community"
                                                size={24}
                                                onPress={() => this._navigateTo('Ordonnance', { ordonnances: report})}
                                            />
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.ordonnanceBlock}>
                                    <Text style={styles.ordonnanceText}>{"Votre médecin n'a pas encore édité d'ordonnance pour ce rendez-vous."}</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
        );
    }
}


export default ReportScreen
