const stripe = require("stripe")("sk_test_51KKpPTLWOulgqX8Vt99ATjBf4MciU1MKUfHbT2s00IXU8lfzAHWCuNt2Tb7JrRCdeuGvwLePbFcYna0qMaTIrKq600RQ3g4Ou4")
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data


const app = express()
const port = 5000
app.use(bodyParser.json()) // for parsing application/json

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    })

    res.json({ clientSecret: paymentIntent.client_secret })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })