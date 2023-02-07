import express from "express";

import shop from "../src/onlineShop.js";
import cors from 'cors';
import {Stripe} from 'stripe'

const router = express.Router();

const stripe = new Stripe(`${process.env.STRIPE_PRIVATE_KEY}`, {
	apiVersion: "2022-07-27"
  });

console.log(stripe);

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

router.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

export default router;