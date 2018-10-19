import { graphqlize } from './_kit'

const __consultationReportSchema = `
  fromDoctor { name _id }
  toPatient { name _id }
  text
  isEmergency
`

const getConsultationReports = graphqlize(`
{
  getConsultationReports {
    fromDoctor { name _id }
    toPatient { name _id }
    text
    isEmergency
   }
}
`)

export { getConsultationReports }