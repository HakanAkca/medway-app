import React, { Component } from 'react';
import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo
} from 'react-native-twilio-video-webrtc'
import {Button, Text, TouchableOpacity, View, Image, StyleSheet} from "react-native";

import { Images, Colors } from '../Themes'
import CallButton from "../Components/CallButton";

class MedwayTwilio extends Component {
    state = {
        isAudioEnabled: true,
        isVideoEnabled: true,
        status: 'disconnected',
        participants: new Map(),
        videoTracks: new Map(),
        roomName: 'top',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzI3ODlhYWMzNjNmNDUzMDM5YThkMDdlNTE1NjQxNTA3LTE1Mzc1MzczMDEiLCJpc3MiOiJTSzI3ODlhYWMzNjNmNDUzMDM5YThkMDdlNTE1NjQxNTA3Iiwic3ViIjoiQUM1OTJiOTZiOTMxNjU5NjNhZjhiNTE2ZmQxNTc5NjE2YyIsImV4cCI6MTUzNzU0MDkwMSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiaGFrYW4iLCJ2aWRlbyI6eyJyb29tIjoidG9wIn19fQ.D4lRo5bPSkuGVWd0CmQtyT8pZGT6F12PDcFR585QyK4'
    }

    _onConnectButtonPress = () => {
        this.refs.twilioVideo.connect({ roomName: this.state.roomName, accessToken: this.state.token })
        this.setState({status: 'connecting'})
    }

    _onEndButtonPress = () => {
        this.refs.twilioVideo.disconnect()
    }

    _onMuteButtonPress = () => {
        this.refs.twilioVideo.setLocalAudioEnabled(!this.state.isAudioEnabled)
            .then(isEnabled => this.setState({isAudioEnabled: isEnabled}))
    }

    _onFlipButtonPress = () => {
        this.refs.twilioVideo.flipCamera()
    }

    _onRoomDidDisconnect = ({roomName, error}) => {
        console.log("ERROR: ", error)

        this.setState({status: 'disconnected'})
    }

    _onRoomDidFailToConnect = (error) => {
        console.log("ERROR: ", error)
        this.setState({status: 'disconnected'})
    }

    _onParticipantAddedVideoTrack = ({participant, track}) => {
        console.log("onParticipantAddedVideoTrack: ", participant, track)

        this.setState({
            videoTracks: new Map([
                ...this.state.videoTracks,
                [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]
            ]),
        });
    }

    _onParticipantRemovedVideoTrack = ({participant, track}) => {
        console.log("onParticipantRemovedVideoTrack: ", participant, track)

        const videoTracks = this.state.videoTracks
        videoTracks.delete(track.trackSid)

        this.setState({videoTracks: { ...videoTracks }})
    }

    render() {
        return (
            <View>
                {
                    <CallButton onPress={() => this._onConnectButtonPress()} />
                }
                {
                    (this.state.status === 'connected' || this.state.status === 'connecting') &&
                    <View>
                        {
                            this.state.status === 'connected' &&
                            <View>
                                {
                                    Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
                                        return (
                                            <TwilioVideoParticipantView
                                                key={trackSid}
                                                trackIdentifier={trackIdentifier}
                                            />
                                        )
                                    })
                                }
                            </View>
                        }
                        <TwilioVideoLocalView
                            enabled={true}
                        />
                        <View
                            >
                            <TouchableOpacity
                                style={[styles.optionButton, {backgroundColor: 'red'}]}
                                onPress={this._onEndButtonPress}>
                                <Image source={Images.hangup} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, {backgroundColor: 'white'}]}
                                onPress={this._onMuteButtonPress}>
                                <Image source={this.state.isAudioEnabled ? Images.microphone : Images.muted_microphone} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionButton, {backgroundColor: 'white'}]}
                                onPress={this._onFlipButtonPress}>
                                <Image source={Images.flip} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                <TwilioVideo
                    ref="twilioVideo"
                    onRoomDidConnect={ this._onRoomDidConnect }
                    onRoomDidDisconnect={ this._onRoomDidDisconnect }
                    onRoomDidFailToConnect= { this._onRoomDidFailToConnect }
                    onParticipantAddedVideoTrack={ this._onParticipantAddedVideoTrack }
                    onParticipantRemovedVideoTrack= { this._onParticipantRemovedVideoTrack }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353738'
    },
    callContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    },
    button: {
        marginTop: 100
    },
    localVideo: {
        flex: 1,
        width: 150,
        height: 200,
        position: 'absolute',
        right: 0,
        top: 0
    },
    remoteGrid: {
        flex: 1
    },
    remoteVideo: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    },
    optionsContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
        backgroundColor: 'rgba(52, 52, 52, 0.0)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionButton: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionButtonLabel: {
        fontSize: 12,
        color: '#323435'
    },
    waitingLabel: {
        textAlign: 'center',
        color: Colors.steel,
        margin: 20,
        fontSize: 18
    },
    waitingSpinner: {
        margin: 40
    },
    waitingContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 110
    }
})


export default MedwayTwilio