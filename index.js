import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
dotenv.config();

import back from './routes/back.js';



const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Initialize routes middleware
app.use('/online/back', back);

app.get('/', (req, res) => {
    res.send('mbm-online-back-shop!')
});

// app.post("/payment", cors(), async (req, res) => {
// 	let { amount, id } = req.body
// 	try {
// 		const payment = await stripe.paymentIntents.create({
// 			amount,
// 			currency: "USD",
// 			description: "Spatula company",
// 			payment_method: id,
// 			confirm: true
// 		})
// 		console.log("Payment", payment)
// 		res.json({
// 			message: "Payment successful",
// 			success: true
// 		})
// 	} catch (error) {
// 		console.log("Error", error)
// 		res.json({
// 			message: "Payment failed",
// 			success: false
// 		})
// 	}
// })

app.listen(process.env.PORT || process.env.API_PORT, () => {
    console.log(`Example app listening on port ${process.env.API_PORT}`);
});