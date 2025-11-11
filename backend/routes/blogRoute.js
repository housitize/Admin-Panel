import express from "express";
import { createBlog, getBlogById, getBlogs, updateBlog , deleteBlog } from "../controllers/blogController";


const router = express.Router();

router.post("/create-blog" , createBlog);
router.get("/get-blog/:id" , getBlogById);
router.get("/get-blog" , getBlogs);
router.put("/update-blog" , updateBlog);
router.delete("/delete-blog" , deleteBlog);


export default router;