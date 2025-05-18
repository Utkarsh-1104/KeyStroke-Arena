import express from 'express';
import User from '../models/User.js';
import Test from '../models/Test.js';
import { db } from '../db/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const username = req.query.username || "";

    try {
        await db()
        const users = await User.find({
            username: { 
                $regex: username, 
                $options: 'i' 
            }
        })

        if (!users) {
            return res.json({
                status: 200,
                message: "No users found.",
                users: []
            })
        }

        res.json({
            status: 200,
            message: "Users found.",
            users
        })
    } catch (error) {
        return res.json({
            msg: error.message,
            status: 400
        });
    }
})

export default router;