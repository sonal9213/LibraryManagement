const express= require('express');
const router=express.Router();
const teacherauthenticatication=require('../Middlewares/teacherauthentication')
resultctrl=require('../controllers/ResultController')
router.post("/student",teacherauthenticatication,resultctrl.addstudent)
router.get("/student",teacherauthenticatication,resultctrl.getstudent)
router.get("/student/:Rollno",resultctrl.getstudentbyId)
router.patch("/student/:Rollno",teacherauthenticatication,resultctrl.updatestudentbyId)
router.delete("/student/:Rollno",teacherauthenticatication,resultctrl.deletestudentbyId)

module.exports=router