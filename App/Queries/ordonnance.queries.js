import { graphqlize } from './_kit'

const __ordonnanceSchema = `
  fromDoctor {
    name
    _id
  }
  toPatient {
    name
    _id
  }
  fileUrl
  reportId { text }
  `


const getOrdonnances = graphqlize(`
query getOrdonnances($offset: Int){
  getOrdonnances(offset: $offset) {
  `
  + __ordonnanceSchema +
  `
   }
}
`)


export { getOrdonnances }