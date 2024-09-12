import express from "express";
import appRouter from "./routes/index.js";
import { connectToDatabase } from "./db/index.js";
import { initRedisClient } from "./redis.js";
const app = express();
//here express work like a midle man to connect with server and reqest

//#region middlewares
app.use(express.json());
//
app.use("/api/v1/products", appRouter);

const PORT = process.env.PORT || 5000;
const initapp = async () => {
  await connectToDatabase();
  await initRedisClient();
};

initapp()
  .then(() => {
    app.listen(PORT, () => console.log("Server Open At port: ", PORT));
  })
  .catch((err) => {
    console.log("Erro occured with mysql  Connection. Error = ", err);
    process.exit(0);
  });
