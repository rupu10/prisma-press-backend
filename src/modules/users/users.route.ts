import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./users.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { auth } from "../../middleware/auth";

const router = Router();



router.post("/register", userController.createUser);



router.get("/me" ,
//     (req: Request, res: Response, next: NextFunction)=>{
//     // console.log(req);
//     const {accessToken} = req.cookies
    
//         const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)
    
//         // if(typeof verifiedToken === "string"){
//         //     throw new Error(verifiedToken)
//         // }

//         // const {email, name, id, role} = verifiedToken;


//         if (!verifiedToken.success){
//             throw new Error(verifiedToken.error)
//         }

//         const {email, name, id, role} = verifiedToken.data as JwtPayload;
        
//         // const requiredRoles = ["ADMIN", "USER"]
//         const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER]

//         if (!requiredRoles.includes(role)){
//             return res.status(403).json({
//                 success: false,
//                 statusCode: httpStatus.FORBIDDEN,
//                 message: "Forbidden Access"
//             })
//         }

//         req.user = {
//             email, 
//             name,
//             id, 
//             role
//         }

//      console.log(verifiedToken);
//      next();
// }, 

auth(Role.USER, Role.ADMIN, Role.AUTHOR),
userController.getMyProfileFromDB)

router.put("/my-profile", auth(Role.ADMIN, Role.USER, Role.AUTHOR), userController.updateMyProfile
)

export const userRoute = router;