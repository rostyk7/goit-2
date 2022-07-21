import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../store/modules/auth/slice';
import { isAuthenticated, getLoginError } from '../store/modules/auth/selectors';
import { Alert } from 'react-bootstrap';

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthenticated);
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const error = useSelector(getLoginError);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/profile');
    }
  }, [isAuth, navigate]);

  const onChange = useCallback(event => {
    setForm(prevForm => ({
      ...prevForm,
      [event.target.name]: event.target.value
    }));
  }, [setForm]);

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();
    await dispatch(loginThunk(form));
  }, [form, dispatch]);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control value={form.username} type="text" name='username' placeholder="Enter username" onChange={onChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={form.password} type="password" name='password' placeholder="Password" onChange={onChange} />
        </Form.Group>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;