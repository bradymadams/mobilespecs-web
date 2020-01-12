const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

function baseSchema(add) {
  var schema = new mongoose.Schema({
    active: Boolean,
    created: Date,
    updated: Date,
    slug: String
  });

  schema.add(add);

  return schema;
};

var supplierSchema = baseSchema({
    name: String,
    abbreviation: String,
    website: String
});

supplierSchema.index({slug: 'text'});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = { Supplier };
