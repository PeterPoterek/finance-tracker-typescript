import { Router } from "express";

import { handleLogin, handleRegister, handleLogout } from "../../controllers/authController";
import { verifyJWT } from "../../middleware/verifyJWT";

const authRouter = Router();

authRouter.post("/login", handleLogin);

authRouter.post("/register", handleRegister);

authRouter.post("/logout", verifyJWT, handleLogout);

export default authRouter;
