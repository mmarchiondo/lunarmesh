// assets/js/nodes.js

const nodes = [
  {
    name: "gateway.lunarmesh",
    role: "Gateway",
    phase: "🌕",
    status: "online",
    seen: "Just now",
    hops: 0
  },
  {
    name: "relay-01.lunarmesh",
    role: "Relay",
    phase: "🌓",
    status: "online",
    seen: "2 min ago",
    hops: 1
  },
  {
    name: "mobile-philly",
    role: "Mobile",
    phase: "🌒",
    status: "idle",
    seen: "8 min ago",
    hops: 2
  }
];

const grid = document.querySelector(".node-grid");

nodes.forEach(node => {
  const el = document.createElement("div");
  el.className = "node";

  el.innerHTML = `
    <h3>${node.phase} ${node.name}</h3>
    <div class="meta">Role: ${node.role}</div>
    <div class="meta">Status: ${node.status}</div>
    <div class="meta">Last Seen: ${node.seen}</div>
    <div class="meta">Hops: ${node.hops}</div>
  `;

  grid.appendChild(el);
});