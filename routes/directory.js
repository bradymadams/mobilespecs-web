var express = require('express');
var router = express.Router();

const db = require('../db/db');
const models = require('../db/models');

/* GET users listing. */
router.get('/supplier/:supplierSlug', function(req, res, next) {
  models.Supplier.find(
    {
      $text: {
        $search: req.params.supplierSlug
      }
    }
  ).exec(
    (err, docs) => res.render('directory/supplier', { supplier: docs[0] })
  );
});

module.exports = router;
