import { createElement, updateElement } from "./dom.js";

const hookStates = [];
let hookIndex = 0;
const effectStates = [];
let effectIndex = 0;

export function useState(initialValue) {
  const currentIndex = hookIndex;
  if (hookStates[currentIndex] === undefined) {
    hookStates[currentIndex] = initialValue;
  }
  const setState = (newValue) => {
    hookStates[currentIndex] = typeof newValue === 'function'
      ? newValue(hookStates[currentIndex])
      : newValue;
       requestAnimationFrame(() => {
    renderApp();
  });
  };

  const value = hookStates[currentIndex];
  hookIndex++;
  return [value, setState];
}


export function useEffect(callback, deps = []) {

// callback: the function li baghi t run ( console.log("Hello") )
// deps: an array of dependencies. If these change, the effect runs again.

  const currentIndex = effectIndex;
  const prevDeps = effectStates[currentIndex];

  let hasChanged = true;


  // ******** loop 3la deps to check if something change if prevDeps exist *****************

  if (prevDeps) {
    hasChanged = false;
    for (let i = 0; i < deps.length; i++) {
      if (deps[i] !== prevDeps[i]) {
        hasChanged = true;
        break;
      }
    }
  }


  
if (hasChanged) {
  //************* * Defer effect until after render ***********
  Promise.resolve().then(callback);

  // ******** Save current dependencies for next render *****************
  effectStates[currentIndex] = deps;
}
  effectIndex++;
}



let rootEl;
let appFn;
let oldVNode = null;

export function renderAppFn(fn, mountPoint) {
  rootEl = mountPoint;
  appFn = fn;
  renderApp();
}

export function renderApp() {
  hookIndex = 0;
  effectIndex = 0;
  const newVNode =  appFn();
  if (!rootEl) throw new Error("Mount point not set");
  updateElement(rootEl, newVNode, oldVNode);
  oldVNode = newVNode;
}
