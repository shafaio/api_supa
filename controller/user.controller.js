import { PrismaClient } from "@prisma/client";
import { z } from "zod";

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
      const validate = UserSchema.parse(req.body);

      if (!validate.success) {
        throw validate.error;
      }

      const user = await prisma.user.create({
        data: {
          email: validate.email,
          username: validate.username,
          password: validate.password,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.flatten().fieldErrors;
        res.status(400).json({ error: errorMessage });
      } else {
        // Tangani kesalahan lainnya
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  },
};

export default userController;
