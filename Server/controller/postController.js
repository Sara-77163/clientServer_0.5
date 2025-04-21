
const PhtoSchema=require("../models/postModdel")
const getAllPOst=async(req,res)=>
{
    const posts=await PhtoSchema.find().lean()
    res.json(posts)
}
const getPostById=async(req,res)=>{
    const {_id}=req.params
    const post=await PhtoSchema.findById(_id).lean()
    if(!post)
        return res.status(404).send("the post not found")
    res.json(post)
}
const AddPost=async (req,res)=>{
    const {title,body}=req.body
    if(!title)
        return res.status(404).send("the title is required")
    const post=await PhtoSchema.create({title,body})
    res.json(post)
}
const UpdetaPost=async (req,res)=>{
    const {_id,title,body}=req.body
    if(!title)
        return res.status(404).send("the title is required")
    let post=await PhtoSchema.findById(_id)
    if(!post)
        return res.status(400).send("the post not found")
    post.title=title
    post.body=body
    const updataPost=await post.save()
    res.json(updataPost)
}
const deletePost=async (req,res)=>{
    const {_id}=req.params
    const post=await PhtoSchema.findById(_id)
    if(!post)
        return res.status(404).send("the post not found")
    const deletedPost=await post.deleteOne()
    res.json({deletedPost,post})
}

module.exports={getAllPOst,getPostById,AddPost,UpdetaPost,deletePost}