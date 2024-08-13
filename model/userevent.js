const mongoose=require('mongoose');

const usereventschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    event_data:{
          type:Array,
          required:true,
    },
})

module.exports =mongoose.model('Event',usereventschema)