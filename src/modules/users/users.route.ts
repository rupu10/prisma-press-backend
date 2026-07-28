import { Router } from "express";
import { userController } from "./users.controller";

const router = Router();

router.post("/register", userController.createUser)

router.get("/me" ,()=>{
    
}, userController.getMyProfileFromDB)

export const userRoute = router;