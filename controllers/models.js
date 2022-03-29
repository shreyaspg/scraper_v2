var db = require("../database.js");


const all_models = (req, res, next) => {
  // #swagger.tags = ['Models']
  var sql = "select * from models";
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
};

module.exports = {all_models}