import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file, mainly for the development environment
dotenv.config({ path: path.join(__dirname, "../../.env") });

const baseConfigSchema = z.object({
  CORS_ALLOWED_ORIGIN: z.string(),
  MONGO_URI: z.string(),
  PORT: z.coerce.number().int().positive(),
});

const env = baseConfigSchema.parse(process.env);

export default env;
