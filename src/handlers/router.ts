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



export default router;
