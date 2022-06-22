import { useMutation } from "@apollo/client"
import { useCallback } from "react"

import {
  FormSubmitType,
  LocalUserType,
  useFormPropType,
} from "../constants/types"
import {
  createNewTodo,
  deleteTodo,
  setToDone,
  setToNotDone,
  updateTodo,
} from "./useForm.gql"

export default function useForm({ fetchTodos }: useFormPropType) {
  const [addTodoQuery, { loading: createLoading }] = useMutation(createNewTodo)

  const createNew = useCallback(
    ({
      formData,
      localUser,
    }: {
      formData: FormSubmitType
      localUser: LocalUserType
    }) => {
      addTodoQuery({
        variables: {
          todo: formData.todo,
          deadline: formData.deadline,
          authId: localUser.id,
        },
      }).then(() => fetchTodos())
    },
    [addTodoQuery, fetchTodos]
  )

  const [updateTodoQuery, { loading: updateLoading }] = useMutation(updateTodo)
  const update = useCallback(
    ({ formData, id }: { formData: FormSubmitType; id: string }) => {
      updateTodoQuery({
        variables: {
          todo: formData.todo,
          deadline: formData.deadline,
          id,
        },
      }).then(() => fetchTodos())
    },
    [fetchTodos, updateTodoQuery]
  )

  const [deleteTodoQuery, { loading: deleteLoading }] = useMutation(deleteTodo)
  const deleteRow = useCallback(
    (id: string) => {
      deleteTodoQuery({ variables: { id } }).then(() => fetchTodos())
    },
    [deleteTodoQuery, fetchTodos]
  )

  const [setToDoneQuery, { loading: setToDoneLoading }] = useMutation(setToDone)
  const [setToNotDoneQuery, { loading: setToNotDoneLoading }] =
    useMutation(setToNotDone)

  const toggleDone = useCallback(
    (id: string, completed: boolean) => {
      if (completed)
        setToNotDoneQuery({ variables: { id } }).then(() => fetchTodos())
      else setToDoneQuery({ variables: { id } }).then(() => fetchTodos())
    },
    [fetchTodos, setToDoneQuery, setToNotDoneQuery]
  )

  return {
    createNew,
    update,
    deleteTodo: deleteRow,
    toggleDone,
    formLoading:
      deleteLoading ||
      createLoading ||
      updateLoading ||
      setToDoneLoading ||
      setToNotDoneLoading,
  }
}
