const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')
//const Order = require('../models/OrderModel')
const authHandler = require('./helpers/auth-handler');

//prikaz podataka o korisniku (podaci o korisniku, adrese, narudžbe)
// Ulančavanje funkcija međuopreme
router.get('/', authHandler, function (req, res, next) {
    (async () => {
        //dobavi adresu korisnika
        let data = await User.fetchByUsername(req.session.user);
        console.log("DATA", data)
        //dobavi narudžbe korisnika

        res.render('user', {
            title: 'User profile',
            user: req.session.user,
            linkActive: 'user'
        });
    })()
});

module.exports = router;