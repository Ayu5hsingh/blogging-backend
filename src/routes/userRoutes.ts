import { Hono } from "hono";
import { userSignup } from "../controller/userController";

export const userRouter = new Hono();

userRouter.post('/signup',userSignup)