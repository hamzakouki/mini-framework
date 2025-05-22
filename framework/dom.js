export function h(tag, attrs = {}, ...children) {
  return {
    tag,
    attrs,
    children: children.flat().map(child =>
      typeof child === "string" ? { tag: "text", text: child } : child
    )
  };
}

export function createElement(vnode) {
  if (vnode.tag === "text") {
    return document.createTextNode(vnode.text);
  }

  const el = document.createElement(vnode.tag);

  for (const [key, value] of Object.entries(vnode.attrs || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      el[`on${eventName}`] = value;
    } else if (key === "value" && (vnode.tag === "input" || vnode.tag === "textarea")) {
      el.value = value;
    } else {
      el.setAttribute(key, value);
    }
  }

  for (const child of vnode.children || []) {
    el.appendChild(createElement(child));
  }

  return el;
}

function changed(v1, v2) {
  return (
    typeof v1 !== typeof v2 ||
    (v1.tag === "text" && v1.text !== v2.text) ||
    v1.tag !== v2.tag
  );
}

function updateAttributes(el, newAttrs = {}, oldAttrs = {}) {
  for (const key in oldAttrs) {
    if (!(key in newAttrs)) {
      if (key.startsWith("on") && typeof oldAttrs[key] === "function") {
        const eventName = key.slice(2).toLowerCase();
        el[`on${eventName}`] = null;
      } else {
        el.removeAttribute(key);
      }
    }
  }

  for (const key in newAttrs) {
    if (newAttrs[key] !== oldAttrs[key]) {
      if (key.startsWith("on") && typeof newAttrs[key] === "function") {
        const eventName = key.slice(2).toLowerCase();
        el[`on${eventName}`] = newAttrs[key];
      } else if (key === "value" && (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "textarea")) {
        el.value = newAttrs[key];
      } else {
        el.setAttribute(key, newAttrs[key]);
      }
    }
  }
}

export function updateElement(parent, newVNode, oldVNode, index = 0) {
  const existingEl = parent.childNodes[index];

  if (!oldVNode) {
    parent.appendChild(createElement(newVNode));
    return;
  }

  if (!newVNode) {
    if (existingEl) parent.removeChild(existingEl);
    return;
  }

  if (changed(newVNode, oldVNode)) {
    parent.replaceChild(createElement(newVNode), existingEl);
    return;
  }

  if (newVNode.tag) {
    updateAttributes(existingEl, newVNode.attrs, oldVNode.attrs);

    const newChildren = newVNode.children || [];
    const oldChildren = oldVNode.children || [];

    for (let i = 0; i < newChildren.length || i < oldChildren.length; i++) {
      updateElement(existingEl, newChildren[i], oldChildren[i], i);
    }
  }
}