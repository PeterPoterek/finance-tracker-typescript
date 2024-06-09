import { Router } from "express";
import { addExpense, getAllExpenses } from "../../controllers/expenseController";
import { verifyJWT } from "../../middleware/verifyJWT";

const expenseRouter = Router();

expenseRouter.get("/", verifyJWT, getAllExpenses);
expenseRouter.post("/", verifyJWT, addExpense);

export default expenseRouter;
