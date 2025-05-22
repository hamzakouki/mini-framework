// app.js
import { h } from "../framework/dom.js";
import {  useEffect, useState, renderAppFn } from "../framework/state.js";

export function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  function addTodo(e) {
   
    const trimmed = text.trim();
    if (trimmed) {
      setTodos([...todos, { text: trimmed, completed: false, isEditing: false }]);
      setText("");
    }
  }

  function toggleTodo(index) {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function removeTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }



  function setEditing(index, isEditing) {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, isEditing } : todo
    ));
  }

  return h("section", { class: "todoapp", id: "root" },
    h("header", { class: "header", "data-testid": "header" },
      h("h1", {}, "todos"),
      h("div", { class: "input-container", onsubmit: addTodo },
        h("input", {
          class: "new-todo",
          id: "todo-input",
          type: "text",
          "data-testid": "text-input",
          value: text,
          oninput: (e) => setText(e.target.value), 
          onkeydown: (e) => {
            if (e.key === "Enter") {
              const trimmed = text.trim();
              if (trimmed) {
                setTodos([...todos, { text: trimmed, completed: false, isEditing: false }]);
                setText(""); // Clear the input after adding the todo
              }
            }
          },
          placeholder: "What needs to be done?"
        }),
        h("label", { 
          class: "visually-hidden", 
          for: "todo-input" 
        }, "New Todo Input")
      )
    ),
    h("main", { class: "main", "data-testid": "main" },
      h("ul", { class: "todo-list", "data-testid": "todo-list" },
        todos.map((todo, i) => {
          let classes = [];
          if (todo.completed) classes.push("completed");
          if (todo.isEditing) classes.push("editing");
          
          return h("li", {
            class: classes.join(" "),
            "data-testid": "todo-item"
          },
            todo.isEditing
              ? h("input", {
                  class: "edit",
                  type: "text",
                  value: todo.text,
                  autofocus: true,
                  onblur: (e) => {
                    const updated = [...todos];
                    updated[i].text = todo.text;
                    console.log(updated[i].text);
                    setTodos(updated);
                    setEditing(i, false); 
                  },
                  onkeydown: (e) => {
                    if (e.key === "Enter") {
                      const updated = [...todos];
                      updated[i].text = e.target.value;
                      setTodos(updated);
                      setEditing(i, false); // Exit edit mode
                    }
                  }
                })
              : h("div", { class: "view" },
                  h("input", {
                    class: "toggle",
                    type: "checkbox",
                    "data-testid": "todo-item-toggle",
                    ...(todo.completed ? { checked: true } : {}),
                    onclick: () => toggleTodo(i)
                  }),
                  h("label", {
                    "data-testid": "todo-item-label",
                    ondblclick: (e) => {
                    
                      setEditing(i, true);
                      
                    }
                  }, todo.text),
                  h("button", {
                    class: "destroy",
                    "data-testid": "todo-item-button",
                    onclick: () => removeTodo(i)
                  })
                )
          );
        })
      )
    ),
    h("footer", { class: "footer", "data-testid": "footer" },
      h("span", { class: "todo-count" },
        `${todos.length} items total`
      )
    )
  );
}
const mount = document.getElementById("app");
renderAppFn(TodoApp, mount);