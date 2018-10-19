import { __doctorSchema } from './user.queries'
import { graphqlize } from './_kit'

const __medicalEventSchema = `
      _id
      seenByPatient
      time
      eventType
      event: eventRef {
        ... on Ordonnance {
          fromDoctor {
            name
            avatarUrl
          }
          toPatient {
            name
            avatarUrl
          }
          fileUrl
          reportId {
            text
          }
          consultationId
        }
        ... on ConsultationReport {
          fromDoctor {
            name
            avatarUrl
          }
          toPatient {
            name
            avatarUrl
          }
          text
          ordonnances {
            fileUrl
          }
          isEmergency
          consultationId
        }
        ... on Appointment {
          fromUser {
            _id
            avatarUrl
            name
          }
          toUser {
            _id
            avatarUrl
            name
          }
          status
          time
          askedAt
          askedText
          answeredAt
          answeredText
        }
      }
    `

const markMedicalEventAsSeen = graphqlize(`
mutation markMedicalEventAsSeen($id: String!){
  markMedicalEventAsSeen(id: $id) {
  `
  + __medicalEventSchema +
  `
   }
}
`)


const getMedicalFile = graphqlize(`
query getMedicalFile ($patientId: String!, $offset: Int) {
  getMedicalFile (patientId: $patientId, offset: $offset) {
    mainDoctor {
    `
  + __doctorSchema +
  `
    }
    sharedWithDoctors {
    `
  + __doctorSchema +
  `
    }
    
    medicalEvents {
    `
  + __medicalEventSchema +
  `
    }
  }
}
`)


const getMyMedicalFile = graphqlize(`
query getMedicalFile ($offset: Int) {
  getMyMedicalFile (offset: $offset) {
    mainDoctor {
    `
  + __doctorSchema +
  `
    }
    sharedWithDoctors {
    `
  + __doctorSchema +
  `
    }
    
    medicalEvents {
    `
  + __medicalEventSchema +
  `
    }
  }
}
`)

export { markMedicalEventAsSeen, getMedicalFile, getMyMedicalFile }