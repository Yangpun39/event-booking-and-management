const express=require('express')
const router=express.Router();

router.post('/placedata',async(req,res)=>{
    try{
      //  console.log(global.plcae)
        res.send([global.place,global.category])

    }catch(err){
        console.log(err);
        res.send(err);
    }
})




module.exports=router;