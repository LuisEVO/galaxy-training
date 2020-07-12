const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const idProtected = require('../middleware/id-protected');
const checkAuth = require('../middleware/check-auth');

const WorkshopController = require('../controllers/workshop');

router.get("/portal", WorkshopController.getAllPublic);

router.get("/participants", checkAuth, WorkshopController.getAllParticipants);

router.get("/", WorkshopController.getAllPrivate);

router.post("/", WorkshopController.create);

router.get("/:id", WorkshopController.get);

router.put("/:id", idProtected, WorkshopController.update);

router.delete("/:id", idProtected, WorkshopController.delete);

router.put("/:id/poster", idProtected, upload.image.single('poster'), WorkshopController.updatePoster);

// router.put("/:id/temary", upload.pdf.single('temary'), WorkshopController.updateTemary);

router.get("/:id/participants", WorkshopController.getParticipants);



module.exports = router;
