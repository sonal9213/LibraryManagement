
const result=require('../models/result.js');


var addstudent=async(req,res)=>{
    //console.log(req);
    let data={
        Studentname:req.body.name,
        EmailId:req.body.EmailId,
        Score:req.body.Score,
        DateOfBirth:req.body.DateOfBirth,
        RollNo:req.body.RollNo
    }
    const users = await result.create(data);

    res.status(200).send(users);
}

const getstudent=async (req,res)=>{
    // console.log(db)
    console.log(result)
    const users = await result.findAll({});
    console.log(users);
    // console.log("s"+db);
    // console.log("r"+result);
    res.status(200).send(users);
    

}

const getstudentbyId=async (req,res)=>{
    let rollno=req.params.Rollno;
    const user = await result.findOne({where:{RollNo:rollno}});
    console.log(user);
    // console.log("s"+db);
    // console.log("r"+result);
    res.status(200).send(user);
    

}

const updatestudentbyId=async (req,res)=>{
    let data={
        Studentname:req.body.name,
        EmailId:req.body.EmailId,
        Score:req.body.Score,
        DateOfBirth:req.body.DateOfBirth,
        RollNo:req.body.RollNo
    }
    let rollno=req.params.Rollno;
    const users = await result.update(data,{where:{RollNo:rollno}});
    console.log(users);
    if(users==1){
        res.status(200).json({
            body:"updated"
        });
    }
    else{
        res.status(200).json({
            body:"not updated"
        })
    }
    
    

}

const deletestudentbyId=async (req,res)=>{
    let id=req.params.Rollno;
    const user = await result.destroy({where:{RollNo:id}});
    console.log(user);
    // console.log("s"+db);
    // console.log("r"+result);
    res.sendStatus(200).send(user);
    

}


module.exports={
    addstudent,
    getstudent,
    getstudentbyId,
    updatestudentbyId,
    deletestudentbyId
}