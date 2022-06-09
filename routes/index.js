var express = require('express');
var router = express.Router();
const { register, login } = require('../controllers/auth');
const { check } = require('../auth-middlewares/verifylogin');
router.post ('/',  register);

router.post ('/login',  login);

//new routes
router.get('/unrestricted', function(req, res){
    res.send("Anyone can access this route");
});

router.get('/restricted', check, function(req, res){
    res.send("You are not allowed access to this route");
});


module.exports = router;
