import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, addTodos, removeTodos, clearTodos, completeTodos } from './todosSlice';
import './Todo.css';
import ReactGA from 'react-ga';

export function Todo() {
  const dispatch = useDispatch();
  const todoList = useSelector(selectTodos);

  const initialState = ''
  const [todoItem, setTodoItem] = useState(initialState);
  const [message, setMessage] = useState(initialState);

  const handleChange = (event) => {
    setTodoItem(event.target.value);
  }

  const add = () => {
    if (todoItem === '') {
      setMessage('input is empty!')
    } else {
      let tmp = Math.floor(Math.random() * 1000);
      dispatch(addTodos({
          id: tmp,
          item: todoItem,
          completed: false,
      }));
      setMessage('');
    }

    ReactGA.event({
      category: 'ToDo',
      action: 'User added a todo item'
    });

    setTodoItem('');
    document.getElementById('addBtn')[0] = '';
  }

  function remove(id) {
    dispatch(removeTodos(id));

    ReactGA.event({
      category: 'ToDo',
      action: 'User removed a todo item'
    });
  }

  function complete(id) {
    dispatch(completeTodos(id));

    ReactGA.event({
      category: 'ToDo',
      action: 'User marked a todo item complete'
    });
  }

  const clearAll = () => {
    dispatch(clearTodos());

    ReactGA.event({
      category: 'ToDo',
      action: 'User cleared all todo items'
    });
  }

  return (
    <div className="TodoList">
      <input type="text" id="addTodo" onChange={handleChange} value={todoItem} placeholder=" add items here!"></input>
      <button id="addBtn" onClick={add}>add</button>
      {message && <p id="error">{message}</p>}
      <br></br>
      {todoList.map((item) => <div key={item.id} id="list">
                                {item.completed === true && <span id="completed">completed!</span>}
                                <p id="todoItem" key={item.id}>{item.item}</p>
                                <button id="removeBtn" onClick={() => remove(item.id)}>remove item</button>
                                <button id="completeBtn" onClick={() => complete(item.id)}>{item.completed === true ? 'mark as incomplete' : 'mark as complete'}</button>
                              </div>
                   )
      }
      {todoList.length > 0 && <button id="clearBtn" onClick={clearAll}>clear all</button>}
    </div>
  )
}
