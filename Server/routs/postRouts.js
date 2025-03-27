const express=require("express")
const postController=require("../controller/postController")
const router=express.Router()
router.get("/",postController.getAllPOst)
router.get("/:_id",postController.getPostById)
router.post("/",postController.AddPost)
router.put("/",postController.UpdetaPost)
router.delete("/:_id",postController.deletePost)
module.exports=router

