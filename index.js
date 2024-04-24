import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import express from "express";
const app = express();
const port = 3415;

app.use(express.json());
const prisma = new PrismaClient();

app.get("/", async (req, res) => {
  const user = await prisma.user.findMany();

  res.json({ data: user });
});

app.use(userRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
