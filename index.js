import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import express from "express";
import rateLimit from "express-rate-limit";
const app = express();
const port = 3415;

app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000, // Jangka waktu: 1 menit
  max: 60, // Maksimum 10 permintaan per menit per IP
  message: {
    error: "Terlalu banyak permintaan dari IP ini, coba lagi dalam satu menit.",
  },
});

app.use(limiter);

app.get("/", async (req, res) => {
  res.send("Hello");
});

app.use(userRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
