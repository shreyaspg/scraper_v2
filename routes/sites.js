const express = require("express");
const router = express.Router();
var db = require("../database.js");

// https://b124-122-167-250-110.ngrok.io/api/sites/all
router.get("/all", (req, res, next) => {
  // #swagger.tags = ['Sites']
  var sql = "select * from sites";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      next(err);
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// example: https://b124-122-167-250-110.ngrok.io/api/sites?name=sitename
router.get("/search", (req, res, next) => {
  // #swagger.tags = ['Sites']
  site_name = req.query.name;
  if (site_name.length == 0) {
    var err = new Error("Something went wrong");
    return next(err);
  }
  var sql = `SELECT * from sites WHERE name='${site_name}'`;
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      return next(err)
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

module.exports = router;
