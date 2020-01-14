var express = require('express');
var router = express.Router();

const db = require('../db/db');
const models = require('../db/models');

/* GET users listing. */
router.get('/supplier/:supplierSlug', function(req, res, next) {
  let q1 = models.Supplier
    .find(
      {
        $text: {
          $search: req.params.supplierSlug
        }
      }
    )
    .populate(
      'products'
    )
    .exec();

  q1.then(
    (sdocs) => {
      let q2 = models.Product
        .find(
          { supplier : sdocs[0]._id }
        )
        .exec(
          (err, pdocs) => res.render('directory/supplier', { supplier: sdocs[0], products: pdocs })
        );
    }
  );
});

module.exports = router;
