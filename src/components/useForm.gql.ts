import { gql } from "@apollo/client"
import dayjs from "dayjs"

export const createNewTodo = gql`
  mutation createNewTodo($deadline: String, $todo: String, $authId: uuid) {
    insert_todos_one(
      object: { deadline: $deadline, todo: $todo, user: $authId }
    ) {
      id
    }
  }
`

export const deleteTodo = gql`
  mutation deleteTodo($id: uuid) {
    delete_todos(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

export const updateTodo = gql`
  mutation updateTodo($todo: String, $deadline: String, $id: uuid) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { deadline: $deadline, edited_on: "${dayjs().format()}", todo: $todo }
    ){
      affected_rows
    }
  }
`

export const setToDone = gql`
  mutation setToDone($id: uuid) {
    update_todos(where: { id: { _eq: $id } }, _set: { completed: true, edited_on: "${dayjs().format()}" }) {
      affected_rows
    }
  }
`

export const setToNotDone = gql`
  mutation setToNotDone($id: uuid) {
    update_todos(where: { id: { _eq: $id } }, _set: { completed: false, edited_on: "${dayjs().format()}" }) {
      affected_rows
    }
  }
`
