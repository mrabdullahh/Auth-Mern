const userModel = require("../models/user");

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  try {
    const userData = await userModel.findByIdAndUpdate(
      _id,
      {
        $push: { expenses: req.body },
      },
      { new: true }
    );
    res.status(201).json({
      message: "Expense Added successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", success: false, error });
  }
};

const fetchAllTransactions = async (req, res) => {
  const { _id } = req.user;
  try {
    const userData = await userModel.findById(_id).select("expenses");
    res.status(200).json({
      message: "Fetched Expenses successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", success: false, error });
  }
};

const deleteTransaction = async (req, res) => {
  const { _id } = req.user;
  const { expenseId } = req.params;
  try {
    const userData = await userModel.findByIdAndUpdate(
      _id,
      {
        $pull: { expenses: { _id: expenseId } },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Expense Deleted successfully",
      success: true,
      data: userData?.expenses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", success: false, error });
  }
};

module.exports = { addTransaction, deleteTransaction, fetchAllTransactions };
