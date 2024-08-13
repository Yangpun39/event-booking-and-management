const mongoose=require('mongoose')
const mogoURL='mongodb+srv://yangpun39:Yangpun39@cluster0.0lqnpjp.mongodb.net/eventmanage?retryWrites=true&w=majority' 
// main().then(()=>{
      
//       })
//     })
//     main().catch(err => console.log(err));
const mongodb=async ()=> {
    await mongoose.connect(mogoURL,{useNewUrlParser: true},async (err,result)=>{
       if(err) console.log("----",err) 
       else{
        console.log('connected to database');
        const fetch_data= await mongoose.connection.db.collection("place");
        fetch_data.find({}).toArray(async function(err,data){
          const category=await mongoose.connection.db.collection("category");
          category.find({}).toArray( function(err,catData){
            if (err) console.log(err);
            else {
              global.place=data;
              global.category=catData;
            } 
          })
          // if (err) console.log(err);
          // else {
          //   global.place=data;
          // }
        })
    }
    });
}

module.exports=mongodb();