import { useState } from 'react'
import {
  addTodo,
  toggleDoneStatus,
  toggleEditingStatus,
  modifyTodo,
  deleteTodo,
} from '../store/slices/todoSlice'
import { useAppSelector, useAppDispatch } from '../store/hooks'

function PageTodo() {
  const dispatch = useAppDispatch()
  const todoList = useAppSelector((state) => state.todo.todoList)

  const [addingTodo, setAddingTodo] = useState('')
  const [editingTodo, setEditingTodo] = useState('')

  function addTodoHandler() {
    if (addingTodo === '') {
      alert('請輸入內容')
      return
    }
    dispatch(addTodo(addingTodo))
    setAddingTodo('')
  }

  function toggleDoneStatusHandler(id: string) {
    dispatch(toggleDoneStatus(id))
  }

  function toggleEditingStatusHandler(id: string) {
    dispatch(toggleEditingStatus(id))
  }

  function modifyTodoHandler(id: string, oldContent: string) {
    if (oldContent === editingTodo) {
      console.log('新舊內容一樣')
      return
    }

    dispatch(
      modifyTodo({
        id,
        newContent: editingTodo,
      })
    )

    setEditingTodo('')
  }

  function deleteTodoHandler(id: string) {
    dispatch(deleteTodo(id))
  }

  return (
    <>
      <h1>TODO LIST</h1>

      <input
        type="text"
        value={addingTodo}
        onChange={(e) => setAddingTodo(e.target.value)}
        style={{
          padding: '0.5em',
          fontSize: '1em',
          borderRadius: '8px',
          border: '1px solid #000',
        }}
      />
      <button type="button" onClick={addTodoHandler}>
        add todo
      </button>

      {/* 這邊感覺可以用 useMemo(還是 memo?) 優化，畢竟沒有變動但一直大量重新渲染感覺有很大的調整空間，之後可以再思考要如何優化 */}
      <ul>
        {todoList.map((el) => {
          return (
            <li key={el.id}>
              <span
                onClick={() => {
                  toggleDoneStatusHandler(el.id)
                }}
                style={{ cursor: 'pointer' }}
              >
                {el.done ? '✔' : '⬜'}
              </span>
              {el.editing ? (
                <>
                  <input
                    type="text"
                    value={editingTodo}
                    onChange={(e) => {
                      setEditingTodo(e.target.value)
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      modifyTodoHandler(el.id, el.content)
                      toggleEditingStatusHandler(el.id)
                    }}
                  >
                    complete editing
                  </button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => {
                      setEditingTodo(el.content)
                      toggleEditingStatusHandler(el.id)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {el.content}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      deleteTodoHandler(el.id)
                    }}
                  >
                    delete todo
                  </button>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default PageTodo
