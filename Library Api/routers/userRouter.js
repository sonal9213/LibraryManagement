const express= require('express');
const router=express.Router();

const usrctrl=require("../controllers/UsersController")
//router.get('/',usrctrl.ap)
router.post("/signup",usrctrl.signup)
router.post("/login",usrctrl.login)
module.exports=router