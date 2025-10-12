let campaigns = [];


window.onload = function() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    
    window.location.href = "login.html";
  }
};


document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});
document.getElementById("addCampaignForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("campaignName").value.trim();
  const client = document.getElementById("clientName").value.trim();
  const date = document.getElementById("startDate").value;
  const status = document.getElementById("status").value;

  if (name && client && date) {
    campaigns.push({ name, client, date, status });
    renderCampaigns();
    updateDashboard();
    e.target.reset();
  }
});


function renderCampaigns() {
  const tbody = document.getElementById("campaignTableBody");
  tbody.innerHTML = "";
  const searchTerm = document.getElementById("search").value.toLowerCase();

  const filtered = campaigns.filter(c =>
    c.name.toLowerCase().includes(searchTerm) ||
    c.client.toLowerCase().includes(searchTerm)
  );

  filtered.forEach((c, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${c.name}</td>
      <td>${c.client}</td>
      <td>${c.date}</td>
      <td>
        <select onchange="updateStatus(${i}, this.value)">
          <option ${c.status === "Active" ? "selected" : ""}>Active</option>
          <option ${c.status === "Paused" ? "selected" : ""}>Paused</option>
          <option ${c.status === "Completed" ? "selected" : ""}>Completed</option>
        </select>
      </td>
      <td>
        <button class="delete-btn" onclick="deleteCampaign(${i})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}


function updateStatus(index, newStatus) {
  campaigns[index].status = newStatus;
  updateDashboard();
}

function deleteCampaign(index) {
  campaigns.splice(index, 1);
  renderCampaigns();
  updateDashboard();
}


function updateDashboard() {
  document.getElementById("totalCount").textContent = campaigns.length;
  document.getElementById("activeCount").textContent = campaigns.filter(c => c.status === "Active").length;
  document.getElementById("pausedCount").textContent = campaigns.filter(c => c.status === "Paused").length;
  document.getElementById("completedCount").textContent = campaigns.filter(c => c.status === "Completed").length;
}


document.getElementById("search").addEventListener("input", renderCampaigns);
