import express from "express";
import Campaign from "./campaignModel.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});


router.post("/", async (req, res) => {
  const { name, client, date, status } = req.body;
  const newCampaign = new Campaign({ name, client, date, status });
  await newCampaign.save();
  res.json(newCampaign);
});


router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const updated = await Campaign.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
});
router.delete("/:id", async (req, res) => {
  await Campaign.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
