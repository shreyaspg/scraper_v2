const express = require("express");
const router = express.Router();
const { v4 } = require("uuid");
const modelController = require("../controllers/models.js");
var db = require("../database.js");

const {
  search_model_schema,
  create_model_schema,
  delete_model_schema,
  options,
} = require("../joi.js");



router.get("/all_models", (req, res, next) => {
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
});

router.post("/search_model", (req, res, next) => {
  /* #swagger.tags = ['Models']
     #swagger.parameters['body'] = {
        in: 'body',
        required: 'true',
        type: 'string',
        schema: {
                  $model: 'Jhon Doe',
                  $site: 29
              }
      }
     #swagger.responses[200] = {
            description: 'URL & locator returned successfully',
            schema :{
              "url": "https://url.com",
              "site_name": "site_name",
              "locator": "/location.html"
            }
     }
  } */
  const { body } = req;
  // validate request body against schema
  const { error, value } = search_model_schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    var sql = `SELECT url, site_name, locator FROM sites JOIN model_site on sites.site_id = model_site.site_id WHERE model_site.model_id=(SELECT model_id FROM models WHERE name="${body.model}")`;
    var params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        return next(err);
      }
      res.json({
        message: "success",
        data: rows,
      });
    });
  }
});

router.post("/create_model", (req, res, next) => {
  /* #swagger.tags = ['Models']
     #swagger.parameters['body'] = {
        in: 'body',
        required: 'true',
        type: 'string',
        schema: {
                  $name: 'model_name'
              }
      }
     #swagger.responses[201] = {
            description: 'Model created successfully'
     }
  } */

  const { error, value } = create_model_schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    model_id = v4();
    var sql = `INSERT into models (model_id, name) VALUES ("${model_id}", "${value.name}")`;
    var params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        message: "success",
        data: rows,
      });
    });
  }
});

router.post("/delete_model", (req, res, next) => {
  /* #swagger.tags = ['Models']
     #swagger.parameters['body'] = {
        in: 'body',
        required: 'true',
        type: 'string',
        schema: {
                  $name: 'modelA',
              }
      }
     #swagger.responses[200] = {
            description: 'Site deleted successfully'
     }
  } */

  const { error, value } = delete_model_schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    var sql = `DELETE FROM models WHERE name="${value.name}"`;
    var params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        message: "success",
        data: rows,
      });
    });
  }
});

module.exports = router;
