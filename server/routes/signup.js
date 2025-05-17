import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { db } from '../db/db.js'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, username, password } = req.body
    await db()

    bcrypt.hash(password, 10, async function(err, hash) {
        try {
            const user = await User.findOne({ email: email })
            if (user) {
                return res.json({
                    status: "error",
                    message: "User already exists"
                })
            }

            const newUser = await new User({
                email,
                username,
                password: hash
            })

            await newUser.save()

            const token = jwt.sign({
                id: newUser._id,
                email: newUser.email,
                username: newUser.username
            }, process.env.JWT_SECRET)

            return res.json({
                status: 200,
                message: "User created successfully",
                user: newUser,
                token: token
            })
        } catch (error) {
            res.json({
                status: 500,
                message: "Error creating user",
                error: error.message
            })
        }
    });
})

export default router