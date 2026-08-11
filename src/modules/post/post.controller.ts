import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"

const createPost = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
     
})
const getAllPosts = () => {

}

const getPostsStats = ()=> {

}

const getMyPosts = () => {

}

const getPostById = () => {

}

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