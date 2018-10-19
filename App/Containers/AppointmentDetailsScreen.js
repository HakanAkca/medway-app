import React, { Component } from 'react'
import {
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
    TouchableHighlight,
} from 'react-native'
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';
import { format } from 'tech-services-time'

import {ColorSet } from '../Themes'
import LightButton from '../../../patient-mobile-app/App/Components/LightButton'
import Styles from './Styles/AppointmentDetailsScreenStyle'
import { get } from "../Api/Util";
import Doctor from './DoctorScreen';


const SET_ANSWER_APPOINTMENT = gql`
    mutation appointment ($appointmentId: String!, $answer: Boolean! ,$answerText: String!) {
      answerAppointment(appointmentId: $appointmentId, answer: $answer, answerText: $answerText) {
        status
      }
    }
`;


const SET_CANCEL_APPOINTMENT = gql`
    mutation appointment ($appointmentId: String!, $cancelText: String!) {
      cancelAppointment(appointmentId: $appointmentId, cancelText: $cancelText) {
        status
      }
    }
`;

const Types = {
    UPCOMING: 'upcoming',
    UNANSWERED: 'unanswered',
    UNANSWERED_BY_DEST: 'unanswered_by_dest',
    CANCELED: 'canceled',
    DECLINED: 'declined'
};

class AppointmentDetailsScreen extends Component {

    constructor (props) {
        super(props);

        this.state = {
            isTextModalVisible: false,
            text: '',
            cancel: false,
            past: props.navigation.state.params.past
        }

        this._navigateTo = this._navigateTo.bind(this);
    }

    _navigateTo(pageName, params) {
        this.props.navigation.navigate(pageName, params)
    }

    async resolveAppointmentType () {
        const appointment = this.props.navigation.state.params.appointment
        if (appointment.status === 'set') return Types.UPCOMING
        if (appointment.status === 'asked' && appointment.toUser._id === await get("USER_ID")) return Types.UNANSWERED
        if (appointment.status === 'asked' && appointment.toUser._id !== await get("USER_ID")) return Types.UNANSWERED_BY_DEST
        if (appointment.status === 'canceled') return Types.CANCELED
        if (appointment.status === 'declined') return Types.DECLINED
        return Types.CANCELED
    }

    async componentWillMount () {
        this.setState({
            userId: await get("USER_ID"),
            type: await this.resolveAppointmentType()
        })
    }

    _onChangeText (text) {
        this.setState({text: text})
    }

    _onConfirmText () {
        this.setState({ isTextModalVisible: false })

    }

    handlePress(appointment) {
        appointment().then(res => {
            console.log(res)
        })
    }

    resolveModalMessage () {
        if (this.state.cancel) return 'Indiquez votre motif d\'annulation'
        if (this.state.answer) return 'Laissez un message de validation'
        if (!this.state.answer) return 'Indiquez votre motif de refus'
    }

    render () {
        const appointment = this.props.navigation.state.params.appointment;
        const datetime = appointment.time;
        const type = this.state.type;
        const PAST = this.state.past;
        const otherUser = appointment.toUser._id === this.state.userId ? appointment.fromUser : appointment.toUser;

        return (
            <ScrollView style={Styles.mainContainer}>
                <Doctor user={otherUser} />

                <View style={Styles.appointmentDateContainer}>
                    <Text style={Styles.appointmentDate}>{format(new Date(datetime.time), true)}</Text>
                </View>
                <View style={Styles.appointmentStatusContainer}>
                    <Text style={Styles.appointmentStatus}>{appointment.status ? 'Répondu' : 'En attente de réponse'}</Text>
                </View>
                {
                    type === Types.UNANSWERED && !PAST &&
                    <View style={Styles.actionButtonsRow}>
                        <TouchableOpacity style={[Styles.roundedButton, Styles.validateButton]} onPress={() => this.setState({isTextModalVisible: true, answer: true})}>
                            <Text style={Styles.validateText}>Accepter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Styles.roundedButton, Styles.declineButton]} onPress={() => this.setState({isTextModalVisible: true, answer: false})}>
                            <Text style={Styles.declineText}>Décliner</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    (type === Types.UPCOMING || type === Types.UNANSWERED_BY_DEST) && !PAST &&
                    <View style={Styles.actionButtonsRow}>
                        <TouchableOpacity style={[Styles.roundedButton, Styles.declineButton]} onPress={() => this.setState({isTextModalVisible: true, cancel: true})}>
                            <Text style={Styles.declineText}>Annuler</Text>
                        </TouchableOpacity>
                    </View>

                }
                <View style={Styles.appointmentTextContainer}>
                    <View style={Styles.appointmentHeaderContainer}>
                        <Text style={Styles.appointmentHeaderTitle}>{'MOTIF DU RENDEZ-VOUS'.toUpperCase()}</Text>
                    </View>
                    <Text style={Styles.appointmentText}>{appointment.askedText}</Text>
                </View>
                {
                    type === Types.DECLINED &&
                    <View style={Styles.appointmentTextContainer}>
                        <View style={Styles.appointmentHeaderContainer}>
                            <Text style={Styles.appointmentHeaderTitle}>{'MOTIF DE REFUS'.toUpperCase()}</Text>
                        </View>
                        <Text style={Styles.appointmentText}>{appointment.answeredText}</Text>
                    </View>
                }
                {
                    type === Types.UPCOMING &&
                    <View style={Styles.appointmentTextContainer}>
                        <View style={Styles.appointmentHeaderContainer}>
                            <Text style={Styles.appointmentHeaderTitle}>{'MESSAGE DE VALIDATION'.toUpperCase()}</Text>
                        </View>
                        <Text style={Styles.appointmentText}>{appointment.answeredText}</Text>
                    </View>
                }
                {
                    type === Types.CANCELED &&
                    <View style={Styles.appointmentTextContainer}>
                        <View style={Styles.appointmentHeaderContainer}>
                            <Text style={Styles.appointmentHeaderTitle}>{'MOTIF D\'ANNULATION'.toUpperCase()}</Text>
                        </View>
                        <Text style={Styles.appointmentText}>{appointment.canceledText}</Text>
                    </View>
                }

                <Modal
                    visible={this.state.isTextModalVisible}
                    animationType={'slide'}
                    transparent
                    onRequestClose={() => this.setState({isTextModalVisible: false})}
                    onDismiss={() => this.setState({isTextModalVisible: false})}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.33)'}}>
                        <View style={Styles.modal} contentContainerStyle={{alignItems: 'center'}}>
                            <TouchableHighlight
                                onPress={() => this.setState({isTextModalVisible: false})}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                            <Text style={Styles.text}>{this.resolveModalMessage()}</Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                value={this.state.text}
                                onChangeText={this._onChangeText.bind(this)}
                                style={Styles.textArea}
                                returnKeyType='done'
                                onSubmitEditing={this._onConfirmText.bind(this)}
                            />
                            <Mutation mutation={type === Types.UNANSWERED ? SET_ANSWER_APPOINTMENT : SET_CANCEL_APPOINTMENT} variables={ type === Types.UNANSWERED ? {appointmentId: appointment._id, answer: this.state.answer, answerText: this.state.text} : {appointmentId: appointment._id, cancelText: this.state.text}}>
                                {(appointment, {}) => (
                                <LightButton
                                    text="Confirmer"
                                    width={180}
                                    height={40}
                                    fontSize={16}
                                    spacing={1.2}
                                    textColor={ColorSet.TextLight}
                                    color={ColorSet.Primary}
                                    borderColor={ColorSet.TextLight}
                                    style={{marginTop: 30}}
                                    onSubmitEditing={this._onConfirmText.bind(this)}
                                    onPress={() => this.handlePress(appointment)}
                                />
                                )}
                            </Mutation>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

export default AppointmentDetailsScreen
