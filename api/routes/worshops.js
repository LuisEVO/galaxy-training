const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload');

const WorkshopController = require('../controllers/workshop');

router.get("/", WorkshopController.getAll);

router.post("/", WorkshopController.create);

router.get("/:id", WorkshopController.get);

router.put("/:id", WorkshopController.update);

router.delete("/:id", WorkshopController.delete);

router.put("/poster/:id", upload.image.single('poster'), WorkshopController.updatePoster);

router.put("/temary/:id", upload.pdf.single('temary'), WorkshopController.updateTemary);


module.exports = router;