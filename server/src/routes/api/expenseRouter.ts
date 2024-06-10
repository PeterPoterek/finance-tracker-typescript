import { Router } from "express";
import {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../../controllers/expenseController";
import { verifyJWT } from "../../middleware/verifyJWT";

const expenseRouter = Router();

expenseRouter.get("/", verifyJWT, getAllExpenses);
expenseRouter.post("/", verifyJWT, addExpense);
expenseRouter.get("/:id", verifyJWT, getExpenseById);
expenseRouter.put("/:id", verifyJWT, updateExpense);
expenseRouter.delete("/:id", verifyJWT, deleteExpense);

export default expenseRouter;
