import mongoose from "mongoose";
import env from "./client.js";

export const mongo = mongoose
  .connect(env.MONGO_URI as string, {})
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

export const connectAndQuery = async () => {};

connectAndQuery();
