const Orientation = require('../models/orientation');

exports.saveDataPoint = async function(shippingId, timestamp, orientation){
  return await Orientation.collection.insertOne({
    shippingId,
    timestamp,
    orientation
  })
};