import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Query } from "react-apollo";
import { ListItem, Avatar } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import { format } from 'tech-services-time'

import Styles from "./Styles/AppointmentScreenStyle";
import Queries from '../Queries';

class AppointmentScreen extends Component {


    constructor(props) {
        super(props);

        this.state = {
            rerenderAfterMount: false,
            activeSection: 0
        };

        this._navigateTo = this._navigateTo.bind(this);
    }

    componentDidMount(newProps) {
        this.setState({rerenderAfterMount: true, activeSection: this.SECTIONS[0].content.length > 0 ? 0 : 1})
    }

    _navigateTo(pageName, params) {
        this.props.navigation.navigate(pageName, params)
    }

    SECTIONS = [
        {
            title: 'Rendez-vous sans réponses',
            content: {
                query: Queries.patient.appointment.getUnansweredUpcomingAppointments,
                renderer: this.getUnansweredUpcomingAppointments,
                length: 0,
                key: 'getUnansweredUpcomingAppointments'
            }
        },
        {
            title: 'Rendez-vous validés',
            content: {
                query: Queries.patient.appointment.getUpcomingAppointments,
                renderer: this.getUpcomingAppointments,
                length: 0,
                key: 'getUpcomingAppointments'
            }
        },
        {
            title: 'Rendez-vous proposés en attente de réponses',
            content: {
                query: Queries.patient.appointment.getUnansweredByDestUpcomingAppointments,
                renderer: this.getUnansweredByDestUpcomingAppointments,
                length: 0,
                key: 'getUnansweredByDestUpcomingAppointments'
            }
        },
        {
            title: 'Annulés',
            content: {
                query: Queries.patient.appointment.getCanceledUpcomingAppointments,
                renderer: this.getCanceledUpcomingAppointments,
                length: 0,
                key: 'getCanceledUpcomingAppointments'
            }
        },
    ];

    _renderHeader(section) {
        return (
            <View style={Styles.appointmentTextContainer}>
                <View style={Styles.appointmentHeaderContainer}>
                    <Text style={Styles.appointmentHeaderTitle}>{section.title + ' ' + '(' + section.content.length + ')'}</Text>
                </View>
            </View>
        );
    }

    getUnansweredUpcomingAppointments (loading, error, data, fetchMore) {
        if (loading) return <Text>"Loading..."</Text>;
        if (error) return <Text>`Error! ${error.message}`</Text>;

        return (
            <ScrollView>
                <FlatList
                    keyExtractor={(data, index) => index}
                    onEndReachedThreshold={0.1}
                    onEndReached={() =>
                        (
                            fetchMore({
                                variables: {
                                    offset: data.getUnansweredUpcomingAppointments.length
                                },
                                updateQuery: (prev, { fetchMoreResult }) => {
                                    if (!fetchMoreResult) return prev;
                                    return Object.assign({}, prev, {
                                        getUnansweredUpcomingAppointments: [...prev.getUnansweredUpcomingAppointments, ...fetchMoreResult.getUnansweredUpcomingAppointments]
                                    });
                                }
                            })
                        )}

                    data={data.getUnansweredUpcomingAppointments}
                    renderItem={({item}) => (
                        <ListItem
                            key={item._id}
                            avatar={
                                <Avatar
                                    large
                                    rounded
                                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                                    activeOpacity={0.7}
                                />
                            }
                            title={item.fromUser.name}
                            subtitle={format(new Date(item.time), true)}
                            onPress={() => this._navigateTo('AppointmentDetails', { appointment: item })}

                        />
                    )}>

                </FlatList>
            </ScrollView>
        );
    }

    getUpcomingAppointments (loading, error, data, fetchMore) {
        if (loading) return <Text>"Loading..."</Text>;
        if (error) return <Text>`Error! ${error.message}`</Text>;

        return (
            <ScrollView>
            <FlatList
                keyExtractor={(data, index) => index}
                onEndReachedThreshold={0.1}
                onEndReached={() =>
                    (
                    fetchMore({
                        variables: {
                            offset: data.getUpcomingAppointments.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                                getUpcomingAppointments: [...prev.getUpcomingAppointments, ...fetchMoreResult.getUpcomingAppointments]
                            });
                        }
                    })
                )}

                data={data.getUpcomingAppointments}
                renderItem={({item}) => (
                    <ListItem
                        key={item._id}
                        avatar={
                            <Avatar
                                large
                                rounded
                                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                                activeOpacity={0.7}
                            />
                        }
                        title={item.fromUser.name}
                        subtitle={format(new Date(item.time), true)}
                        onPress={() => this._navigateTo('AppointmentDetails', { appointment: item })}

                    />
                )}>

            </FlatList>
            </ScrollView>
        );
    }

    getUnansweredByDestUpcomingAppointments (loading, error, data, fetchMore) {
        if (loading) return <Text>"Loading..."</Text>;
        if (error) return <Text>`Error! ${error.message}`</Text>;

        return (
            <FlatList
                keyExtractor={(item, index) => index}
                onEndReachedThreshold={0.5}
                onEndReached={() => (
                    fetchMore({
                        variables: {
                            offset: data.getUnansweredByDestUpcomingAppointments.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                                getUnansweredByDestUpcomingAppointments: [...prev.getUnansweredByDestUpcomingAppointments, ...fetchMoreResult.getUnansweredByDestUpcomingAppointments]
                            });
                        }
                    })
                )}

                data={data.getUnansweredByDestUpcomingAppointments}
                renderItem={({item}) => (
                    <ListItem
                        key={item._id}
                        avatar={
                            <Avatar
                                large
                                rounded
                                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                                activeOpacity={0.7}
                            />
                        }
                        title={item.fromUser.name}
                        subtitle={format(new Date(item.time), true)}
                        onPress={() => this._navigateTo('AppointmentDetails', { appointment: item })}

                    />
                )}>
            </FlatList>
        );
    }

    getCanceledUpcomingAppointments (loading, error, data, fetchMore) {
        if (loading) return <Text>"Loading..."</Text>;
        if (error) return <Text>`Error! ${error.message}`</Text>;

        return (
            <FlatList
                keyExtractor={(item, index) => index}
                onEndReachedThreshold={0.5}
                onEndReached={() => (
                    fetchMore({
                        variables: {
                            offset: data.getCanceledUpcomingAppointments.length
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                                getCanceledUpcomingAppointments: [...prev.getCanceledUpcomingAppointments, ...fetchMoreResult.getCanceledUpcomingAppointments]
                            });
                        }
                    })
                )}

                data={data.getCanceledUpcomingAppointments}
                renderItem={({item}) => (
                  <ListItem
                      key={item._id}
                      avatar={
                          <Avatar
                              large
                              rounded
                              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                              activeOpacity={0.7}
                          />
                      }
                      title={item.fromUser.name}
                      subtitle={format(new Date(item.time), true)}
                      onPress={() => this._navigateTo('AppointmentDetails', { appointment: item })}

                  />
            )}>
            </FlatList>
        );
    }

    _renderContent(section) {
        return (
                <Query query={section.content.query} variables={{offset: 0}}>
                    {({ loading, error, data, fetchMore}) => {
                        section.content.length = data && data[section.content.key] && data[section.content.key].length || 0;
                        const render = section.content.renderer.bind(this, loading, error, data, fetchMore);
                        return render()
                    }}
                </Query>

        );
    }


    render () {

        return (
            <Accordion
                sections={this.SECTIONS}
                initiallyActiveSection={this.state.activeSection}
                renderHeader={this._renderHeader.bind(this)}
                renderContent={this._renderContent.bind(this)}
            />
        )
    }
}



export default withNavigation(AppointmentScreen);