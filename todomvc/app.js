import {createelement} from "../framework/index.js"


const obj = {
    tag: "div",
    attrs: { class: "nameSubm" },
    children: [
      {
        tag: "input",
        attrs: {
          type: "text",
          placeholder: "Insert Name"
        }
      },
      {
        tag: "input",
        attrs: {
          type: "submit",
          placeholder: "Submit"
        }
      }
    ]
  };
  

  document.body.appendChild(createelement(obj))