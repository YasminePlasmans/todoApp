export type PageProps = {
  isAuthenticated: boolean
}

export interface TodoType {
  id: string
  created_on: string
  edited_on?: string
  deadline?: string
  todo: string
  completed: boolean
}

export type DataType = TodoType[]
export type LocalUserType = {
  id?: string
  authId?: string
}

export type TablePropType = {
  todos: DataType
  fetchTodos: () => void
  openModal: () => void
  loading: boolean
  activeTodo?: TodoType
  setActiveTodo: (todo?: TodoType) => void
}

export type FormPropType = {
  todo?: TodoType
  fetchTodos: () => void
  closeModal: () => void
  localUser: LocalUserType
}
export type useFormPropType = {
  fetchTodos: () => void
}
export type useListPropType = {
  callback: () => void
}

export type useListValues = {
  todos: DataType
  localUser: LocalUserType
  fetchTodos: () => void
  loading: boolean
  sortedBy: string
  setSortedBy: (value: string) => void
  sortedField: string
  setSortedField: (value: string) => void
}

export type FormSubmitType = {
  todo: string
  deadline?: string | null
}
export type ModalPropType = {
  open: boolean
  closeModal: () => void
  fetchTodos: () => void
  todoData?: TodoType
  localUser: LocalUserType
}

export type UserType = {
  name: {
    title: string
    first: string
    last: string
  }
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
}
