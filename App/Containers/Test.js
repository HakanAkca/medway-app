import React, { Component } from 'react';
import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo
} from 'react-native-twilio-video-webrtc'
import {Button, Text, TextInput, TouchableOpacity, View} from "react-native";

class Test extends Component {
    state = {
        isAudioEnabled: true,
        isVideoEnabled: true,
        status: 'disconnected',
        participants: new Map(),
        videoTracks: new Map(),
        roomName: '',
        token: ''
    }

    _onConnectButtonPress = () => {
        this.refs.twilioVideo.connect({ roomName: 'top', accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzI3ODlhYWMzNjNmNDUzMDM5YThkMDdlNTE1NjQxNTA3LTE1MzczNzYxMTAiLCJpc3MiOiJTSzI3ODlhYWMzNjNmNDUzMDM5YThkMDdlNTE1NjQxNTA3Iiwic3ViIjoiQUM1OTJiOTZiOTMxNjU5NjNhZjhiNTE2ZmQxNTc5NjE2YyIsImV4cCI6MTUzNzM3OTcxMCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiaGFrYW4iLCJ2aWRlbyI6eyJyb29tIjoidG9wIn19fQ.Sy49kDcSu9Atg5O7ehznK5UipTL3GPtPe-rsbVmLxB8' })
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
                    this.state.status === 'disconnected' &&
                    <View>
                        <Text>
                            React Native Twilio Video
                        </Text>
                        <TextInput
                            autoCapitalize='none'
                            value={this.state.roomName}
                            onChangeText={(text) => this.setState({roomName: text})}>
                        </TextInput>
                        <TextInput
                            autoCapitalize='none'
                            value={this.state.token}
                            onChangeText={(text) => this.setState({token: text})}>
                        </TextInput>
                        <Button
                            title="Connect"
                            onPress={this._onConnectButtonPress}>
                        </Button>
                    </View>
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
                        <View>
                            <TouchableOpacity
                                onPress={this._onEndButtonPress}>
                                <Text style={{fontSize: 12}}>End</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this._onMuteButtonPress}>
                                <Text style={{fontSize: 12}}>{ this.state.isAudioEnabled ? "Mute" : "Unmute" }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this._onFlipButtonPress}>
                                <Text style={{fontSize: 12}}>Flip</Text>
                            </TouchableOpacity>
                            <TwilioVideoLocalView
                                enabled={true}
                            />
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
export default Test