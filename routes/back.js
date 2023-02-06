import express from "express";

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

export default router;