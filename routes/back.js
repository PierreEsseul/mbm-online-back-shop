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


router.post("/payment", async (req, res) => {
 const { items, amount } = req.body;
 
 const paymentIntent = await stripe.paymentIntents.create({ 
   amount,
   currency: "eur",
   automatic_payment_methods: {
     enabled: true,
   },
 });
 
 res.send({
   clientSecret: paymentIntent.client_secret,
 });
});


// router.post("/payment", async (req, res) => {
// 	let { amount, id } = req.body
// 	console.log('/payment : ', { amount, id });

// 		const payment = await stripe.paymentIntents.create({
// 			amount,
// 			currency: "USD",
// 			description: "Spatula company",
// 			payment_method: id,
// 			confirm: true
// 		})
// 		console.log("Payment", payment)
// 		res.send({
// 			clientSecret: paymentItent.clientSecret,
// 		})
// })

export default router;