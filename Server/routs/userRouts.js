const express = require("express")
const userController = require("../controller/userComtroller")
const router = express.Router()
router.get("/", userController.getAllUsers)
router.get("/:_id", userController.getUserByID) 
router.post("/", userController.addUser)
router.put("/", userController.updateUser)
router.delete("/:_id", userController.deleteUser)


module.exports = router