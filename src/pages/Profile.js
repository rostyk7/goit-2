import { useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import { getProfile, getProfileLoading } from "../store/modules/auth/selectors";
import { getProfileThunk } from "../store/modules/auth/slice";
import { Container } from "react-bootstrap";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const isLoading = useSelector(getProfileLoading);

  useEffect(() => {
    dispatch(getProfileThunk());
  }, []);

  if (!profile || isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Container>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{profile.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{profile.firstName} {profile.lastName}</Card.Subtitle>
      </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;