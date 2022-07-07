import { withCounter } from "../hoc/withCounter";

const Counter = ({ counter }) => (
  <h1>{counter}</h1>
);

export default withCounter(Counter);