const {Sequelize,DataTypes}= require('sequelize');
const sequelize=new Sequelize('StudentResultNode','root','root',{
    host:'localhost',
    dialect:'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log("connected")
// }).catch((e)=>{
//     console.log("not connected")
// })



module.exports= sequelize
// module.exports=db;