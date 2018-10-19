import { graphqlize } from './_kit'

const patientLogin = graphqlize(`
  mutation login ($email: String!, $password: String!) {
     patientLogin(email: $email, password: $password) {
       token
       _id
       email
     }
   }    
   `)

const doctorLogin = graphqlize(`
  mutation login ($email: String!, $password: String!, $sms: String!) {
     doctorLogin(email: $email, password: $password, sms: $sms) {
       token
       _id
       email
     }
   }    
   `)

const doctorSMSLogin = graphqlize(`
  mutation smsLogin ($email: String!, $password: String!) {
     doctorSMSLogin(email: $email, password: $password) {
       ok
     }
   }    
   `)

const preregisterPatient = graphqlize(`
  mutation preregisterPatient ($firstName: String!, $middleName: String!, $lastName: String!, $email: String!, $ehpad: String) {
    preregisterPatient(firstName: $firstName, middleName: $middleName, lastName: $lastName, email: $email, ehpad: $ehpad) {
      code
      email
      status
      isPatient
      usedAt
      canceledAt
      ehpad
      firstName
      middleName
      lastName
      fromDoctor { name _id }
    }
}
`)

const doctorRegister = graphqlize(`
  mutation doctorRegister ($firstName: String!, $middleName: String!, $lastName: String!, $avatarBase64: String!, $email: String!, $password: String!, $phoneNumber: String!, $expertise: String!, $professionalAddress: String!, $isAppointmentOnly: Boolean!, $rpps: String!) {
    doctorRegister(firstName: $firstName, middleName: $middleName, lastName: $lastName, avatarBase64: $avatarBase64, email: $email, password: $password, phoneNumber: $phoneNumber, expertise: $expertise, professionalAddress: $professionalAddress, isAppointmentOnly: $isAppointmentOnly, rpps: $rpps) {
      id
    }
}
`)

const patientRegister = graphqlize(`
  mutation patientRegister($firstName: String!, $middleName: String!, $lastName: String!, $avatarBase64: String!, $email: String!, $password: String!, $code: String!, $phoneNumber: String!, $socialSecurityNumber: String!) {
    patientRegister (firstName: $firstName, middleName: $middleName, lastName: $lastName, avatarBase64: $avatarBase64, email: $email, password: $password, code: $code, phoneNumber: $phoneNumber, socialSecurityNumber: $socialSecurityNumber) {
       token
       _id
       email
    }
  }
`)

const useRegisterCode = graphqlize(`
  mutation useRegisterCode ($code: String!) {
    useRegisterCode(code: $code) {
      code
      email
      firstName
      middleName
      lastName
    }
}

`)

const adminLogin = graphqlize(`
  mutation login ($email: String!, $password: String!) {
     adminLogin(email: $email, password: $password) {
       token
       _id
       email
     }
   }    
   `)

export { patientLogin, doctorLogin, doctorSMSLogin, preregisterPatient, patientRegister, adminLogin, doctorRegister, useRegisterCode }