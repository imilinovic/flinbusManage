const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    //####################### ZADATAK #######################
    // - obrisati sadržaj košarice
    // - odjaviti registriranog korisnika iz sustava
    // - napraviti redirect na osnovnu stranicu

    //clear session-user mapping
    req.session.user = undefined
    req.session.cart = undefined

    //destroy session object
    req.session.destroy((err) => {
        if(err) {
            console.log(err)
            res.status(503).send('Failed to logout')
        }
        else {
            res.redirect('/')
        }
    })
    //#######################################################

});

module.exports = router;