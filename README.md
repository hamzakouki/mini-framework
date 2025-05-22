# Mini Framework Documentation

A lightweight, React-inspired JavaScript framework for building interactive web applications with virtual DOM, state management, and routing capabilities.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
- [Examples](#examples)
- [How It Works](#how-it-works)

## Overview

This mini framework provides a simple yet powerful way to build web applications using familiar React-like patterns. It includes:
- Virtual DOM with efficient diffing and patching
- State management with hooks (`useState`, `useEffect`)
- Client-side routing
- Component-based architecture

## Features

### ✨ Virtual DOM
- Efficient DOM updates through virtual DOM diffing
- Automatic reconciliation between old and new virtual nodes
- Minimal DOM manipulations for better performance

### 🎣 React-like Hooks
- `useState` for component state management
- `useEffect` for side effects and lifecycle events
- Automatic re-rendering when state changes

### 🛣️ Client-side Routing
- Hash-based routing system
- Navigation between different views
- Route change detection and handling

### 🏗️ Component Architecture
- Reusable components
- Props and state management
- Event handling

## Getting Started

### Basic Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module">
    import { h } from "./framework/dom.js";
    import { useState, renderAppFn } from "./framework/state.js";

    function App() {
      return h("div", {}, "Hello World!");
    }

    const mount = document.getElementById("app");
    renderAppFn(App, mount);
  </script>
</body>
</html>
```

## Core Concepts

### Virtual DOM Elements

The framework uses a virtual DOM representation where each element is an object with:
- `tag`: The HTML tag name or "text" for text nodes
- `attrs`: Object containing attributes and event handlers
- `children`: Array of child virtual nodes

### The `h` Function

The `h` function is the core building block for creating virtual DOM elements:

```javascript
h(tag, attributes, ...children)
```

## API Reference

### DOM Creation (`dom.js`)

#### `h(tag, attrs, ...children)`
Creates a virtual DOM element.

**Parameters:**
- `tag` (string): HTML tag name (e.g., "div", "button", "input")
- `attrs` (object): Attributes and event handlers
- `children` (any): Child elements or text content

**Returns:** Virtual DOM object

**Example:**
```javascript
// Simple element
h("div", { class: "container" }, "Hello World")

// With multiple children
h("div", {},
  h("h1", {}, "Title"),
  h("p", {}, "Paragraph content")
)
```

#### `createElement(vnode)`
Converts a virtual DOM node to a real DOM element.

#### `updateElement(parent, newVNode, oldVNode, index)`
Updates DOM elements by comparing virtual nodes and applying minimal changes.

### State Management (`state.js`)

#### `useState(initialValue)`
Manages component state similar to React's useState.

**Parameters:**
- `initialValue` (any): Initial state value

**Returns:** Array with `[currentValue, setter]`

**Example:**
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return h("div", {},
    h("p", {}, `Count: ${count}`),
    h("button", { 
      onclick: () => setCount(count + 1) 
    }, "Increment")
  );
}
```

#### `useEffect(callback, dependencies)`
Handles side effects and lifecycle events.

**Parameters:**
- `callback` (function): Function to run when dependencies change
- `dependencies` (array): Array of values to watch for changes

**Example:**
```javascript
function Timer() {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // Empty array means run once on mount
  
  return h("div", {}, `Time: ${time}s`);
}
```

#### `renderAppFn(component, mountPoint)`
Mounts and renders the application.

**Parameters:**
- `component` (function): Root component function
- `mountPoint` (HTMLElement): DOM element to mount the app

### Routing (`router.js`)

#### `Router(callback)`
Sets up client-side routing with hash-based navigation.

**Parameters:**
- `callback` (function): Function called when route changes

#### `navigate(path)`
Programmatically navigate to a route.

**Parameters:**
- `path` (string): Route path to navigate to

**Example:**
```javascript
import { Router, navigate } from "./framework/router.js";

Router((route) => {
  console.log("Current route:", route);
  renderApp(); // Re-render app with new route
});

// Navigate programmatically
navigate("about"); // Goes to #/about
```

## Examples

### Creating Elements

#### Basic Element
```javascript
// Creates: <div>Hello World</div>
h("div", {}, "Hello World")
```

#### Element with Attributes
```javascript
// Creates: <div class="container" id="main">Content</div>
h("div", { 
  class: "container", 
  id: "main" 
}, "Content")
```

#### Input Element with Value
```javascript
const [text, setText] = useState("");

h("input", {
  type: "text",
  value: text,
  placeholder: "Enter text...",
  oninput: (e) => setText(e.target.value)
})
```

### Adding Events

Events are added using `on` prefixed attributes:

```javascript
// Click event
h("button", {
  onclick: () => console.log("Clicked!")
}, "Click Me")

// Multiple events
h("input", {
  onfocus: () => console.log("Focused"),
  onblur: () => console.log("Blurred"),
  oninput: (e) => console.log("Input:", e.target.value)
})

// Form submission
h("form", {
  onsubmit: (e) => {
    e.preventDefault();
    console.log("Form submitted");
  }
}, 
  h("input", { type: "text" }),
  h("button", { type: "submit" }, "Submit")
)
```

### Nesting Elements

Elements can be nested by passing them as children:

```javascript
// Simple nesting
h("div", { class: "parent" },
  h("h1", {}, "Title"),
  h("p", {}, "Description"),
  h("div", { class: "child" },
    h("span", {}, "Nested content")
  )
)

// Dynamic nesting with arrays
const items = ["Apple", "Banana", "Cherry"];

h("ul", {},
  items.map(item => 
    h("li", { key: item }, item)
  )
)
```

### Adding Attributes

Attributes are passed as the second parameter to `h()`:

```javascript
// CSS classes and styles
h("div", {
  class: "my-class another-class",
  style: "color: blue; font-size: 16px;"
}, "Styled content")

// Data attributes
h("div", {
  "data-id": "123",
  "data-category": "electronics"
}, "Product")

// Form attributes
h("input", {
  type: "email",
  required: true,
  placeholder: "Enter email",
  maxlength: "50"
})

// Boolean attributes
h("input", {
  type: "checkbox",
  checked: true,
  disabled: false
})
```

### Complete Component Example

```javascript
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputText.trim(),
        completed: false
      }]);
      setInputText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return h("div", { class: "todo-app" },
    h("h1", {}, "My Todo App"),
    
    h("form", { onsubmit: addTodo },
      h("input", {
        type: "text",
        value: inputText,
        oninput: (e) => setInputText(e.target.value),
        placeholder: "Add a new todo..."
      }),
      h("button", { type: "submit" }, "Add")
    ),
    
    h("ul", { class: "todo-list" },
      todos.map(todo =>
        h("li", { 
          key: todo.id,
          class: todo.completed ? "completed" : ""
        },
          h("input", {
            type: "checkbox",
            checked: todo.completed,
            onchange: () => toggleTodo(todo.id)
          }),
          h("span", {}, todo.text)
        )
      )
    )
  );
}
```

## How It Works

### Virtual DOM and Reconciliation

The framework maintains a virtual representation of the DOM in JavaScript objects. When state changes:

1. **Re-render**: The component function runs again, creating a new virtual DOM tree
2. **Diffing**: The new virtual DOM is compared with the previous version
3. **Patching**: Only the differences are applied to the real DOM

This process minimizes expensive DOM operations and provides smooth updates.

### State Management Flow

1. **State Initialization**: `useState` creates a state slot in the global `hookStates` array
2. **State Updates**: When `setState` is called, the value is updated and a re-render is scheduled
3. **Re-rendering**: `renderApp()` is called, which resets hook indices and runs the component
4. **DOM Updates**: The virtual DOM diffing process updates only changed elements

### Hook System

The framework uses a simple hook system based on call order:

- Hooks are stored in global arrays (`hookStates`, `effectStates`)
- Each render, hook indices reset to 0
- Hooks are called in the same order each render, maintaining consistency
- This is why hooks must be called at the top level, not inside loops or conditions

### Event Handling

Events are handled through:

1. **Attribute Detection**: Attributes starting with "on" are treated as event handlers
2. **Event Registration**: Instead of `addEventListener`, direct property assignment is used (`el.onclick = handler`)
3. **Event Propagation**: Standard DOM event behavior is maintained

### Why This Design?

**Virtual DOM Benefits:**
- Predictable updates through declarative syntax
- Performance optimization through batched DOM operations
- Easier debugging with virtual representations

**Hook-based State:**
- Familiar API for React developers
- Functional component pattern
- Automatic re-rendering on state changes

**Simple Architecture:**
- Minimal dependencies and overhead
- Easy to understand and modify
- Sufficient for small to medium applications

This framework demonstrates core concepts of modern frontend frameworks while remaining lightweight and educational.