const userdata=require('../models/users.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const userdata=db
console.log(userdata);

var signup=async(req,res)=>{
    const SECRET_KEY = 'sonalsecret';
    const { name, password,teacher } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await userdata.findOne({ where: { name:name } });

        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await userdata.create({
            name:req.body.name,
            password: hashedPassword,
            teacher:teacher
        });
        let data={
            "name":req.body.name,
            "role":req.body.teacher
        }
        // Generate JWT
        const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const login=async (req,res)=>{

    const SECRET_KEY = 'sonalsecret';
    const { name, password } = req.body;

    try {
        // Find user by username
        const user = await userdata.findOne({ where: { name:name} });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 0 });
        }

        let data={
            "name":user.name,
            "role":user.teacher
        }

        // Generate JWT
        const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({data} );
        // console.log(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    

}
const ap=(req,res)=>{
    res.json({
        message:'123'
    })
}

module.exports={
    signup,
    login,
    ap
}

