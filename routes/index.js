var express = require('express');
var router = express.Router();

const db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  suppliers = [];

  //db.

  res.render('index', { suppliers: suppliers });
});

module.exports = router;
