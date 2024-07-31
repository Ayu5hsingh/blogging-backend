import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { signupSchema } from "../zod/user";
import { Jwt } from "hono/utils/jwt";
//universal status code
enum StatusCode {
  BADREQ = 400,
  NOTFOUND = 404,
  NOTPERMISSIOON = 403,
  SUCCESS = 400,
  SERVERERROR = 500,
}

export async function userSignup(c: Context) {
  try {
    const prisma = new PrismaClient().$extends(withAccelerate());
    const body: {
      username: string;
      password: string;
      email: string;
    } = await c.req.json();
    const parsedUser = signupSchema.safeParse(body);

    if (!parsedUser.success) {
      return c.json(
        {
          error: "Invalid Request",
        },
        StatusCode.BADREQ
      );
    }
    //Ensuring no duplicate entry
    const userExist = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (userExist) {
      c.json(
        {
          message: "User already exists",
        },
        StatusCode.BADREQ
      );
    }

    const createUser = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        email: body.email,
      },
    });

    //creating token
    //  might break the app
    const userID: any = createUser.id;
    const token = await Jwt.sign(userID, c.env.JWT_TOKEN);

    return c.json(
      {
        message: "User Created!!",
        token: token,
        user: {
          username: body.username,
          email: body.email,
        },
      },
      StatusCode.SUCCESS
    );
  } catch (error) {
    console.error("ERR! : ", error);
    c.json(
      {
        error: error,
      },
      StatusCode.SERVERERROR
    );
  }
}
