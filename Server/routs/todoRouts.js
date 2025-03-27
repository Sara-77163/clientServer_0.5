const express=require("express")
const todoController=require("../controller/todosController")
const router=express.Router()
router.get("/",todoController.getAlltodos)
router.get("/:_id",todoController.geTodoById)
router.post("/",todoController.addTodo)
router.put("/",todoController.updateTodo)
router.put("/:_id",todoController.completeTodo)
router.delete("/:_id",todoController.deleteTodo)
module.exports=router
