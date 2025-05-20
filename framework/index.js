export function createelement(obj) {
  if (obj.tag === 'text') {
    return document.createTextNode(obj.text);
  }

  const el = document.createElement(obj.tag);

  for (let [key, value] of Object.entries(obj.attrs || {})) {
    if (key.startsWith('on') && typeof value === 'function') {
      // Convert "onClick" → "click"
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else {
      el.setAttribute(key, value);
    }
  }

  for (let childobj of obj.children || []) {
    el.appendChild(createelement(childobj));
  }

  return el;
}
