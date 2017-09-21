var express=require('express');
var router=express.Router();
router.get('/login',function(req,res) {
	// body...
	res.render('login');
});

router.get('/register',function(req,res) {
	// body...
	res.render('register');
});

module.exports=router;