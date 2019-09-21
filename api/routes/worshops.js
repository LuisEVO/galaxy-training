const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload');

const WorkshopController = require('../controllers/workshop');

router.get("/", WorkshopController.getAll);

router.post("/", checkAuth, WorkshopController.create);

router.get("/:id", WorkshopController.get);

router.put("/:id", checkAuth, WorkshopController.update);

router.delete("/:id", checkAuth, WorkshopController.delete);

router.put("/poster/:id", checkAuth, upload.image.single('poster'), WorkshopController.updatePoster);

router.put("/temary/:id", checkAuth, upload.pdf.single('temary'), WorkshopController.updateTemary);


module.exports = router;