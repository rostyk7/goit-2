import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosList } from '../store/todo/selectors';
import { removeTodo } from '../store/todo/actions';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodosList);

  const onItemRemove = (id) => {
    dispatch(removeTodo({ id }))
  };

  return (
    <ListGroup>
      {todos.map(todo => (
         <ListGroup.Item key={todo.id}>
          <div className='d-flex'>
            <div className='w-100'>{todo.content}</div>
            <Button
              className='ml-auto text-nowrap'
              variant="danger"
              onClick={() => onItemRemove(todo.id)}
            >
              Remove Me
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
};

export default TodoList;