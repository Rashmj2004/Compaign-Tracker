let campaigns = [];

// ===== PAGE LOAD CHECK =====
window.onload = async function() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Load campaigns from MongoDB
  try {
    const res = await fetch("/api/campaigns");
    campaigns = await res.json(); // populate array from DB
    renderCampaigns();
    updateDashboard();
  } catch (err) {
    console.error("Failed to load campaigns from DB:", err);
  }
};

// ===== LOGOUT =====
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

// ===== ADD CAMPAIGN =====
document.getElementById("addCampaignForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("campaignName").value.trim();
  const client = document.getElementById("clientName").value.trim();
  const date = document.getElementById("startDate").value;
  const status = document.getElementById("status").value;

  if (!name || !client || !date) return;

  const campaign = { name, client, date, status };

  // keep in-memory array
  campaigns.push(campaign);

  // save to MongoDB
  try {
    await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaign)
    });
  } catch (err) {
    console.error("Failed to save campaign to DB:", err);
  }

  renderCampaigns();
  updateDashboard();
  e.target.reset();
});

// ===== RENDER CAMPAIGNS =====
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

// ===== UPDATE STATUS =====
function updateStatus(index, newStatus) {
  campaigns[index].status = newStatus;
  updateDashboard();
}

// ===== DELETE CAMPAIGN =====
function deleteCampaign(index) {
  campaigns.splice(index, 1);
  renderCampaigns();
  updateDashboard();
}

// ===== UPDATE DASHBOARD =====
function updateDashboard() {
  document.getElementById("totalCount").textContent = campaigns.length;
  document.getElementById("activeCount").textContent = campaigns.filter(c => c.status === "Active").length;
  document.getElementById("pausedCount").textContent = campaigns.filter(c => c.status === "Paused").length;
  document.getElementById("completedCount").textContent = campaigns.filter(c => c.status === "Completed").length;
}

// ===== SEARCH =====
document.getElementById("search").addEventListener("input", renderCampaigns);
