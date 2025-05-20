
import { useState, useEffect } from "../framework/Statemanagement.js";
export function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return {
    tag: "div",
    attrs: {
      class: "todo-app",
      style: `
        width: 360px;
        margin: 40px auto;
        padding: 20px 25px 40px 25px;
        background: #f5f5f5;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 25px 50px rgba(0,0,0,0.1);
        border-radius: 8px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #4d4d4d;
        display: flex;
        flex-direction: column;
        align-items: center;
      `
    },
    children: [
      {
        tag: "h1",
        attrs: {
          style: `
            font-weight: 300;
            font-size: 36px;
            color: rgba(175, 47, 47, 0.7);
            margin-bottom: 20px;
          `
        },
        children: [{ tag: "text", text: "Todo List" }]
      },
      {
        tag: "input",
        attrs: {
          type: "text",
          placeholder: "Add a new task...",
          style: `
            width: 100%;
            padding: 16px 16px 16px 60px;
            border: none;
            box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
            font-size: 24px;
            font-weight: 300;
            box-sizing: border-box;
            border-radius: 4px;
            margin-bottom: 20px;
            color: #4d4d4d;
            outline: none;
          `,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              const value = e.target.value.trim();
              if (value !== "") {
             setTodos(prev => [...prev, { text: value, completed: false, isEditing: false }]);
                e.target.value = "";
              }
            }
          }
        }
      },
      {
        tag: "ul",
        attrs: {
          style: `
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
          `
        },
        children: todos.map((todo, i) => ({
          tag: "li",
          attrs: {
            style: `
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 8px;
              border-bottom: 1px solid #ededed;
              font-size: 18px;
            `
          },
          children: [
            {
          tag: "input",
          attrs: {
            type: "checkbox",
            ...(todo.completed ? { checked: true } : {}),
            onChange: (e) => {
              const updated = [...todos];
              updated[i].completed = e.target.checked;
              setTodos(updated);
            }
          }
        },
    todo.isEditing
      ? {
          tag: "input",
          attrs: {
            type: "text",
            value: todo.text,
            autofocus: true,
            style: `
              flex: 1;
              margin: 0 8px;
              font-size: 18px;
              padding: 4px;
              border: 1px solid #ccc;
              border-radius: 3px;
            `,
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                const updated = [...todos];
                updated[i].text = e.target.value.trim();
                updated[i].isEditing = false;
                setTodos(updated);
              }
            },
            onBlur: (e) => {
              const updated = [...todos];
              updated[i].text = todo.text;
              updated[i].isEditing = false;
              setTodos(updated);
            }
          }
        }
      : {
          tag: "span",
          attrs: {
            style: `
              flex: 1;
              margin: 0 8px;
              text-decoration: ${todo.completed ? "line-through" : "none"};
              cursor: pointer;
            `,
            onDblClick: () => {
              const updated = [...todos];
              updated[i].isEditing = true;
              setTodos(updated);
            }
          },
          children: [{ tag: "text", text: todo.text }]
        },
    {
      tag: "button",
      attrs: {
        onClick: () => {
          setTodos(todos.filter((_, index) => index !== i));
        },
        style: `
          background: none;
          border: none;
          color: #cc9a9a;
          font-size: 20px;
          cursor: pointer;
          transition: color 0.2s ease;
        `,
        onMouseOver: (e) => (e.target.style.color = "#af5b5e"),
        onMouseOut: (e) => (e.target.style.color = "#cc9a9a")
      },
      children: [{ tag: "text", text: "×" }]
    }
  ]
}))

      },
todos.length > 0 ? {
  tag: "div",
  attrs: {
    style: `
      display: flex;
      flex-direction: row;
      gap: 8px;
      margin-top: 20px;
      width: 100%;
      font-size: 14px;
      color: #777;
      justify-content: flex-start;
    `
  },
  children: [
    {
      tag: "p",
      attrs: {
        style: `margin-top: 15px;: 15px;padding: 0px 60px 0px 10px; line-height: 1.5;`
      },
      children: [
        { tag: "text", text: todos.length + " items left!" }
      ]
    },
    {
      tag: "button",
      attrs: {
        style: `
          border: 1px solid transparent;
          background: none;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 3px;
          color: #777;
          transition: border-color 0.2s ease;
        `,
        onMouseOver: (e) => (e.target.style.borderColor = "#777"),
        onMouseOut: (e) => (e.target.style.borderColor = "transparent"),
      },
      children: [{ tag: "text", text: "All" }]
    },
    {
      tag: "button",
      attrs: {
        style: `
          border: 1px solid transparent;
          background: none;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 3px;
          color: #777;
          transition: border-color 0.2s ease;
        `,
        onMouseOver: (e) => (e.target.style.borderColor = "#777"),
        onMouseOut: (e) => (e.target.style.borderColor = "transparent"),
        onClick: () => {
     // navigateTo("/active");  kouki mli tzid rout lgha hna 
      }
      },
      children: [{ tag: "text", text: "Active" }]
    },
    {
      tag: "button",
      attrs: {
        style: `
          border: 1px solid transparent;
          background: none;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 3px;
          color: #777;
          transition: border-color 0.2s ease;
        `,
        onMouseOver: (e) => (e.target.style.borderColor = "#777"),
        onMouseOut: (e) => (e.target.style.borderColor = "transparent"),
         onClick: () => {
       //  navigateTo("/completed");  kouki mli tzid route lgha hna 
      }
      },
      children: [{ tag: "text", text: "Completed" }]
    }
  ]
} : []
    ]
  };
}





// test dyal route w sf 

// function navigateTo(route) {
//   window.history.pushState({}, "", route);
//   renderApp();
// }