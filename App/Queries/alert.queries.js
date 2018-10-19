import { graphqlize } from './_kit'

const __alertSchema = `
  type
  from { name }
  extraData { status }
  url
`

const getAlerts = graphqlize(`
{
  getAlerts {
  `
  + __alertSchema +
  `
   }
}
`)

export { getAlerts }