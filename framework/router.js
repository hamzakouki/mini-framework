// framework/router.js
let routes = {};
let notFoundComponent = () => h("div", {}, "404 Not Found");
let rootElement = null;
let app = null;

function getCurrentPath() {
  return window.location.hash.slice(1) || "/";
}

export function defineRoutes(routeMap, notFound) {
  routes = routeMap;
  if (notFound) notFoundComponent = notFound;
}

export function startRouter(appFn, mountPoint) {
  rootElement = mountPoint;
  app = appFn;

  window.addEventListener("hashchange", renderApp);
  window.addEventListener("load", renderApp);

  renderApp();
}

function renderApp() {
  const path = getCurrentPath();
  const component = routes[path] || notFoundComponent;

  // We mount the router-wrapped component (which returns a vnode)
  import("./state.js").then(({ renderAppFn }) => {
    renderAppFn(() => app(component), rootElement);
  });
}