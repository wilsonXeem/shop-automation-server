const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenses");

router.get("/", expenseController.getAllExpenses);
router.post("/", expenseController.createExpense);
router.delete("/:_id", expenseController.deleteOneExpense)

module.exports = router;
