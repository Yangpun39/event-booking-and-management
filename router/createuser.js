const express=require('express')
const router=express.Router()
const user=require('../model/user')
const { body, validationResult } = require('express-validator')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtsecret='kdfbakdshgkasfhdgkjadfhlkjhvclk'

router.post("/signin",[
    body('name'),
     body('email').isEmail(),
body('password','too short atleast more than 5').isLength({ min: 5 })]
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    let securepassword= await bcrypt.hash(req.body.password,salt)
    try{
       await user.create({
         name:req.body.name,
         email:req.body.email,
         password:securepassword
        })
res.json({success:true})
    }catch(err){
        console.log(err)
        res.json({success:false})
    }
})
router.post("/login",[ body('email').isEmail(),
body('password','too short atleast more than 5').isLength({ min: 5 })]
,async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 let email=req.body.email;
  try{
    
    let userdata= await user.findOne({email})
    if(!userdata){
      return res.status(400).json({errors:"try using correct credentials"})
    }
    const passwordcompare=await bcrypt.compare(req.body.password,userdata.password)
    if(!passwordcompare){
      return res.status(400).json({errors:"try using correct credentials"})
    }
    
    const data={
      user:{
        id:userdata.id
      }
    }
const authtoken=jwt.sign(data,jwtsecret);
      return res.json({success:true,authtoken:authtoken})
  }catch(err){
      console.log(err)
      res.json({success:false})
  }
})
module.exports=router