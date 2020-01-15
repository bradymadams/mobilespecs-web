const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

function buildSlug(text) {
  const dash = '-';
  const empty = '';

  slug = text
    .toLowerCase()
    .trim()
    .replace(/[\.\,\"®™#²]/g, empty)
    .replace(/[\s\/\\\+\&\:\;]/g, dash);

  return slug;
}

function baseSchema(add) {
  var schema = new mongoose.Schema({
    name: String,
    active: Boolean,
    created: Date,
    updated: Date,
    slug: String
  });

  schema.index({slug: 'text'});

  schema.methods.buildSlug = function() {
    return buildSlug(this.name);
  };

  schema.add(add);

  return schema;
};

var supplierSchema = baseSchema({
  abbreviation: String,
  website: String,
  //products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

supplierSchema.methods.url = function() {
  return '/supplier/' + this.slug;
};

var productSchema = baseSchema({
  supplier: { type: mongoose.Schema.Types.ObjectId , ref: 'Supplier' },
  //materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }]
});

productSchema.methods.url = function() {
  return '/product/' + this.supplier.slug + '/' + this.slug;
};

var genericSchema = baseSchema({
    abbreviation: String
});

var fillerSchema = baseSchema({
    abbreviation: String
});

var gradeSchema = baseSchema({
  product: { type: mongoose.Schema.Types.ObjectId , ref: 'Product' },
})

const Supplier = mongoose.model('Supplier', supplierSchema);
const Product = mongoose.model('Product', productSchema);
const Generic = mongoose.model('Generic', genericSchema);
const Filler = mongoose.model('Filler', fillerSchema);
const Grade = mongoose.model('Grade', gradeSchema);

module.exports = { Supplier, Product, Generic, Filler, Grade, buildSlug };
