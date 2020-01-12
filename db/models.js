const mongoose = require('mongoose');

var supplierSchema = new mongoose.Schema({
    name: String,
    website: String
});
