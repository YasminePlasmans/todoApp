import { useApolloClient, useMutation } from "@apollo/client"
import { useAuth0 } from "@auth0/auth0-react"
import { useCallback, useEffect, useState } from "react"

import { DataType, LocalUserType } from "../constants/types"
import { createNewUser, getTodos, getUser } from "./useList.gql"

export default function useList() {
  const [todos, setTodos] = useState<DataType>([])
  const [loading, setLoading] = useState(false)
  const [localUser, setLocalUser] = useState<LocalUserType>({})
  const { user } = useAuth0()
  const client = useApolloClient()

  const [sortedBy, setSortedByState] = useState("asc")
  const [sortedField, setSortedFieldState] = useState("todo")

  const getUserQuery = useCallback(async () => {
    const { data } = await client.query({
      query: getUser,
      variables: { authId: user?.sub },
    })

    return data
  }, [client, user?.sub])

  const getTodosQuery = useCallback(async () => {
    setLoading(true)
    const { data } = await client.query({
      query: getTodos(sortedField),
      variables: { authId: localUser.id, sortedBy },
    })
    setLoading(false)
    return data
  }, [client, localUser.id, sortedBy, sortedField])

  const [createNewUserQuery] = useMutation(createNewUser)

  const fetchTodos = useCallback(() => {
    // not the most elegant solution to reset store, need to research topic
    client.resetStore().then(() =>
      getTodosQuery().then((data) => {
        setTodos(data.todos)
      })
    )
  }, [client, getTodosQuery])

  const setSortedBy = useCallback(
    (value: string) => {
      setSortedByState(value)
      fetchTodos()
    },
    [fetchTodos]
  )
  const setSortedField = useCallback(
    (value: string) => {
      setSortedFieldState(value)
      fetchTodos()
    },
    [fetchTodos]
  )

  useEffect(() => {
    getUserQuery().then((data) => {
      if (!data.users[0])
        createNewUserQuery({
          variables: {
            authId: user?.sub,
          },
        }).then((returnData) => {
          setLocalUser(returnData.data.insert_users_one)
        })
      else {
        setLocalUser(data.users[0])
      }
    })
  }, [createNewUserQuery, fetchTodos, getUserQuery, user?.sub])

  useEffect(() => {
    if (!localUser.id) return

    fetchTodos()
  }, [fetchTodos, localUser])

  return {
    todos,
    loading,
    localUser,
    fetchTodos,
    sortedBy,
    setSortedBy,
    sortedField,
    setSortedField,
  }
}
