const photoController = require("../controller/photosController")
const express = require("express")
const router = express.Router()
router.get("/", photoController.getAllPhotos)
router.get("/:_id", photoController.getPhtoById)
router.post("/", photoController.addPhoto)
router.put("/", photoController.updatePhoto)
router.delete("/:_id", photoController.deletePhoto)
module.exports = router
