const express = require('express');
const router = express.Router();
var session = require('express-session');

router.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true
 }));


router.use('/', (req, res) => {
    console.log(req.session.email);
    res.render('messenger');
});



module.exports = router;