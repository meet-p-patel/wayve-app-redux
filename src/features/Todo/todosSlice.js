import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload)
    },
    removeTodos: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearTodos: (state) => {
      return state = initialState;
    },
    completeTodos: (state, action) => {
      return state.map(item =>
        (item.id === action.payload) 
          ? {...item, completed: !item.completed}
          : item
      )
    },
  }
});

export const selectTodos = (state) => state.todos;
export const { addTodos, removeTodos, clearTodos, completeTodos } = todosSlice.actions;
export default todosSlice.reducer;
