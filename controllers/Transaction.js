const { ethers } = require("ethers");

const Transaction = require("./../models/Transaction");
const catchAsync = require("./../lib/catchAsync");

exports.createTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.create(req.body);
  res.status(201).json({ status: "success", data: transaction });
});

exports.getAllTransaction = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find({ from: req.user.evm_address });
  res.status(200).json({
    status: "success",
    length: transactions.length,
    data: transactions,
  });
});

exports.updateTransactionModel = async (id, newData) => {
  const updatedTransaction = await Transaction.findByIdAndUpdate(id, newData, {
    new: true,
  });
  return updatedTransaction;
};

exports.updateTransaction = catchAsync(async (req, res, next) => {
  const id = req.params;
  const newData = req.body;
  const transaction = await this.updateTransactionModel(id, newData);
  res.json({ status: "success", data: transaction });
});

exports.getUserTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find({ from: req.user.evm_address });
  res.status(200).json({
    status: "success",
    length: transactions.length,
    data: transactions,
  });
});
