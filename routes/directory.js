var express = require('express');
var router = express.Router();

const db = require('../db/db');

/* GET users listing. */
router.get('/supplier/:supplierName', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
