
const PhotoScama=require("../models/photosModdel")
const getAllPhotos=async(req,res)=>{
    const photos= await PhotoScama.find().lean()
    res.json(photos)
}
const getPhtoById=async (req,res)=>{
    const {_id}=req.params
    const photo=await PhotoScama.findById(_id).lean()
    if(!photo)
        return res.status(404).send("the photo not found")
    res.json(photo)
}
const addPhoto=async (req,res)=>{
    const {title,imageUrl}=req.body
    const photo=await PhotoScama.create({title,imageUrl})
    res.json(photo)
}
const updatePhoto=async(req,res)=>{
    const {_id,title,imageUrl}=req.body
    debugger;
    let photo=await PhotoScama.findById(_id)
    if(!photo)
        return res.status(404).send("the photo not found")
    photo.title=title
    photo.imageUrl=imageUrl
    const updatePhoto=await photo.save()
    res.json(updatePhoto)
}
const deletePhoto=async (req,res)=>{
    const {_id}=req.params
    const  photo=await PhotoScama.findById(_id)
    if(!photo)
        return res.status(404).send("the photo not found") 
    const deletedPhoto=await photo.deleteOne()
    res.json(deletedPhoto)
}

module.exports={getAllPhotos,getPhtoById,addPhoto,updatePhoto,deletePhoto}