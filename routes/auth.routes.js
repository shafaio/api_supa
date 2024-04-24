import express from "express";
import authenticatedController from "../controller/auth.controller.js";

const route = express.Router();

route.post("/login", authenticatedController.login);

export default route;
