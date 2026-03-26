const express = require('express')
const router = express.Router();

const {register, login} = require('../controller/authController')

router.post('/register',register);
router.post('/login',login);
router.get('/logout',(req,res)=>{
    res.clearCookie('token').json({message:'Logout Successfull!'})
})


module.exports = router;