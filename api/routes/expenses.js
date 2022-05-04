const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenses");

router.get("/", expenseController.getAllExpenses);
router.post("/", expenseController.createExpense);

module.exports = router;
