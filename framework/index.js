export function createelement(obj) {
  if (obj.tag === 'text') {
    return document.createTextNode(obj.text);
  }

  const el = document.createElement(obj.tag);

  for (let [key, value] of Object.entries(obj.attrs || {})) {
    if (key.startsWith('on') && typeof value === 'function') {
      // *********** ngl3o on :  Convert mn "onClick" l "click" ************* 
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else if (key === "value" && (obj.tag === "input" || obj.tag === "textarea")) {
    el.value = value; // ← Fix here
  } else {
    el.setAttribute(key, value);
  }
  }

  for (let childobj of obj.children || []) {
    el.appendChild(createelement(childobj));
  }

  return el;
}
