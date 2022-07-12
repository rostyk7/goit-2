import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../store/todo/actions';
import { getTodosList } from '../store/todo/selectors';

const TodoAdd = () => {
  const [newContent, setNewContent] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(getTodosList);

  const onSetNewContentChange = useCallback(event => {
    setNewContent(event.target.value);
  }, [setNewContent]);

  const onAddNewTodo = () => {
    dispatch(addTodo({
      content: newContent,
      id: v4()
    }));
    setNewContent('');
  };

  return (
    <div>
       <InputGroup className="mb-3">
        <Form.Control
          placeholder="New Todo"
          value={newContent}
          onChange={onSetNewContentChange}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={onAddNewTodo} disabled={todos.length > 4}>
          Add
        </Button>
      </InputGroup>
    </div>
  );
};

export default TodoAdd;