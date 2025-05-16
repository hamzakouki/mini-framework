import { createelement } from "./index.js";

const hookStates = [];
let hookIndex = 0;

export function useState(initialValue) {
  const currentIndex = hookIndex;
  if (hookStates[currentIndex] === undefined) {
    hookStates[currentIndex] = initialValue;
  }
  const setState = (newValue) => {
    hookStates[currentIndex] = typeof newValue === 'function'
      ? newValue(hookStates[currentIndex])
      : newValue;
    renderApp();
  };

  const value = hookStates[currentIndex];
  hookIndex++;
  return [value, setState];
}

let rootEl;
let appFn;

export function renderAppFn(fn, mountPoint) {
  
  rootEl = mountPoint;
  appFn = fn;
  renderApp();
}

export function renderApp() {
  hookIndex = 0;
  rootEl.innerHTML = "";
  rootEl.appendChild(createelement(appFn()));
}