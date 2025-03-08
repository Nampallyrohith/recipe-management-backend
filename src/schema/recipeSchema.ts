import mongoose from "mongoose";


const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  category: { type: String, default: "Uncategorized" },
  order: { type: Number, default: 0 }, // Order for sorting
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
