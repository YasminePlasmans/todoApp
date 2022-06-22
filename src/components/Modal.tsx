import { Dialog, DialogContent, DialogTitle } from "@mui/material"

import { ModalPropType } from "../constants/types"
import Form from "./Form"

export default function Modal({
  open,
  closeModal,
  todoData,
  fetchTodos,
  localUser,
}: ModalPropType) {
  if (!open) return null
  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle>{todoData ? `Edit` : "Create new To do"}</DialogTitle>
      <DialogContent>
        <Form
          todo={todoData}
          fetchTodos={fetchTodos}
          localUser={localUser}
          closeModal={closeModal}
        />
      </DialogContent>
    </Dialog>
  )
}
