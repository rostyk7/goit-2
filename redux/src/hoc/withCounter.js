import { useEffect, useState } from "react";

export const withCounter = Component => (props) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCounter(value => value + 1);
    }, 2000);
    return () => clearInterval(id);
  }, [setCounter]);

  return <Component {...props} counter={counter} />
};