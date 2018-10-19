import React, { Component } from 'react'
import { View, Text } from 'react-native'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Card, Icon, Avatar, Divider } from 'react-native-elements'

import { signOut } from '../Api/Util'
import styles from './Styles/DoctorScreenStyle'
import InfoRow from '../Components/InfoRow'

const DOCTOR_LIST = gql`
  {
    getRelatedDoctors	{
        _id
        name
        avatarUrl
        role
        expertise
        rpps
        active
        isAppointmentOnly
    }
  }
`

class DoctorListScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      index: 0
    }

    this._navigateTo = this._navigateTo.bind(this)
  }

  _navigateTo (pageName, params) {
    this.props.navigation.navigate(pageName, params)
  }

  _renderItem ({item}) {
    return (
      <View style={{marginTop: 30, marginLeft: 15}}>
        <Card containerStyle={{height: 500}}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <Text style={{fontSize: 25}}>
              {item.name}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Avatar
              rounded
              xlarge
              source={{uri: item.avatarUrl}}
            />
          </View>
          <Divider style={{backgroundColor: 'lightgrey', width: 350, marginTop: 10}}/>
          <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{alignItems: 'center'}}>
              <Icon
                raised
                name='heartbeat'
                type='font-awesome'
                color='#f50'

                onPress={() => this._navigateTo('AppointmentBooking', {appointment: item})}
              />
              <Text>Rendez-vous</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Icon
                raised
                name='heartbeat'
                type='font-awesome'
                color='#f50'
              />
              <Text>Appel visio</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Icon
                raised
                name='heartbeat'
                type='font-awesome'
                color='#f50'
              />
              <Text>Contact</Text>
            </View>
          </View>
          <Divider style={{backgroundColor: 'lightgrey', width: 350, marginTop: 10, marginBottom: 10}}/>
          <InfoRow name="Expertise" value={item.expertise}/>
          <InfoRow name="RPPS" value={item.rpps}/>
          <InfoRow name="Disponible" value={item.active ? 'Oui' : 'Non'}/>
          <InfoRow name="Sur rendez-vous" value={item.isAppointmentOnly ? 'Oui' : 'Non'}/>
        </Card>
      </View>
    )
  }

  render () {

    return (
      <Query query={DOCTOR_LIST} pollInterval={10000}>
        {({loading, error, data}) => {
          if (loading) return <Text>"Loading..."</Text>
          if (error) return <Text>`Error! ${error.message}`</Text>

          return (
            <View>
              <Carousel layout={'tinder'} layoutCardOffset={19}
                        key={'carousel'}
                        data={data.getRelatedDoctors}
                        renderItem={this._renderItem.bind(this)}
                        sliderWidth={400}
                        sliderHeight={400}
                        itemWidth={400}
                        itemHeight={400}
                        ref={(c) => { this._carousel = c }}
                        onSnapToItem={(index) => this.setState({index})}

              />
              <Pagination
                dotsLength={data.getRelatedDoctors.length}
                activeDotIndex={this.state.index}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={!!this._carousel}
                renderDots={activeIndex => (
                  data.getRelatedDoctors.map((doctor, i) => (
                    <View
                      style={{flex: 1, alignItems: 'center'}}
                      key={i}
                    >
                      <Avatar
                        small
                        rounded
                        onPress={() => this._carousel.snapToItem(i)}
                        source={{uri: doctor.avatarUrl}}
                        activeOpacity={activeIndex === i ? 1 : 0.5}
                      />
                    </View>
                  ))
                )}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default DoctorListScreen