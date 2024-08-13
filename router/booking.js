const express=require('express')
const router=express.Router();
const userevent=require('../model/userevent');

router.post('/booking',async (req,res)=>{
    let data=req.body.event_data
    await data.splice(0,0,{event_date:req.body.event_date})
    let eid=await userevent.findOne({'email':req.body.email})
    console.log(eid);
    if(eid===null){
try{
    await userevent.create({
        email:req.body.email,
        event_data:[data]
    }).then(()=>{
        res.json({success:true})
    })
}catch(err){
    console.log(err.message)
    res.send("server error",err.message)
}
    }else{
        try{
            await userevent.findOneAndUpdate({email:req.body.email},
            {$push:{event_data:data}}).then(()=>{
                res.json({success:true})
            })
        }catch(err){
            res.send("server error",err.message)
        }
    }

})

router.post('/bookingdata',async (req,res)=>{
    try{
        let myData= await userevent.findOne({'email':req.body.email})
        res.json({bookingData:myData})
       // console.log(myData)
    }catch(err){
        res.send("server error",err.message)
    }
})
router.post('/cancel', (req, res) => {

    userevent.deleteOne({_id:req.body.id})
        .then((deletedVinyl) => {
            res.status(200).send(deletedVinyl);
        })
        .catch((error) => {
            res.status(500).send(error);
        })
});

module.exports=router;