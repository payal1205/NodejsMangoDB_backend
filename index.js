const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const  mongoose = require('mongoose');
const User=require('./modules/User')

const server = express();
server.use(cors());
server.use(bodyParser.json());

mongoose.connect('mongodb+srv://Payal:Payal%401205@leadsoft.xuydhxh.mongodb.net/?retryWrites=true&w=majority&appName=leadsoft').
then(()=>console.log('Connected to database')).catch(()=>console.log(err))

server.post('/register',async(req,res)=>{
    try{
        const {fullName,userName,age,password}=req.body
        const userObj=new User({fullName,userName,age,password})
        userExist=await User.findOne({userName})
        if(userExist){
            return res.json({
                status:false,message:"User already exist"
            })
        }
        await userObj.save()
        res.json({
            status:true,message:"User registration succesfully"
        })

    }
    catch (err){
        res.json({
            status:false,
            message:err
        })
    

    }
})
server.post('/login',async(req,res)=>{
    const {userName,password}=req.body
    const userExist=await User.findOne({userName})
    if(!userExist){
        return res.json({
            status:false,message:"User not found"
        })

    }
    if(password!==userExist.password){
        return res.json({
            status:false,message:"Wrong user"
        })
    }
    res.json({
        status:true,message:"Login succesfully"
    })
})


server.listen(8055, () => {
    console.log('🚀 Server is running on http://localhost:8055');
});
