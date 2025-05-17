import express from 'express';
import TestResult from '../models/Test.js';
import { db } from '../db/db.js';


const router = express.Router();

router.post('/', async (req, res) => {
    await db();

    const { userId, wpm, accuracy } = req.body;

    try {
        const newResult = new TestResult({
            userId,
            wpm,
            accuracy
        });

        await newResult.save();

        return res.json({
            status: 200,
            message: "Test result saved successfully",
            result: newResult
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: "Error saving test result",
            error: error.message
        });
    }
});

export default router;