import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  username: z.string().min(5, { message: "At least have 5 Charaacter" }),
  password: z.string(),
});

const userController = {
  getUser: async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createUser: async (req, res) => {
    try {
      const validationResult = UserSchema.safeParse(req.body);

      if (!validationResult.success) {
        res
          .status(400)
          .json({ errors: validationResult.error.flatten().fieldErrors });
        return;
      }

      const { email, username, password } = validationResult.data;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email: email || "",
          username,
          password: hashedPassword,
        },
      });

      res.status(201).json({
        message: "Success Create User",
        data: user,
      });
    } catch (error) {
      if (error.code === "P2002") {
        res.status(400).json({ error: "Email telah digunakan" });
        return;
      }
      res.status(500).json({ error: "Kesalahan server internal" });
    }
  },
};

export default userController;
