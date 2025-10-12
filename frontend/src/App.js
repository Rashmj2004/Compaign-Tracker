import React, { useEffect, useState } from "react";
import CampaignForm from "./CampaignForm";
import CampaignList from "./CampaignList";

function App() {
  const [campaigns, setCampaigns] = useState([]);

  // Fetch all campaigns
  const fetchCampaigns = async () => {
    const res = await fetch("http://localhost:5000/api/campaigns");
    const data = await res.json();
    setCampaigns(data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>📊 Campaign Tracker</h2>
      <CampaignForm onAdd={fetchCampaigns} />
      <CampaignList campaigns={campaigns} onUpdate={fetchCampaigns} />
    </div>
  );
}

export default App;
