import express from 'express';
import cors from 'cors'

import signup from './routes/signup.js'
import login from './routes/login.js'
import saveResult from './routes/saveResult.js'
import getResults from './routes/getResults.js'
import getUsers from './routes/getUsers.js'

import authMiddleware from './middlewares/authMiddleware.js';

const app = express()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => { 
    res.json({
        message: "Hello from the server!"
    })
}) 

app.use('/signup', signup)
app.use('/login', login)
app.use('/saveresult', authMiddleware, saveResult)
app.use('/getresults', authMiddleware, getResults)
app.use('/getusers', getUsers)

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000")
})