import React, { useState } from "react";

function CampaignForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    clientName: "",
    startDate: "",
    status: "Active",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", clientName: "", startDate: "", status: "Active" });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        name="name"
        placeholder="Campaign Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="clientName"
        placeholder="Client Name"
        value={form.clientName}
        onChange={handleChange}
        required
      />
      <input
        name="startDate"
        type="date"
        value={form.startDate}
        onChange={handleChange}
        required
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Active</option>
        <option>Paused</option>
        <option>Completed</option>
      </select>
      <button type="submit">Add Campaign</button>
    </form>
  );
}

export default CampaignForm;
