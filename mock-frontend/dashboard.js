
window.updateDashboard = function(campaigns) {
  document.getElementById("total").textContent = campaigns.length;
  document.getElementById("active").textContent = campaigns.filter(c => c.status === "Active").length;
  document.getElementById("paused").textContent = campaigns.filter(c => c.status === "Paused").length;
  document.getElementById("completed").textContent = campaigns.filter(c => c.status === "Completed").length;
}
