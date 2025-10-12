
window.onload = function() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html";
  } else {
    fetchCampaigns();
  }
};


document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});


document.getElementById("addCampaignForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("campaignName").value.trim();
  const client = document.getElementById("clientName").value.trim();
  const date = document.getElementById("startDate").value;
  const status = document.getElementById("status").value;

  if (name && client && date) {
    await fetch("http://localhost:5000/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, client, date, status }),
    });

    document.getElementById("addCampaignForm").reset();
    fetchCampaigns();
  }
});


async function fetchCampaigns() {
  try {
    const res = await fetch("http://localhost:5000/api/campaigns");
    const campaigns = await res.json();
    renderCampaigns(campaigns);
    updateDashboard(campaigns);
  } catch (err) {
    console.error("Failed to fetch campaigns:", err);
  }
}


function renderCampaigns(campaigns) {
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
        <select onchange="updateStatus('${c._id}', this.value)">
          <option ${c.status === "Active" ? "selected" : ""}>Active</option>
          <option ${c.status === "Paused" ? "selected" : ""}>Paused</option>
          <option ${c.status === "Completed" ? "selected" : ""}>Completed</option>
        </select>
      </td>
      <td>
        <button class="delete-btn" onclick="deleteCampaign('${c._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}


async function updateStatus(id, newStatus) {
  await fetch(`http://localhost:5000/api/campaigns/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  fetchCampaigns();
}


async function deleteCampaign(id) {
  await fetch(`http://localhost:5000/api/campaigns/${id}`, {
    method: "DELETE",
  });
  fetchCampaigns();
}


function updateDashboard(campaigns) {
  document.getElementById("totalCount").textContent = campaigns.length;
  document.getElementById("activeCount").textContent = campaigns.filter(c => c.status === "Active").length;
  document.getElementById("pausedCount").textContent = campaigns.filter(c => c.status === "Paused").length;
  document.getElementById("completedCount").textContent = campaigns.filter(c => c.status === "Completed").length;
}


document.getElementById("search").addEventListener("input", fetchCampaigns);
