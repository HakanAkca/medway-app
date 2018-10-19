import gql from 'graphql-tag'
import Config from '../Config/AppConfig'

const graphqlize = (query) => {
  return Config.graphql.parseQueries ? gql(query) : query
}

export { graphqlize }