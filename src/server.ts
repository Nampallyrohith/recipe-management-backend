import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./handlers/router.js";
import env from "./services/client.js";
import { connectAndQuery } from "./services/connection.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api", router);

(async () => {
  try {
    connectAndQuery();
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize tables or start the server:", error);
    process.exit(1);
  }
})();
