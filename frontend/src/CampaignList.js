import React from "react";

function CampaignList({ campaigns, onUpdate }) {
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/campaigns/${id}`, { method: "DELETE" });
    onUpdate();
  };

  const handleStatusChange = async (id, status) => {
    await fetch(`http://localhost:5000/api/campaigns/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    onUpdate();
  };

  return (
    <table border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Client</th>
          <th>Start Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((c) => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.clientName}</td>
            <td>{c.startDate}</td>
            <td>
              <select
                value={c.status}
                onChange={(e) => handleStatusChange(c._id, e.target.value)}
              >
                <option>Active</option>
                <option>Paused</option>
                <option>Completed</option>
              </select>
            </td>
            <td>
              <button onClick={() => handleDelete(c._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CampaignList;
