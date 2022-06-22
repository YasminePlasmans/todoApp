import { Box, Button, Stack, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { useCallback } from "react"
import { Controller, useForm as useHookForm } from "react-hook-form"

import { FormPropType, FormSubmitType } from "../constants/types"
import useForm from "./useForm"

export default function Form({
  todo,
  fetchTodos,
  localUser,
  closeModal,
}: FormPropType) {
  const { createNew, update } = useForm({ fetchTodos })
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useHookForm({
    defaultValues: {
      todo: todo?.todo || "",
      deadline: todo?.deadline || null,
    },
  })

  const onSubmit = useCallback(
    (formData: FormSubmitType) => {
      if (todo) update({ formData, id: todo.id })
      else createNew({ formData, localUser })

      closeModal()
    },
    [closeModal, createNew, localUser, todo, update]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          my: 2,
        }}
      >
        <Controller
          name="todo"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label="Todo"
              error={!!errors.todo}
              helperText={
                errors.todo?.type === "required" ? "This field is required" : ""
              }
            />
          )}
        />
        <Controller
          name="deadline"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              onChange={onChange}
              value={value}
              renderInput={(params) => <TextField {...params} />}
              label="Due on"
            />
          )}
        />
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={closeModal}>Cancel</Button>
      </Box>
    </form>
  )
}
