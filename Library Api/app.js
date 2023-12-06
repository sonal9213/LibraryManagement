// import sequelize from './models';
const cors = require('cors');
const teacherauthenticatication=require('./Middlewares/teacherauthentication')
//const checkname=require('./Middlewares/authen//')
//const result = require('../models/result.js');
// require('ejs')
const https = require('https');
//const fetch = require('node-fetch'); // Use 'fetch' in Node.js with the 'node-fetch' library
const axios = require('axios');
const express = require('express');
const cookieParser = require('cookie-parser');
const {authenticateToken,checkname} = require('./Middlewares/authentication')
const router = express.Router();
const app = express();
const sequelize = require('./models/index');
const result = require('./models/result');
const users = require('./models/users')
require('./routers/userRouter')
//  const resultctrl=require('./controllers/ResultController');
const usersRouter = require('./routers/userRouter')
const teacherRouter = require('./routers/teacherRouter')
app.set("view engine", "ejs");
app.use(cookieParser());
const port = 8082
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
    console.log("database connected");
}).catch(error => {
    console.log(error);
})
app.get("/", (req, res) => {
    res.render("home.ejs")
})
app.get('*',checkname);
app.get("/results",teacherauthenticatication, async (req, res) => {
    var data = await result.findAll({})
    console.log(data + "sonal")
    res.render("result.ejs", { result: data })
})
app.get("/Addresult",teacherauthenticatication, async (req, res) => {

    res.render("AddFormResult.ejs")
})

app.get('/result',authenticateToken,async(req,res)=>{
    res.render("StudentForm.ejs")
})

app.get('/logout',(req,res)=>{
    res.cookie("token","",{
        maxAge:1
    })
    res.redirect('/');
})

app.get('/StudentResult',authenticateToken,async(req,res)=>{

    var rollno=req.query.rollno;
    console.log(rollno);
    const user = await result.findOne({where:{RollNo:rollno}});
    if(user===null){
        res.render("FetchedStudentResult.ejs",{result:null})
    }
    console.log(user);
    res.render("FetchedStudentResult.ejs",{result:user})
})
app.get("/Updateresult",teacherauthenticatication, async (req, res) => {

    var rollNo = req.query.RollNo;
    console.log(rollNo)

    const user = await result.findOne({where:{RollNo:rollNo}});
    console.log(user);

    res.render("UpdateFormResult.ejs",{result:user})

});
// app.use(use)
// app.use('/api',teacherRouter)
app.use(usersRouter)
app.use(authenticateToken, teacherRouter);
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors({
    origin: true
}));
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header(

        "Access-Control-Allow-Headers",

        "Origin, X-Requested-With, Content-Type, Accept"

    );

    next();

});

app.listen(port, () => {
    console.log("app started at " + port);
})