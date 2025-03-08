import { Recipe } from "../schema/recipeSchema.js";
import { Router, Request, Response } from "express";

type RouteHandler = (req: Request, res: Response) => void;
export const defineRoute = (handler: RouteHandler) => handler;

const router = Router();

router.get(
  "/recipes",
  defineRoute(async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ category: 1, order: 1 });
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  })
);

router.post(
    "/recipes",
    defineRoute(async (req, res) => {
      try {
        const { title, ingredients, instructions, category } = req.body;
        if (!title || !ingredients.length || !instructions) {
          return res.status(400).json({ error: "All fields are required" });
        }
        const count = await Recipe.countDocuments({ category });
        const newRecipe = new Recipe({
          title,
          ingredients,
          instructions,
          category,
          order: count,
        });
        await newRecipe.save();
        res.status(201).json(newRecipe);
      } catch (err) {
        res.status(500).json({ error: err });
      }
    })
  );
  
  router.put(
    "/recipes/:id",
    defineRoute(async (req, res) => {
      try {
        const { id } = req.params;
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedRecipe)
          return res.status(404).json({ error: "Recipe not found" });
        res.json(updatedRecipe);
      } catch (err) {
        res.status(500).json({ error: err });
      }
    })
  );
  





export default router;
