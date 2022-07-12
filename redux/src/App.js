import './App.css';
import TodoAdd from './components/TodoAdd';
import { useSelector } from 'react-redux';
import TodoList from './components/TodoList';
import { getTodosList } from './store/todo/selectors';  

function App() {
  const todos = useSelector(getTodosList);
  return (
    <div className="App">
      <TodoList />
      <TodoAdd />
      <div>Total: {todos.length}</div>
    </div>
  );
}

export default App;
