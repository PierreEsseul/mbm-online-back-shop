import express from "express";
import Stripe from "stripe"
import shop from "../src/onlineShop.js";

const router = express.Router();

router.get('/', async (req, res) => { 
    const { slugify } = req.query;
    console.log('slugify :>> ', { slugify, query: req.query });

    const ret = await shop(slugify);
    console.log("Value ret dans back.js");
    console.table([ret.user]);
    console.table([ret.shop]);
    console.table([ret.address]);
    console.table(ret.articles);



    res.send({ success: true, shop: ret });
});

// Stripe 

const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`)


// round to the second decimal for stripe

function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

router.post("/payment", async (req, res) => {
 const { items, amount } = req.body;
 
 const paymentIntent = await stripe.paymentIntents.create({ 
   amount: roundToTwo((amount*100)),
   currency: "eur",
   automatic_payment_methods: {
     enabled: true,
   },
 });
 
 res.send({
   clientSecret: paymentIntent.client_secret,
 });
});


export default router;