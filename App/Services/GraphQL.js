const getError = (err) => {
  return err && err.graphQLErrors && err.graphQLErrors[0] && err.graphQLErrors[0].message
}

export default { getError }
