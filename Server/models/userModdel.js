const mongoose=require("mongoose")
const UserSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true

        },
        userName:{
            type:String,
            required:true,
            unique:true,
            trim:true,
        },
        email:{
            type:String,
            trim: true,
            default:"no eamail"
            
        },
        address:{
        city:{type:String, trim: true,default:"none"},
        street:{type:String, trim: true,default:"none"},
        building:{type:Number,default:"0"}
        },
        phone:{
            type:String,
            maxlength:10,
            trim: true,
        }
    },
    {
        timestamps:true 
    })
    module.exports=mongoose.model('User',UserSchema);