const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

function baseSchema(add) {
  var schema = new mongoose.Schema({
    name: String,
    active: Boolean,
    created: Date,
    updated: Date,
    slug: String
  });

  schema.index({slug: 'text'});

  schema.add(add);

  return schema;
};

var supplierSchema = baseSchema({
  abbreviation: String,
  website: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

var productSchema = baseSchema({
  supplier: { type: mongoose.Schema.Types.ObjectId , ref: 'Supplier' },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }]
});

var materialSchema = baseSchema({
  product: { type: mongoose.Schema.Types.ObjectId , ref: 'Product' },
})

const Supplier = mongoose.model('Supplier', supplierSchema);
const Product = mongoose.model('Product', productSchema);
const Material = mongoose.model('Material', materialSchema);

module.exports = { Supplier, Product, Material };
