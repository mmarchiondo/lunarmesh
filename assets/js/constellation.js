const svg = document.getElementById("sky");

async function loadConstellation() {
  const res = await fetch("/telemetry/constellation.json");
  const data = await res.json();

  svg.innerHTML = "";

  const center = { x: 500, y: 300 };
  const radiusStep = 120;

  const positions = {};

  data.nodes.forEach((node, i) => {
    const angle = (i / data.nodes.length) * Math.PI * 2;
    const roleOffset = node.role === "GATEWAY" ? 0 :
                       node.role === "RELAY" ? 1 : 2;

    const r = radiusStep * roleOffset + 80;

    positions[node.id ?? i] = {
      x: center.x + Math.cos(angle) * r,
      y: center.y + Math.sin(angle) * r
    };
  });

  // Draw links
  data.nodes.forEach((node, i) => {
    const from = positions[node.id ?? i];
    (node.links || []).forEach(link => {
      const to = positions[link];
      if (!to) return;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", from.x);
      line.setAttribute("y1", from.y);
      line.setAttribute("x2", to.x);
      line.setAttribute("y2", to.y);
      line.classList.add("link");

      svg.appendChild(line);
    });
  });

  // Draw stars
  data.nodes.forEach((node, i) => {
    const pos = positions[node.id ?? i];

    const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    star.setAttribute("cx", pos.x);
    star.setAttribute("cy", pos.y);
    star.setAttribute("r", 4 + (node.signal ?? 0.5) * 4);
    star.classList.add("star");

    if (node.role === "GATEWAY") {
      star.classList.add("gateway");
    }

    if (data.mode === "private") {
      star.addEventListener("mouseenter", () => {
        star.setAttribute("r", 10);
      });
      star.addEventListener("mouseleave", () => {
        star.setAttribute("r", 6);
      });
    }

    svg.appendChild(star);
  });
}

loadConstellation();
setInterval(loadConstellation, 20000);