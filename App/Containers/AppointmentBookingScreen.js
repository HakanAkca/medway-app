import React, { Component } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";


import {ColorSet} from '../Themes'

import Styles from './Styles/AppointmentBookingScreenStyle'
import MomentFromDate from '../Transforms/MomentFromDate'
import Time from '../Services/Time'
import LightButton from '../../../patient-mobile-app/App/Components/LightButton'
import { get } from "../Api/Util";
import moment from "moment";

const MessageBarManager = require('react-native-message-bar').MessageBarManager;

const SET_APPOINTMENT = gql`
    mutation appointment ($toUser: String!, $time: String!, $text: String!) {
      askAppointment(toUser: $toUser, time: $time , text: $text) {
        status
      }
    }
`;


class AppointmentBookingScreen extends Component {

    state = {
        calendarSelected: Object,
        isDateTimePickerVisible: Boolean,
        timeSelected: Object,
        finalTime: Object,
        isDateSelected: Boolean,
        isTimeSelected: Boolean,
        isTextModalVisible: Boolean,
        text: String
    };

    constructor (props) {
        super(props);
        this.state = {
            calendarSelected: new Date(),
            isDateTimePickerVisible: false,
            timeSelected: new Date(),
            finalTime: {empty: true},
            isDateSelected: false,
            isTimeSelected: false,
            isTextModalVisible: false,
            text: '',
            minuteInterval: 5,
            params: props.navigation.state.params
        };

        LocaleConfig.locales['fr'] = {
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
            dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
            dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
        };
        LocaleConfig.defaultLocale = 'fr'
    }

    componentDidMount () {
    }

    _onDayPress (day) {
        this.setState({
            calendarSelected: day.dateString,
            isDateSelected: true
        });
        this.formatFinalTime(day.dateString, this.state.timeSelected);
        this.setState({isDateTimePickerVisible: true});
        setTimeout(() => this.setState({minuteInterval: 5}), 10)
    }

    _onMonthChanged (month) {

    }

    _onTimePicked (time) {
        this.setState({
            isDateTimePickerVisible: false,
            timeSelected: time,
            isTimeSelected: true
        });
        setTimeout(() => this.setState({minuteInterval: 1}), 300);
        this.formatFinalTime(this.state.calendarSelected, time)
    }

    _onAfterTimePicked () {
        this.setState({isTextModalVisible: true})
    }

    _onTimeCanceled () {
        this.setState({isDateTimePickerVisible: false});
        setTimeout(() => this.setState({minuteInterval: 1}), 300)
    }
    _onChangeText (text) {
        this.setState({text: text})
    }

    _onConfirmText () {
        if (this.state.text && this.state.text !== '') {
            this.setState({
                isTextModalVisible: false
            })
        } else {
            MessageBarManager.showAlert({
                alertType: 'error',
                title: 'Erreur',
                message: 'Entrez un motif de rendez-vous'
            })
        }
    }

    handlePress(appointment) {
        appointment().then(res => {
            console.log(res)
        })
    }

    formatFinalTime (_day, _hour) {
        const day = MomentFromDate(_day, 1);
        const hour = MomentFromDate(_hour, 1);
        _day = new Date(_day)
        _hour = new Date(_hour)
        const time = {
            day: day.day,
            month: day.month,
            year: day.year,
            hour: hour.hour,
            minutes: hour.minutes,
            seconds: hour.seconds
        };
        time.prettyPrint = Time(time.day, time.month, time.year, time.hour, time.minutes, time.seconds);
        this.setState({finalTime: time, timeToSend: new Date(_day.getFullYear(), _day.getMonth(), _day.getDate(), _hour.getHours(), _hour.getMinutes(), 0, 0)})
    }

    render () {
        return (
            <KeyboardAwareScrollView style={Styles.container}>

                <View style={Styles.section}>
                    <Text style={Styles.tagline}>{ this.state.isTimeSelected ? 'CONFIRMEZ VOTRE RENDEZ-VOUS' : 'CHOISISSEZ UNE DATE' }</Text>
                </View>

                <View style={Styles.sectionCalendar}>
                    <Calendar
                        minDate={new Date()}
                        onDayPress={this._onDayPress.bind(this)}
                        monthFormat={'MMMM yyyy'}
                        onMonthChange={this._onMonthChanged}
                        hideExtraDays
                        firstDay={1}
                        markedDates={{[this.state.calendarSelected]: {selected: true}}}
                    />
                </View>

                <Modal
                    visible={this.state.isTextModalVisible}
                    animationType={'slide'}
                    transparent
                    onDismiss={() => this.setState({isTextModalVisible: false})}>
                    <View style={Styles.modal} contentContainerStyle={{alignItems: 'center'}}>
                        <Text style={Styles.text}>Indiquez le motif de votre rendez-vous</Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            value={this.state.text}
                            onChangeText={this._onChangeText.bind(this)}
                            style={Styles.textArea}
                            returnKeyType='done'
                            onSubmitEditing={this._onConfirmText.bind(this)}
                        />
                        <LightButton
                            onPress={this._onConfirmText.bind(this)}
                            text='Confirmer'
                            width={180}
                            height={40}
                            fontSize={18}
                            spacing={1.2}
                            textColor={ColorSet.TextLight}
                            color={ColorSet.Primary}
                            borderColor={ColorSet.TextLight}
                            style={{marginTop: 30}}
                        />
                    </View>
                </Modal>

                {
                    (this.state.isTimeSelected) &&
                    <View style={Styles.timeChosenContainer}>
                        <Text style={Styles.timeChosenTagline}>Rendez-vous le</Text>
                        <Text style={Styles.timeChosen}>{this.state.finalTime.prettyPrint.substring(0, this.state.finalTime.prettyPrint.length - 8) + ' à ' + this.state.finalTime.prettyPrint.substring(this.state.finalTime.prettyPrint.length - 5)}</Text>
                        <TouchableOpacity onPress={this._onAfterTimePicked.bind(this)}>
                            <Text style={Styles.infoMotif}>{this.state.text === '' ? 'Aucun motif renseigné' : 'Motif: ' + this.state.text}</Text>
                            <Text style={Styles.infoMotifCliquable}>(Cliquez ici pour modifier le motif)</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    (this.state.isTimeSelected) &&
                    <View style={Styles.actions}>
                        <Mutation mutation={SET_APPOINTMENT} variables={{ toUser: this.state.params._id, time: this.state.timeToSend, text: this.state.text }}>
                            {(appointment, {}) => (
                        <LightButton
                            onPress={() => this.handlePress(appointment)}
                            text='Confirmer'
                            width={180}
                            height={40}
                            fontSize={18}
                            spacing={1.2}
                            textColor={ColorSet.TextLight}
                            color={ColorSet.Primary}
                            borderColor={ColorSet.TextLight}
                            style={{marginBottom: 30}}
                        />
                            )}
                        </Mutation>
                    </View>
                }
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._onTimePicked.bind(this)}
                    onCancel={this._onTimeCanceled.bind(this)}
                    is24Hour
                    neverDisableConfirmIOS
                    minuteInterval={this.state.minuteInterval}
                    mode='time'
                    cancelTextIOS='Retour'
                    confirmTextIOS='Confirmer'
                    titleIOS="Choisir l'heure"
                    onHideAfterConfirm={this._onAfterTimePicked.bind(this)}
                />
            </KeyboardAwareScrollView>

        )
    }
}

export default AppointmentBookingScreen
