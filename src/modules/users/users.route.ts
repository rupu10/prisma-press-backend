import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.post("/register", userController.createUser)

export const userRoute = router;