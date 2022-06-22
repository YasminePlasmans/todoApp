import Checkmark from "@mui/icons-material/Check"
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"
import RestartAltTwoTone from "@mui/icons-material/RestartAltTwoTone"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Paper,
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { green } from "@mui/material/colors"
import dayjs from "dayjs"
import { useCallback, useState } from "react"

import { TablePropType, TodoType } from "../constants/types"
import useForm from "./useForm"

export default function Table({
  todos,
  fetchTodos,
  loading,
  activeTodo,
  setActiveTodo,
  openModal,
}: TablePropType) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const toggleModal = useCallback(() => setOpenDeleteModal((open) => !open), [])

  const { formLoading, deleteTodo, toggleDone } = useForm({ fetchTodos })

  const EditTodo = useCallback(
    (selectedTodo: TodoType) => {
      setActiveTodo(selectedTodo)
      openModal()
    },
    [openModal, setActiveTodo]
  )
  const DeleteTodo = useCallback(
    (selectedTodo: TodoType) => {
      setActiveTodo(selectedTodo)
      toggleModal()
    },
    [setActiveTodo, toggleModal]
  )

  const ConfirmDelete = useCallback(() => {
    if (!activeTodo) return
    deleteTodo(activeTodo.id)
    toggleModal()
    setActiveTodo(undefined)
  }, [activeTodo, deleteTodo, setActiveTodo, toggleModal])

  const CancelDelete = useCallback(() => {
    toggleModal()
    setActiveTodo(undefined)
  }, [setActiveTodo, toggleModal])

  const ToggleCompleted = useCallback(
    (selectedTodo: TodoType) => {
      toggleDone(selectedTodo.id, selectedTodo.completed)
    },
    [toggleDone]
  )

  return (
    <TableContainer component={Paper}>
      {(formLoading || loading) && <LinearProgress />}
      <MUITable>
        <TableHead>
          <TableRow>
            <TableCell>Todo </TableCell>
            <TableCell>By</TableCell>
            <TableCell>Updated</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {todo.completed && <Checkmark sx={{ color: green[500] }} />}
                  {todo.todo}
                </Box>
              </TableCell>
              <TableCell>
                {todo.deadline ? dayjs(todo.deadline).format("L") : "-"}
              </TableCell>
              <TableCell>
                {todo.edited_on ? dayjs(todo.edited_on).format("L HH:mm") : "-"}
              </TableCell>
              <TableCell>{dayjs(todo.created_on).format("L HH:mm")}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => ToggleCompleted(todo)}
                  color="primary"
                >
                  {todo.completed ? <RestartAltTwoTone /> : <Checkmark />}
                </IconButton>
                <IconButton onClick={() => EditTodo(todo)} color="primary">
                  <EditTwoToneIcon />
                </IconButton>
                <IconButton onClick={() => DeleteTodo(todo)} color="primary">
                  <DeleteTwoToneIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
      {openDeleteModal && (
        <Dialog open={openDeleteModal} onClose={CancelDelete}>
          <DialogTitle>Remove todo</DialogTitle>
          <DialogContent>
            You are about to remove this Todo: {activeTodo?.todo}. This cannot
            be reversed, please be careful.
          </DialogContent>
          <DialogActions>
            <Button onClick={ConfirmDelete} variant="contained">
              Confirm
            </Button>
            <Button onClick={CancelDelete}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
    </TableContainer>
  )
}
