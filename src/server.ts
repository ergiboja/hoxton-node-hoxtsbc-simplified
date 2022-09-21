import express from 'express'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { PrismaClient } from '@prisma/client'

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
const prisma = new PrismaClient()
const port = 4000

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({
        include: { transactions: true }
    })
    res.send(users)

})
app.get('/transactions', async (req, res) => {
    const transactions = await prisma.transactions.findMany({
        
    })
    res.send(transactions)

})

app.post('/sign-up', async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        }
    })
    res.send(user)

})

app.post('/sign-in', async (req, res) => {


    const user = await prisma.user.findUnique({
        
        
        where: { email:req.body.email}
    })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.send(user)
    }else{
        res.status(400).send({message: 'Wrong Credentials'})
    }

})
app.listen(port, () => {
    console.log(`App runing: http://localhost:${port}`)
})