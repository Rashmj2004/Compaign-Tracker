import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: String,
  client: String,
  date: String,
  status: String
});

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;
