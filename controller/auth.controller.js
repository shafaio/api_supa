import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authenticatedController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user)
      return res.status(203).json({
        message: "User not defined",
      });

    console.table(user);
    const { id } = user;

    if (username === user.username && password === user.password) {
      const token = jwt.sign({ id }, "random_secret", {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  },
};

export default authenticatedController;
