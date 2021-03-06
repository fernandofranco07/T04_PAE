const express = require('express');
let router = express.Router();

router.get('/login', function(req,res){
    res.render('login');
});

router.get('/google/login', function(req,res){
    res.send("LOGIN");
});

router.get('/google/redirect', function(req,res){
    res.send("REDIRECT");
});

router.get('/google/logout', function(req,res){
    res.send("LOGOUT");
});
module.exports = router;