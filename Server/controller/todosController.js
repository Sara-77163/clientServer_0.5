
const TodoSchema = require("../models/todosModdel")
const getAlltodos = async (req, res) => {
    const todos = await TodoSchema.find().lean()
    res.json(todos)
}
const geTodoById = async (req, res) => {
    const { _id } = req.params
    const todo = await TodoSchema.findById(_id)
    if (!todo)
        return res.status(404).send("the todo not found")
    res.json(todo)
}
const addTodo = async (req, res) => {
    const { title, tag, completed } = req.body
    if (!title)
        return res.status(400).send("title is required")
    if (title.trim() === "")
        return res.status(400).send("The title cannot be only space")
    const exitTitle = await TodoSchema.find({ title: title.trim() }).lean()
    if (exitTitle.length>0)
        return res.status(400).send("the title must to be unique")
    const enum1 = ["home", "study", "else"]

    if (tag&&!enum1.includes(tag))
        return res.status(400).send("the the tag must be home study or else")
    const newTodo = await TodoSchema.create({ title, tag, completed })
    res.json(newTodo)
}
const updateTodo = async (req, res) => {
    const { _id, title, tag, completed } = req.body
    if (!title)
        return res.status(400).send("title is required")
    if (title.trim() === "")
        return res.status(400).send("The title cannot be only space")
    const exitTitle = await TodoSchema.find({ _id: { $ne: _id },title: title.trim()}).lean()
    if (exitTitle.length>0)
        return res.status(400).send("the title must to be unique")
    const enum1 = ["home", "study", "else"]
    if (tag&&!enum1.includes(tag))
        return res.status(400).send("the the tag must be home study or else")
    let todo = await TodoSchema.findById(_id)
    if (!todo)
        return res.status(404).send("the todo not found")
    
    todo.title=title
    todo.tag=tag
    todo.completed=completed
    const updateTodo=await todo.save()
    res.json(updateTodo)
}
const deleteTodo=async(req,res)=>{
    const {_id}=req.params
    const todo=await TodoSchema.findById(_id)
    if(!todo)
        return res.status(404).send("the todo not found")
    const deleteTodo=await todo.deleteOne();
    res.json(deleteTodo)
}
const completeTodo=async(req,res)=>{
    const {_id}=req.params
    const todo=await TodoSchema.findById(_id)
    if(!todo)
        return res.status(404).send("id not found")
    todo.completed=!todo.completed
    const comletedTodo=await todo.save()
    return res.json(comletedTodo)
}
module.exports={getAlltodos,geTodoById,addTodo,updateTodo,deleteTodo,completeTodo}