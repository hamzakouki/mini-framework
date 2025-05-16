

import { useState } from "../framework/Statemanagement.js";

export function App() {
  const [count, setCount] = useState(0);

  return {
    tag: "div",
    attrs: {},
    children: [
      { tag: "p", children: [{ tag: "text", text: `Count: ${count}` }] },
      {
        tag: "button",
        attrs: { onClick: () => setCount(c => c + 1) },
        children: [{ tag: "text", text: "Increment" }],
      },
    ],
  };
}
