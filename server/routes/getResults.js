import express from 'express';
import TestResult from '../models/Test.js';
import { db } from '../db/db.js';

const router = express.Router()

router.post('/', async (req, res) => {
    await db()

    try {
        const results = await TestResult.find({
            userId: req.body.userId
        })

        if(!results) {
            return res.json({
                status: 200,
                message: "No results found."
            })
        }

        return res.json({
            status: 200,
            message: "Test results found.",
            results
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "Error fetching results.",
        })
    }
})


export default router