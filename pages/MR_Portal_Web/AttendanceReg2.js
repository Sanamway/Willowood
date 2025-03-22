import { useState, useCallback, useMemo } from "react";

function ChildComponent({ onClick }) {
  console.log("ChildComponent rendered");
  return <button onClick={onClick}>Click Me</button>;
}

export default function ParentComponent() {
  const [count, setCount] = useState(0);



  // Without useCallback, this function gets re-created on every render
  const handleClick = useCallback(() => {
    console.log("Button Clicked");
  }, []);

  // Empty dependency array → Function is created only once

  const ab = useMemo(() => {

    return `usememo is running with ${count}`
  }, [count])
  console.log(ab)
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}
