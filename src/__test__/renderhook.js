import React from 'react';
import useCounter from '../component/renderH';

function Name() {
  const { count, increment } = useCounter();

  return (
    <div>
      <p>Count: <span data-testid ='increase'>{count}</span></p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Name;
