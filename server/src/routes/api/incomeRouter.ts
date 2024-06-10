import { Router } from "express";
import { getAllIncomes, addIncome } from "../../controllers/incomeController";
import { verifyJWT } from "../../middleware/verifyJWT";

const incomeRouter = Router();

incomeRouter.get("/", verifyJWT, getAllIncomes);
incomeRouter.post("/", verifyJWT, addIncome);

export default incomeRouter;
