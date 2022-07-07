import { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { connect } from 'react-redux';
import { addTodo } from '../store/todo/actions';
import { getTodosList } from '../store/todo/selectors';

const TodoAdd = ({ todos, dispatchAddTodo }) => {
  const [newContent, setNewContent] = useState('');

  const onSetNewContentChange = useCallback(event => {
    setNewContent(event.target.value);
  }, [setNewContent]);

  const onAddNewTodo = () => {
    dispatchAddTodo(newContent);
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

const mapStateToProps = (state) => ({
  todos: getTodosList(state)
});

const mapDispatchToProps = { dispatchAddTodo: addTodo };

export default connect(mapStateToProps, mapDispatchToProps)(TodoAdd);