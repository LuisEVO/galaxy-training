const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const ParticipantController = require('../controllers/participant');

router.post("/", checkAuth, ParticipantController.create);

router.get("/:workshopId", checkAuth, ParticipantController.get);

router.put("/:id", checkAuth, ParticipantController.update);

router.delete("/:id", checkAuth, ParticipantController.delete);

module.exports = router;