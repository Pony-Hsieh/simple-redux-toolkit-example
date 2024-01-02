import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import type ITodo from '../../types/ITodo'

const initialState = {
  todoList: [] as ITodo[],
}

interface IModifiedTodo {
  id: string
  newContent: string
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const { todoList } = state
      const { payload } = action
      const addedTodo = {
        content: payload,
        done: false,
        editing: false,
        id: uuidv4(),
      }
      todoList.push(addedTodo)
    },
    toggleDoneStatus(state, action: PayloadAction<string>) {
      const { todoList } = state
      const { payload } = action

      const toggledTodo = todoList.find((el) => el.id === payload)

      if (toggledTodo) {
        toggledTodo.done = !toggledTodo.done
      }
    },
    toggleEditingStatus(state, action: PayloadAction<string>) {
      const { todoList } = state
      const { payload } = action

      const toggledTodo = todoList.find((el) => el.id === payload)

      if (toggledTodo) {
        toggledTodo.editing = !toggledTodo.editing
      }
    },
    modifyTodo(state, action: PayloadAction<IModifiedTodo>) {
      const { todoList } = state
      const { payload } = action

      const modifiedTodo = todoList.find((el) => el.id === payload.id)
      if (modifiedTodo) {
        modifiedTodo.content = payload.newContent
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const { todoList } = state
      const { payload } = action
      state.todoList = todoList.filter((el) => el.id !== payload)
    },
  },
})

export const {
  addTodo,
  toggleDoneStatus,
  toggleEditingStatus,
  modifyTodo,
  deleteTodo,
} = todoSlice.actions

export default todoSlice.reducer
