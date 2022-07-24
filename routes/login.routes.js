const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')

router.get('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //vrati login stranicu
    if(req.session.user !== undefined) {
        console.log("User already logged in")
        res.redirect('/')
        return
    }
    
    res.render('login', {
        title: 'Login',
        user: req.session.user,
        linkActive: 'login',
        err: undefined,
    });
    //#######################################################
});

router.get('/redirect', function (req, res, next) {
    //####################### ZADATAK #######################
    //vrati login stranicu
    if(req.session.user !== undefined) {
        console.log("User already logged in")
        res.redirect('/')
        return
    }
    
    res.render('login', {
        title: 'Login',
        user: req.session.user,
        linkActive: 'login',
        err: "Please login to view the requested page",
    });
    //#######################################################
});

async function loginUser(req, res, next) {
    const user = await User.fetchByUsername(req.body.user)
    console.log("OVO JE USER", user)
    if(typeof user.user_name === 'undefined') {
        res.render('login', {
            title: 'Login',
            user: req.session.user,
            linkActive: 'login',
            err: 'Nepostojeci korisnik',
        })
    }
    else if (!user.checkPassword(req.body.password)) {
        res.render('login', {
            title: 'Login',
            user: req.session.user,
            linkActive: 'login',
            err: 'Kriva lozinka',
        })
    }
    else{
        req.session.user = user
        res.redirect('/')
    }
}

router.post('/', async function (req, res, next) {
    //####################### ZADATAK #######################
    //postupak prijave korisnika
    try {
        await loginUser(req, res, next)
    } catch(err) { console.log(`error: ${err}`) }
    //#######################################################

});


module.exports = router;