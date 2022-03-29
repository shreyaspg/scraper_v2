const express = require("express");
const router = express.Router();
// import { v4 as uuidv4 } from 'uuid';
const { v4 } = require("uuid");
var db = require("../database.js");
const {
  search_model_schema,
  create_site_schema,
  options,
  delete_site_schema,
} = require("../joi.js");

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
  /* #swagger.tags = ['Sites']
     #swagger.parameters['body'] = {
        in: 'body',
        required: 'true',
        type: 'string',
        schema: {
                  $site_name: 'Somesite'
              }
      }
     #swagger.responses[201] = {
            description: 'Return matched sites'
     }
  } */
  site_name = req.query.name;
  if (site_name.length == 0) {
    var err = new Error("Something went wrong");
    return next(err);
  }
  var sql = `SELECT * from sites WHERE name='${site_name}'`;
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
});

router.post("/create", (req, res, next) => {
  /* #swagger.tags = ['Sites']
     #swagger.parameters['body'] = {
        in: 'body',
        required: 'true',
        type: 'string',
        schema: {
                  $site_name: 'Somesite',
                  $url: 'url',
                  $proxy: 0
              }
      }
     #swagger.responses[201] = {
            description: 'Site created successfully',
            schema :{
              "url": "https://url.com",
              "site_name": "site_name",
              "locator": "/location.html"
            }
     }
  } */
  const { error, value } = create_site_schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    site_id = v4();
    console.log(site_id, value.site_name);
    var sql = `INSERT into sites (site_id, site_name, url, proxy) VALUES ("${site_id}", "${value.site_name}", "${value.url}", ${value.proxy})`;
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

router.post("/delete", (req, res, next) => {
  /* #swagger.tags = ['Sites']
     #swagger.parameters['body'] = {
        in: 'body',
        required: 'true',
        type: 'string',
        schema: {
                  $site_name: 'site',
              }
      }
     #swagger.responses[200] = {
            description: 'Site deleted successfully'
     }
  } */

  const { error, value } = delete_site_schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    var sql = `DELETE FROM sites WHERE site_name="${value.site_name}"`;
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
