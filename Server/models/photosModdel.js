const mongoose=require("mongoose")
const PhotoScama=mongoose.Schema({
    title:{
        type:String,
        default:"Untitled",
     
    },
    imageUrl:{
        type:String
    }
},{
    timestamps:true,
})
module.exports=mongoose.model("Photo",PhotoScama)

