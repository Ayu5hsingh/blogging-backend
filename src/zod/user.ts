import { z } from "zod";

// can add more parameters : https://medium.com/@mobileatexxeta/conditional-form-validation-with-react-hook-form-and-zod-46b0b29080a3
// try making the signin accept both username and email.
export const signupSchema = z.object({
    username: z.string(),
    email: z.string().email({message: "Invalid Email"}),
    password: z.string(),
})

export const signinSchema = z.object({
    username: z.string(),
    password: z.string()
})
