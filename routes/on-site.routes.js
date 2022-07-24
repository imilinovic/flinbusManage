const express = require('express');
const router = express.Router();
const Helper = require('./helpers/helper');

router.get('/', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/login')
        return
    }
    console.log("get funkcija")
    console.log(req.session.params)
    res.render('view', {
        title: 'View',
        user: req.session.user,
        linkActive: 'cart',
        helper: new Helper(req.session.params),
    });
});


router.post('/reset', function (req, res, next) {
    console.log("post reset")
    req.session.params = undefined
    res.redirect('/onsite')
});

router.post('/save', function (req, res, next) {
    console.log("post save")

    let params = {}
    if (req.body.improvements)
        params.improvements = req.body.improvements
    if (req.body['improvement-text'])
        params['improvement-text'] = req.body['improvement-text']
    if (req.body['recommendation-grade'])
        params['recommendation-grade'] = req.body['recommendation-grade']
    req.session.params = params

    res.redirect('/cart');
});

router.post('/order', function (req, res, next) {
    console.log("post order")
    res.redirect('/checkout')
});

module.exports = router;