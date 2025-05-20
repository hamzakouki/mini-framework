
import { useState, useEffect } from "../framework/Statemanagement.js";

export function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("Current Todos:", todos);
  }, [todos]);

  return {
    tag: "div",
    attrs: { class: "todo-app" },
    children: [
      {
        tag: "h1",
        children: [{ tag: "text", text: "Todo List" }]
      },
 {
  tag: "input",
  attrs: {
    type: "text",
    placeholder: "Add a new task...",
    onKeyDown: (e) => {
      if (e.key === "Enter") {
        const value = e.target.value.trim();
        if (value !== "") {
          setTodos(prev => [...prev, value]);
          e.target.value = ""; // clear the input manually
        }
      }
    }
  }
}
,

     {
  tag: "ul",
  children: todos.map((todo, i) => ({
    tag: "li",
    attrs: {},
    children: [
      { tag: "text", text: todo },
      {
        tag: "button",
        attrs: {
          onClick: () => {
            // button tgl3 element mn todo Remove the clicked todo by index
            setTodos(todos.filter((_, index) => index !== i));
          },
          style: "margin-left: 10px;"
        },
        children: [{ tag: "text", text: "X" }]
      }
    ]
  }))
},{
  tag: "div",
  attrs: {
    style: "display: flex; flex-direction: row; gap: 8px;"
  },
  children: [
     {
      tag: "p",
      children: [
          { tag: "text", text: todos.length + " item left! "  }
      ]
    } ,
    {
      tag: "button",
      attrs: {},
      children: [{ tag: "text", text: "All" }]
    },
    {
      tag: "button",
      attrs: {},
      children: [{ tag: "text", text: "Active" }]
    },
    {
      tag: "button",
      attrs: {},
      children: [{ tag: "text", text: "Completed" }]
    }
  ]
}


    ]
  };
}
