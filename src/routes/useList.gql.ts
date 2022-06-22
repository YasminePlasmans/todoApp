import { gql } from "@apollo/client"

export const getUser = gql`
  query getUser($authId: String) {
    users(where: { auth_id: { _eq: $authId } }) {
      id
      auth_id
    }
  }
`
export const getTodos = (sortedField: string) => {
  return gql`
  query getTodos($authId: uuid!, $sortedBy: order_by) {
    todos(where: { user: { _eq: $authId } }, order_by: {${sortedField}: $sortedBy}) {
      id
      created_on
      edited_on
      deadline
      todo
      completed
    }
  }
`
}

export const createNewUser = gql`
  mutation createNewUser($authId: String) {
    insert_users_one(object: { auth_id: $authId }) {
      id
      auth_id
    }
  }
`
