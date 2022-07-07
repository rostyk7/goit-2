import './App.css';
import TodoAdd from './components/TodoAdd';
import { useSelector } from 'react-redux';
import TodoList from './components/TodoList';
import { getTodosList } from './store/todo/selectors';
import Counter from './components/Counter';
import Counter2 from './components/Counter2';

function App() {
  const todos = useSelector(getTodosList);
  return (
    <div className="App">
      <TodoList />
      <TodoAdd />
      <div>Total: {todos.length}</div>
      <Counter />
      <Counter2 super='cool' />
    </div>
  );
}

export default App;
