const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async function (req, res, next) {
    const resultCategories = (await db.query(sqlCategories, [])).rows;
    const resultInventory = (await db.query(sqlInventory, [])).rows;
    let categoryItemMap = {};
    for (let category of resultCategories) {
        categoryItemMap[category.id] = [];
    }
    for (let item of resultInventory) {
        categoryItemMap[item.categoryid].push(item);
    }
    res.render("order", {
        title: 'Order',
        categories: resultCategories,
        categoryItemMap: categoryItemMap,
        user: req.session.user,
        linkActive: 'order',
    });
});

module.exports = router;