import express from "express";

import { getUser, loginUser , registerUser  , verifiedOtp , updateUser , getAllDevelopers } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login" , loginUser);
userRouter.post("/verifiedOtp" , verifiedOtp);

userRouter.get("/getUser",authUser , getUser);

userRouter.put("/updateUser", authUser, updateUser);

userRouter.get("/getAllDevelopers", getAllDevelopers);

export default userRouter;