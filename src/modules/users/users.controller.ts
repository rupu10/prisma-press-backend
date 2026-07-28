import { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus  from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";





const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {

    const payload = req.body;

    const user = await userService.createUserIntoDB(payload);

    // res.status(httpStatus.CREATED).json({
    //     success: true,
    //     statusCode: httpStatus.CREATED, 
    //     message: "User registered successfully",
    //     data: {
    //         user
    //     }
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "user registered successfully",
        data: {user}
    })

})

const getMyProfileFromDB = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {

    const {accessToken} = req.cookies

    const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret)

    if(typeof verifiedToken === "string"){
        throw new Error(verifiedToken)
    }

    const profile = await userService.getMyProfileFromDB(verifiedToken.id)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "user profile fetched successfully",
        data: {profile}
    })
    
})

export const userController = {
    createUser,
    getMyProfileFromDB
}

// const createUser = async(req: Request, res: Response)=> {

//     const payload = req.body;

//     try {
//         const user = await userService.createUserIntoDB(payload)
//         res.status(httpStatus.CREATED).json({
//         success: true,
//         statusCode: httpStatus.CREATED,
//         message: "user registered",
//         data: {
//             user
//         }
//     })
//     } catch (error) {
//         console.log(error);
//         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//             message: "Failed to create",
//             error: (error as Error).message
//         })
//     }
// }