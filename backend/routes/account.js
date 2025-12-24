import express from "express";
import mongoose from "mongoose";
import authMiddleWare from "../middleware.js";
const router = express.Router();
import { Account } from "../db.js";

//Get the balance
router.get("/balance", authMiddleWare, async (req, res) => {
    const account = await Account.findOne({userId: req.userId});
    res.json({balance: account.balance});
});

//transfer -> start session
router.post("/transfer", authMiddleWare, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const {amount, to} = req.body;
    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({msg: "Insufficient balance"});
    }

    const toAccount = await Account.findOne({userId: to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({msg: "Invalid Account"});
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: +amount}}).session(session);

    await session.commitTransaction();
    res.json({msg: "Transfer Successful"});
})
export default router;