import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { error } from "node:console";

const createPost = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const id = req.user?.id
    const payload = req.body;
    const result = await postService.createPost(payload, id as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post created successfully",
        data: result
    })
})
const getAllPosts = catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
    const result = await postService.getAllPosts();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Posts retrieved",
        data: result
    })
})

const getPostsStats = ()=> {

}

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
    const authorId = req.user?.id;

    const result = await postService.getMyPosts(authorId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Posts retrieved",
        data: result
    })
})

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{
    const postId = req.params.postId;
    if(!postId){
        throw new Error("Post id required")
    }

    const result = await postService.getPostById(postId as string)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Post retrieved",
        data: result
    })
})

const updatePost = ()=> {

}

const deletePost= () => {

}

export const postController = {
    createPost,
    getAllPosts,
    getPostsStats,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost
}