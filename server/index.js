const express = require("express")
const Stripe = require("stripe")
const cors = require("cors")

const app = express()

const stripe = new Stripe('<your_stripe_key>')

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())

app.post("/api/checkout", async (req, res) => {

    try{
        const { id, amount } = req.body

        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'USD',
            description: 'Gaming monitor',
            payment_method: id,
            confirm: true
        })

        console.log(payment)
        res.json({
            message: 'Successfull payment'
        })
    }catch(ex){
        console.log(ex)
        res.status(400).json({ message: ex.message })
    }
})

app.listen(3001, () => {
    console.log("Server on port 3001")
})