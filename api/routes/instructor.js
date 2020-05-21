const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload');

const InstructorController = require('../controllers/instructor');

router.get("/", InstructorController.getAll);

router.post("/", InstructorController.create);

router.get("/:id", InstructorController.get);

router.put("/:id", InstructorController.update);

router.delete("/:id", InstructorController.delete);

module.exports = router;
