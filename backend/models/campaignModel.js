import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: String,
  client: String,
  date: String,
  status: String,
});

export default mongoose.model("Campaign", campaignSchema);
