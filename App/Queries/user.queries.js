import { graphqlize } from './_kit'

const __userSchema = `
  _id
  firstName
  lastName
  middleName
  name
  email
  avatarUrl
  phoneNumber
  registerDate
  lastLoginDate
  oneSignalIds
  role
  `

const __patientSchema = __userSchema +
  `
  mainDoctor { name _id }
  sharedWithDoctors { name _id }
  registerCode
  birthDate
  sex
  ehpad
  socialSecurityNumber
  `

const __doctorSchema = __userSchema +
  `
  expertise
  professionalAddress
  rpps
  active
  inactivityMessage
  isAppointmentOnly
  stripeId
  payPlan
`


const getMePatient = graphqlize(`
{
  getMe {
  `
  + __patientSchema +
  `
   }
}
`)

const getMeDoctor = graphqlize(`
{
  getMe {
  `
  + __doctorSchema +
  `
   }
}
`)

const getRelatedDoctors = graphqlize(`
{
  getRelatedDoctors {
  `
  + __doctorSchema +
  `
   }
}
`)

const getRelatedPatients = graphqlize(`
query getRelatedPatients($offset: Int){
  getRelatedPatients(offset: $offset) {
  `
  + __patientSchema +
  `
   }
}
`)

const setOneSignalId = graphqlize(`
mutation setOneSignalId($id: String!) {
  setOneSignalId(id: $id) {
  `
  + __userSchema +
  `
   }
}
`)

const removeOneSignalId = graphqlize(`
mutation removeOneSignalId($id: String!) {
  removeOneSignalId(id: $id) {
  `
  + __userSchema +
  `
   }
}
`)

const setDoctorActivity = graphqlize(`
mutation setDoctorActivity($active: Boolean!, $inactivityMessage: String!){
  setDoctorActivity(active: $active, inactivityMessage: $inactivityMessage) {
  `
  + __doctorSchema +
  `
   }
}
`)

export { getMePatient, getMeDoctor, getRelatedDoctors, setOneSignalId, removeOneSignalId, setDoctorActivity, getRelatedPatients, __doctorSchema, __userSchema }