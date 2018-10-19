import React, { Component, Fragment } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { formatDate } from 'tech-services-time'
import { Query } from 'react-apollo'
import Queries from '../Queries'

import Appointment from './MedicalFileAppointmentRow'
import Report from './MedicalFileConsultationReportRow'
import Ordonnance from './MedicalFileOrdonnanceRow'
import MedicalFileTimeIndicator from './MedicalFileTimeIndicator'

class MedicalFileScreen extends Component {

  render () {
    return (
      <View>
        <Query query={Queries.patient.medicalFile.getMyMedicalFile} pollInterval={10000}>
          {({loading, error, data}) => {
            if (loading) return <Text>"Loading..."</Text>
            if (error) return <Text>`Error! ${error.message}`</Text>
            let date, isNew

            return (
              <ScrollView>
                <View>
                  {
                    data.getMyMedicalFile.medicalEvents.map(event => {
                        isNew = false
                        if (formatDate(event.time) !== date) {
                          date = formatDate(event.time)
                          isNew = true
                        }
                        let time = <Fragment/>
                        if (isNew)
                          time = <MedicalFileTimeIndicator time={date}/>

                        switch (event.eventType) {
                          case 'Ordonnance':
                            return (
                              <View>
                                {time}
                                <Ordonnance key={event._id} data={event.event}/>
                              </View>)
                          case 'Appointment':
                            return (
                              <View>
                                {time}
                                <Appointment key={event._id} data={event.event}/>
                              </View>)
                          case 'ConsultationReport':
                            return (
                              <View>
                                {time}
                                <Report key={event._id} data={event.event}/>
                              </View>)
                          default:
                            return <Fragment/>
                        }
                      }
                    )
                  }
                </View>
              </ScrollView>
            )
          }}
        </Query>
      </View>
    )
  }
}

export default MedicalFileScreen
