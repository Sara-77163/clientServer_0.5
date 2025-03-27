const mongoose=require("mongoose")
TodoSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    tag:{
        type:String,
        enum:["home","study","else"],
        default:"else",
    },
    completed:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})
module.exports=mongoose.model("Todo",TodoSchema)