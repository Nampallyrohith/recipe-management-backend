import { Recipe } from "../schema/recipeSchema.js";
import { Router, Request, Response } from "express";

type RouteHandler = (req: Request, res: Response) => void;
export const defineRoute = (handler: RouteHandler) => handler;

const router = Router();



export default router;
