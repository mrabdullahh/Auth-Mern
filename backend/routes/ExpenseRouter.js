const {
  fetchAllTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/ExpenseController");

const router = require("express").Router();

router.get("/", fetchAllTransactions);
router.post("/", addTransaction);
router.delete("/:expenseId", deleteTransaction);

module.exports = router;
