import { Hono } from "hono";
import {userSignin, userSignup } from "../controller/userController";

export const userRouter = new Hono();

userRouter.post("/signup", userSignup);
userRouter.post("/signin", userSignin);
