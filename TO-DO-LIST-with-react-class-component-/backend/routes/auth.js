const express = require('express');
const {body,validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../Models/User");
const JWT_SECERET = "TODOApp7071";
const authenticate = require('../middleware/authenticate');


const router = express.Router();

router.post("/signup",
    [body('name','name should be at least 3 character').isLength({min:3}),
     body('email','Please provide valid email').isEmail(),
     body('password','password should have at least 8 and at most 15 character').isLength({min:8,max:15}),
     body('DOB','Date of birth can not be null !').exists()
    ]
,async (req, res)=>{
    let status = false;

    // check validation for body data
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).send({status, data : error.errors[0].msg});
    }

    try {
        //check weather the user with same email is present or not
        let user = await User.find({email : req.body.email});
        if(user.length === 0){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            let user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password: hashPassword,
                DOB : new Date(req.body.DOB)
            })
            const authToken = jwt.sign({user : user._id} , JWT_SECERET);
            status = true;
            return res.status(200).send({status , authToken})
        }else{
            return res.status(400).send({status, data : "User With this is email already Exists !!"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status,data:"Internal Server Error"})
    }
})

router.post("/login",[
    body('email','Please provide valid email').isEmail(),
     body('password','password should have at least 8 and at most 15 character').isLength({min:8,max:15})
],async (req,res)=>{
    let status = false;

    // check validation for body data
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).send({status, data : error.errors[0].msg});
    }
    try {
        // find user is exist or not
        let user = await User.findOne({email:req.body.email});
        if(user){
            // verify password
            const result =  await bcrypt.compare(req.body.password , user.password);
            if(result){
                // generate auth-token and give it in respoonse
                const authToken = jwt.sign({user : user._id},JWT_SECERET);
                status = true;
                return res.status(200).send({status, authToken});
            }else{
                return res.status(400).send({status , data : "Please Enter Correct Credentials"})
            }

        }else{
            return res.status(400).send({status , data : "User Doesn't exist!! please do sign up first"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({status, data : "Internal Server Error"});
    }
})

router.get("/user",authenticate, async (req,res) => {
    try {
        let user = await User.findById(req.user);
        const data = {
            name : user.name,
            email : user.email,
            DOB : user.DOB,
        }
        res.status(200).send({status : true, data});
    } catch (error) {
        res.status(500).send({status:false,data:"Internal Server Error"});
    }
})
module.exports = router;