const express = require('express');
const router = express.Router();
const user = require('../models/UserModel')
const cartSanitizer = require('./helpers/cart-sanitizer');

// Ulančavanje funkcija međuopreme
router.get('/', async function (req, res, next) {
    //####################### ZADATAK #######################
    const users = await user.fetchByPoints()
    console.log("useri", users)
    res.render('cart', {
        title: 'Leaderboard',
        linkActive: 'cart',
        user: req.session.user,
        users: users,
        err: undefined,
    })
    //#######################################################
});

module.exports = router;