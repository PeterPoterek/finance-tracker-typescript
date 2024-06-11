import { Router } from "express";
import {
  addIncome,
  getAllIncomes,
  updateIncome,
  deleteIncome,
} from "../../controllers/incomeController";
import { verifyJWT } from "../../middleware/verifyJWT";

const incomeRouter = Router();

incomeRouter.get("/", verifyJWT, getAllIncomes);
incomeRouter.post("/", verifyJWT, addIncome);
incomeRouter.put("/:id", verifyJWT, updateIncome);
incomeRouter.delete("/:id", verifyJWT, deleteIncome);

export default incomeRouter;
