const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exampleSchema = new Schema({
  shippingId: String,
  timestamp: Object,
  orientation: Object
});

const Orientation = mongoose.model('Orientation', exampleSchema, 'orientation');

module.exports = Orientation;