import express from "express";
const router = express.Router();
import jwt from 'jsonwebtoken'
import {Account, User} from "../db.js";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config.js";
import {z} from 'zod';
import authMiddleWare from "../middleware.js";

//Zod
const signupBody = z.object({
    username: z.email(),
    password: z.string().min(4),
    firstName: z.string().max(20),
    password: z.string().max(20),
});

const signinBody = z.object({
    username: z.email(),
    password: z.string().min(4),
})

const updateBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
});

//1. signup
router.post("/signup", async (req, res) => {
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg: "Email already taken / Invalid inputs"});
    }

    const existingUser = await User.findOne({username: req.body.username});
    if(existingUser){
        return res.status(411).json({msg: "Email already taken"});
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        username: req.body.username, 
        password: hashpassword, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
    });
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1+Math.random()*10000,
    })
    const token = jwt.sign({userId}, JWT_SECRET);
    res.status(200).json({msg: 'user created successfully', token: token});
})


//2. signin
router.post("/signin", async (req, res) => {
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg: "Incorrect inputs"});
    }

    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
       return res.status(401).json({msg: "Invalid email"});
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(401).json({msg: "Invalid password"});
    }
    const token = jwt.sign({userId: user._id}, JWT_SECRET);
    res.status(200).json({msg: "Signin Successful", token: token});
})

//3. update
router.put('/', authMiddleWare, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg: "Error while updating"});
    }
    await User.updateOne(
        { _id: req.userId },
        { $set: req.body }
    );
    res.status(200).json({msg: "Updated successfully"});
})

//4. get users
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } }
            ]
        });

        res.status(200).json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
            })),
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});


export default router;