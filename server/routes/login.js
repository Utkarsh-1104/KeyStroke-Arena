import express from 'express';
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { db } from '../db/db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/', async (req, res) => {
    await db()

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.json({
                status: "error",
                message: "User not found"
            })
        }

        bcrypt.compare(password, user.password, async function(err, result) {
            if (err) {
                return res.json({
                    status: "error",
                    message: "Error comparing password"
                })
            }

            if (!result) {
                return res.json({
                    status: "error",
                    message: "Invalid password"
                })
            }

            const token = jwt.sign({
                id: user._id,
                email: user.email,
                username: user.username
            }, process.env.JWT_SECRET)

            return res.json({
                status: 200,
                message: "User logged in successfully",
                user: user,
                token: token
            })
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "Error logging in user",
            error: error.message
        })
    }
})

export default router