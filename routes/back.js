import express from "express";
import Stripe from "stripe"
import shop from "../src/onlineShop.js";

const router = express.Router();

router.get('/', async (req, res) => { 
    const { slugify } = req.query;
    const ret = await shop(slugify);
    res.send({ success: true, shop: ret });
});

// Stripe 
const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`)

router.post("/payment", async (req, res) => {
    const { items, amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({ 
        amount: roundToTwo((amount)),
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

// round to the second decimal for stripe
function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

export default router;