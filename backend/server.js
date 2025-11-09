import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Campaign from "./models/campaignModel.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/campaignDB")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

// ✅ POST route to add campaign
app.post("/api/campaigns", async (req, res) => {
  try {
    const { name, client, date, status } = req.body;
    const newCampaign = new Campaign({ name, client, date, status });
    await newCampaign.save();
    res.json({ message: "Campaign added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding campaign" });
  }
});

// ✅ GET route to fetch campaigns
app.get("/api/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
