import mongoose from "mongoose";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import * as routes from "./routes/index";

dotenv.config();
console.clear();

const PORT = process.env.PORT || 9002;
const MONGO_URI = process.env.MONGO_URI_DEV || "mongodb://localhost:27017/ACEB";
const APP = express();

mongoose.set("strictQuery", true);

APP.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

APP.use(express.json());

//URL-------------------------------------
APP.use("/api", routes.USUARIO);

APP.use((req: Request, res: Response) => res.status(404).send("ERROR path not found."));

APP.get("/api", (req, res) => {
  res.send("API ready");
});

mongoose
  .connect(`${MONGO_URI}`)
  .then(() => {
    console.log("MongoDB connected 🟢");
  })
  .catch((error: any) => {
    console.log("ERROR 🔴");
    console.log(error);
  });

APP.listen(PORT, () => console.log(`API lisening: http://localhost:${PORT}/ACEB`));
