const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/mobilspecs',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

var db = mongoose.connection;

db.on(
    'error',
    function(err) {
        console.error('Failed to connect to database');
        console.error(err);
    }
);

db.once(
    'open',
    function() {
        console.log('Mongo database connected');
    }
);

module.exports = db;
