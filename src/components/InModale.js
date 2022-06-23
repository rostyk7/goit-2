import ProgressBar from 'react-bootstrap/ProgressBar';

export const InModal = () => {
  return <div>
    <h1>Super important data</h1>
    <ProgressBar now={60} />
  </div>
};