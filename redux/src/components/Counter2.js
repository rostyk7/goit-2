import { withCounter } from "../hoc/withCounter";

const Counter2 = (props) => {
  console.log('hoc', props);
 return <div>{props.counter}</div>
};

export default withCounter(Counter2);