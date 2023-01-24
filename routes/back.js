import express from "express";

import onlineShop from "../src/onlineShop";

const router = express.Router();

router.get('/', async (req, res, next) => { 
    const ret = await onlineShop();
});

export default back;