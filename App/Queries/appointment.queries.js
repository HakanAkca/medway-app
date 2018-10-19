import { graphqlize } from './_kit'

const __appointmentSchema = `
    _id
    fromUser { 
      name
      _id
    }
    toUser { 
      name
      _id
    }
    status
    time
    askedAt
    askedText
    answeredAt
    answeredText
    canceledAt
    canceledText
`

const getCanceledUpcomingAppointments = graphqlize(`
query getCanceledUpcomingAppointments($offset: Int) {
  getCanceledUpcomingAppointments(offset: $offset){
  `
  + __appointmentSchema +
  `
   }
}
`)

const getUpcomingAppointments = graphqlize(`
query getUpcomingAppointments($offset: Int) {
  getUpcomingAppointments(offset: $offset) {
  `
  + __appointmentSchema +
  `
  }
}
`)

const getUnansweredUpcomingAppointments = graphqlize(`
query getUnansweredUpcomingAppointments($offset: Int) {
  getUnansweredUpcomingAppointments(offset: $offset) {
  `
  + __appointmentSchema +
  `
  }
}
`)

const getUnansweredByDestUpcomingAppointments = graphqlize(`
query getUnansweredByDestUpcomingAppointments($offset: Int) {
  getUnansweredByDestUpcomingAppointments(offset: $offset) {
  `
  + __appointmentSchema +
  `
  }
}
`)

const getPastAppointments = graphqlize(`
query getPastAppointments($offset: Int) {
  getPastAppointments(offset: $offset) {
  `
  + __appointmentSchema +
  `
  }
}
`)

const askAppointment = graphqlize(`
  mutation askAppointment ($toUser: String!, $time: String!, $text: String!) {
      askAppointment(toUser: $toUser, time: $time, text: $text) {
    `
  + __appointmentSchema +
    `
    }
  }
`)

const cancelAppointment = graphqlize(`
mutation cancelAppointment ($appointmentId: String!, $cancelText: String!) {
      cancelAppointment(appointmentId: $appointmentId, cancelText: $cancelText) {
    `
  + __appointmentSchema +
  `
    }
  }
`)

const answerAppointment = graphqlize(`
mutation answerAppointment ($appointmentId: String!, $answer: Boolean!, $answerText: String!) {
      answerAppointment(appointmentId: $appointmentId, answer: $answer, answerText: $answerText) {
    `
  + __appointmentSchema +
  `
    }
  }
`)

export {
  getCanceledUpcomingAppointments,
  getUpcomingAppointments,
  getUnansweredUpcomingAppointments,
  getUnansweredByDestUpcomingAppointments,
  getPastAppointments,
  askAppointment,
  cancelAppointment,
  answerAppointment
}