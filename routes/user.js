//Module exports
const express = require('express');
const router =  express.Router();
const bcrypt = require('bcrypt');
var session = require('express-session')

router.use(express.urlencoded({
    extended: true
  }));


//Routes
router.use('/signin', (req, res) => {
    res.render('signin');
});

router.post('/submit_signin', (req, res) => {
    let email =  req.body.email;
    let password = req.body.password;

    if(email && password) {
        router.use(session({email: req.body.session }))
        console.log(req.session.email);
        res.render('messenger');
    } else {
        console.log("Nop");
    }
});

router.use('/signup', (req,res) => {
    res.render('signup');
});

router.post('/submit_signup', async (req, res) => {

    const user = {
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    }
    

    if(user.email && user.password && user.confirm_password && user.password === user.confirm_password){
        const hash =  await bcrypt.hashSync(user.password, 10);
        res.render('signin');
    } else {
        res.render('signup');
    }
});



module.exports = router;