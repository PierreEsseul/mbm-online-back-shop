import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import back from './routes/back.js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize routes middleware
app.use('/online/back', back);

app.get('/', (req, res) => {
    res.send('mbm-online-back-shop!')
});

app.listen(process.env.PORT || process.env.API_PORT, () => {
    console.log(`Example app listening on port ${process.env.API_PORT}`);
});