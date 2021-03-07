const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', function(req,res){
    res.render('login');
});

router.get('/google/login', passport.authenticate('google', { scope: ['profile','email']}));

router.get(​'/google/redirect'​,
  passport.authenticate(​'google'​, { failureRedirect: ​'/login'​ }),
  ​function​ (req, res) ​{
      ​res.redirect('/'); 
    });

router.get('/google/logout', function(req,res){
    res.send("LOGOUT");
});
module.exports = router;