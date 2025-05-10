export function createelement(obj){
    const el = document.createElement(obj.tag)
    if (obj.tag === 'text') {
      return document.createTextNode(obj.text);
    }
    
    for(let [key , value] of Object.entries(obj.attrs || {})){
        el.setAttribute(key, value)
    }
    for(let childobj of obj.children || []) {

      el.appendChild(createelement(childobj))
    }
    return el
}
