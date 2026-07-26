import { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus  from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";





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

export const userController = {
    createUser
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