

import { useState, useEffect }from "../framework/Statemanagement.js";


export function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Rendered with count:", count);
  }, [count]);

  return {
    tag: "div",
    children: [
      { tag: "p", children: [{ tag: "text", text: `Count: ${count}` }] },
      {
        tag: "button",
        attrs: {
          onClick: () => setCount(count + 1),
          id: "myBtn"
        },
        children: [{ tag: "text", text: "Click me" }]
      }
    ]
  };
}
