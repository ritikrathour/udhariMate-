const AsyncHandler = require("../utils/AsyncHandler");
const Transaction = require("../models/transaction.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const Borrower = require("../models/borrower.model");
const { getIO } = require("../utils/Socket")
const CreateDebt = AsyncHandler(async (req, res) => {
    const { description, amount, borrower, date } = req.body;
    if (!description || !amount || !borrower === " ") {
        throw new ApiError(400, "All fields are required!")
    }
    const debtTransaction = await Transaction.create({
        borrower,
        shopkeeper: req.user._id,
        amount,
        description,
        type: "DEBT",
        date
    })
    if (!debtTransaction) {
        throw new ApiError(400, "Debt Transaction not created!")
    }
    const getBorrower = await Borrower.findById(borrower);
    if (!getBorrower) {
        throw new ApiError(400, "Borrower could not updated!")
    }
    getBorrower.transactions.push(debtTransaction._id);
    const io = getIO();
    if (getBorrower.advancedPayment >= amount) {
        getBorrower.advancedPayment -= amount; // Use advance payment first
    } else {
        const remainingDebt = amount - getBorrower.advancedPayment;
        getBorrower.advancedPayment = 0;
        getBorrower.debt += remainingDebt; // Create new debt
    }
    const updateBorrower = await getBorrower.save();
    io.emit("newTransaction", debtTransaction);
    io.emit("updateDebtAndAdvance",{
        borrower, 
        debt:updateBorrower?.debt, 
        advancedPayment:updateBorrower?.advancedPayment
    });
    if (!updateBorrower) {
        throw new ApiError(400, "Borrower could not updated!")
    }
    res.status(200).json(new ApiResponse(200, debtTransaction, "Debt recorded Successfully!"))
});
const CreatePayment = AsyncHandler(async (req, res) => {
    const { description, amount, borrower, date } = req.body;
    if (!amount || !borrower || borrower === " ") {
        throw new ApiError(400, "All fields are required!")
    }
    const paymentTransaction = await Transaction.create({
        borrower,
        shopkeeper: req.user._id,
        amount,
        type: "PAYMENT",
        description,
        date
    });
    if (!paymentTransaction) {
        throw new ApiError(400, "Payment Transactions not created!")
    }
    
    const getBorrower = await Borrower.findById(borrower);
    if (!getBorrower) {
        throw new ApiError(404, "Borrower Not Fund!")
    }
    getBorrower.transactions.push(paymentTransaction._id);
    
    if (amount >= getBorrower.debt) {
        getBorrower.advancedPayment += (amount - getBorrower.debt);
        getBorrower.debt = 0;
    } else {
        getBorrower.debt -= amount;
    }
    const updateBorrower = await getBorrower.save(); 
    const io = getIO();
    io.emit("newTransaction", paymentTransaction);
    io.emit("updateDebtAndAdvance",{
        borrower, 
        debt:updateBorrower?.debt,
        advancedPayment:updateBorrower?.advancedPayment
    });
    if (!updateBorrower) {
        throw new ApiError(400, "Borrower could not Updated!")
    }
    res.status(200).json(new ApiResponse(200, paymentTransaction, "Payment Paid Successfully!"))
})
const GetTransactions = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Borrower ID is required!")
    }
    const transactions = await Transaction.find({ borrower: id }).select("amount createdAt _id type description");
    res.json(new ApiResponse(200, transactions, "Transactions Get Successfully!"))
})

module.exports = {
    CreateDebt, CreatePayment, GetTransactions
}