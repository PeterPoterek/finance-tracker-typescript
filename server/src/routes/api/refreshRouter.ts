import { Router } from "express";

import { handleRefreshToken } from "../../controllers/refreshTokenController";

const refreshRouter = Router();

refreshRouter.get("/", handleRefreshToken);

export default refreshRouter;
