import { Router } from "express";
import { verifyJWT } from "../../middleware/verifyJWT";
import { getUser } from "../../controllers/userController";

const userRouter = Router();

userRouter.get("/", verifyJWT, getUser);

export default userRouter;
