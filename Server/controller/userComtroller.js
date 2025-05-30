const UserSchema = require("../models/userModdel")

const getAllUsers = async (req, res) => {
    const users = await UserSchema.find().lean()
    res.json(users)


}
const getUserByID = async (req, res) => {
    const  { _id } = req.params
    const user = await UserSchema.findById((_id)).lean()
    if(!user)
        return res.status(404).send("the user not found")
    res.json(user)

}
const addUser = async (req, res) => {
    const { name, userName, email, city, street, building, phone } = req.body
    if (!name || !userName)
        return res.status(400).send("Name and username required")
    if(userName.trim()===""||name.trim()==="")
        return res.status(400).send("invalid userName or name")
    const user = await UserSchema.findOne({ userName: userName }).lean()
    if (user)
        return res.status(400).send("userName must to be unique")
     const userResponse = await UserSchema.create({ name, userName, email, address: { city, street, building }, phone })
    res.json(userResponse)
}
const updateUser = async (req, res) => {
    const { _id, name, userName, email, city, street, building, phone } = req.body
    if (!name || !userName)
        return res.status(400).send("Name and username required")
    if(userName.trim()===""||name.trim()==="")
        return res.status(400).send("invalid userName or name")
    const newUsername = await UserSchema.findOne({ _id: { $ne: _id },userName: userName    }).lean()
    if (newUsername)
        return res.status(400).send("userName must to be unique")
    let user = await UserSchema.findById(_id)
    if (!user)
        return res.status(404).send("the user not found")
   
    user.name = name
    user. userName = userName
    user.email = email
   user.address = { city, street, building }
    user.phone = phone
    const updateUser = await user.save()
    res.json( updateUser)
}
const deleteUser = async (req, res) => {
    const { _id } = req.params
    const user = await UserSchema.findById(_id)
    if (!user)
        return res.status(404).send("the user not found")
    const userDelete = await user.deleteOne()
    res.json(userDelete)
}

module.exports = { getAllUsers, getUserByID, addUser, updateUser, deleteUser }