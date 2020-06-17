const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const idProtected = require('../middleware/id-protected');
const checkAuth = require('../middleware/check-auth');

const WorkshopController = require('../controllers/workshop');

router.get("/portal", WorkshopController.getAllPublic);

router.get("/", checkAuth, WorkshopController.getAllPrivate);

router.post("/", checkAuth, WorkshopController.create);

router.get("/:id", checkAuth, WorkshopController.get);

router.put("/:id", checkAuth, idProtected, WorkshopController.update);

router.delete("/:id", checkAuth, idProtected, WorkshopController.delete);

router.put("/:id/poster", checkAuth, idProtected, upload.image.single('poster'), WorkshopController.updatePoster);

router.put("/:id/temary", upload.pdf.single('temary'), WorkshopController.updateTemary);

router.get("/:id/participants", checkAuth, WorkshopController.getParticipants);


module.exports = router;
