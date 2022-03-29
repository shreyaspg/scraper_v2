const express = require("express");
const router = express.Router();
const modelController = require("../controllers/models.js");

router.get("/all_models", modelController.all_models);
router.post("/search_model", modelController.search_model);
router.post("/create_model", modelController.create_model);
router.post("/delete_model", modelController.delete_model);

module.exports = router;
