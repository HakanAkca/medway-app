import { __doctorSchema } from './user.queries'
import { graphqlize } from './_kit'

const validateDoctor = graphqlize(`
  mutation validateDoctor ($doctorId: String!) {
     validateDoctor(doctorId: $doctorId) {
    `
  + __doctorSchema +
    `
     }
   }    
   `)

export { validateDoctor }