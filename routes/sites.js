const express = require("express");
const router = express.Router();
var sitesController = require("../controllers/sites.js");

router.get("/all", sitesController.all);
router.get("/search", sitesController.search);
router.post("/create", sitesController.create);
router.post("/delete", sitesController.delete_site);

module.exports = router;
