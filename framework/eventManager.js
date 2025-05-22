<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Test render</title>
</head>
<body>
  <div id="app"></div>

  <script type="module">
    // Ton code ici
    function renderElement(tagName, attrs, children) {
        const elem = document.createElement(tagName);
        
        for (const [k, v] of Object.entries(attrs)) {
            if (k.startsWith('on')) {
                const eventType = k.slice(2).toLowerCase();
                elem[`on${eventType}`] = v;
                continue;
            }
            elem.setAttribute(k, v);
            console.log("elem :", elem);
        }
        for (let child of children) {
             console.log("child :",child);
            const childelem = render(child);
            console.log("childelem :",childelem);
            elem.appendChild(childelem);
        }
        return elem;
    }

    function render(vNode) {
        if (typeof vNode === "string") {
            return document.createTextNode(vNode);
        }
        return renderElement(vNode.tagName, vNode.attrs, vNode.children);
    }

    // Exemple de Virtual DOM
    const vApp = {
      tagName: "div",
      attrs: { id: "main" },
      children: [
        {
          tagName: "h1",
          attrs: {},
          children: ["Bonjour 👋"]
        },
        {
          tagName: "button",
          attrs: {
            onclick: () => alert("Tu as cliqué sur le bouton !"),
            style: "padding:10px; background: lightblue;"
          },
          children: ["Clique ici"]
        }
      ]
    };

    // Rendu dans la page
    const app = document.getElementById("app");
    app.appendChild(render(vApp));
  </script>
</body>
</html>

