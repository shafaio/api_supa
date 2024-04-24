import express from "express";
import userController from "../controller/user.controller.js";
import { authenticateJWT, authenticateWhitoutJWT } from "../middleware.js";
const route = express.Router();

// route.get("/user", userController.getUser);
route.get("/user", authenticateWhitoutJWT, userController.getUser);
route.post("/user", userController.createUser);

export default route;
