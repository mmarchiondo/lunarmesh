async function loadAdminData() {
  const res = await fetch("/telemetry/nodes.private.json");
  const nodes = await res.json();

  renderStats(nodes);
  renderTable(nodes);
}

function renderStats(nodes) {
  const el = document.querySelector(".admin-stats");
  el.innerHTML = "";

  const online = nodes.filter(n => Date.now() - n.lastSeen < 120000).length;

  const stats = [
    { label: "Total Nodes", value: nodes.length },
    { label: "Online", value: online },
    { label: "Gateways", value: nodes.filter(n => n.role === "GATEWAY").length }
  ];

  stats.forEach(s => {
    const div = document.createElement("div");
    div.className = "stat";
    div.innerHTML = `<strong>${s.value}</strong><br>${s.label}`;
    el.appendChild(div);
  });
}

function renderTable(nodes) {
  const body = document.getElementById("admin-nodes");
  body.innerHTML = "";

  nodes.forEach(node => {
    const age = Math.round((Date.now() - node.lastSeen) / 60000);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${node.name}</td>
      <td>${node.role}</td>
      <td>${age < 2 ? "🟢 Online" : "🟡 Idle"}</td>
      <td>${node.battery ?? "--"}%</td>
      <td>${node.snr ?? "--"}</td>
      <td>${age}m</td>
      <td><button disabled>Manage</button></td>
    `;

    body.appendChild(tr);
  });
}

loadAdminData();
setInterval(loadAdminData, 15000);