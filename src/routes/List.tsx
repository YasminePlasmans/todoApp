import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { MouseEvent, useCallback, useState } from "react"

import Modal from "../components/Modal"
import Table from "../components/Table"
import { TodoType, useListValues } from "../constants/types"
import useList from "./useList"

export default function List() {
  const [modalOpen, setModalOpen] = useState(false)
  const NewTodo = useCallback(() => {
    setActiveTodo(undefined)
    setModalOpen(true)
  }, [])

  const [activeTodo, setActiveTodo] = useState<TodoType>()

  const closeModal = () => {
    setModalOpen(false)
  }
  const openModal = () => {
    setModalOpen(true)
  }

  const {
    todos,
    loading,
    localUser,
    fetchTodos,
    sortedBy,
    setSortedBy,
    sortedField,
    setSortedField,
  }: useListValues = useList()

  const handleSortedChange = (
    event: MouseEvent<HTMLElement>,
    value: string
  ) => {
    setSortedBy(value)
  }
  const handleSortedFieldChange = (
    event: MouseEvent<HTMLElement>,
    value: string
  ) => {
    setSortedField(value)
  }

  return (
    <Box
      sx={{
        m: 2,
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button onClick={NewTodo} variant="contained">
            New Todo
          </Button>
          <Box sx={{ display: "flex", gap: 2 }}>
            <ToggleButtonGroup
              value={sortedField}
              onChange={handleSortedFieldChange}
              exclusive
            >
              <ToggleButton value="todo" key="todo">
                Todo
              </ToggleButton>
              <ToggleButton value="deadline" key="deadline">
                Deadline
              </ToggleButton>
              <ToggleButton value="edited_on" key="edited_on">
                Updated
              </ToggleButton>
              <ToggleButton value="created_on" key="created_on">
                Created
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={sortedBy}
              onChange={handleSortedChange}
              exclusive
            >
              <ToggleButton value="asc" key="asc">
                Asc
              </ToggleButton>
              <ToggleButton value="desc" key="desc">
                Desc
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        {todos.length > 0 ? (
          <Table
            todos={todos}
            fetchTodos={fetchTodos}
            loading={loading}
            setActiveTodo={setActiveTodo}
            activeTodo={activeTodo}
            openModal={openModal}
          />
        ) : (
          <Box
            sx={{
              m: 5,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" paragraph>
              Create your first Todo
            </Typography>
            <Button onClick={NewTodo} variant={"contained"}>
              New todo
            </Button>
          </Box>
        )}
      </Stack>
      <Modal
        open={modalOpen}
        closeModal={closeModal}
        fetchTodos={fetchTodos}
        localUser={localUser}
        todoData={activeTodo}
      />
    </Box>
  )
}
