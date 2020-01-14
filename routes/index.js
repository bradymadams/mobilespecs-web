var express = require('express');
var router = express.Router();

const models = require('../db/models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Supplier.find(
    { active: true }
  ).exec(
    (err, docs) => res.render('index', { suppliers: docs })
  );
});

module.exports = router;
