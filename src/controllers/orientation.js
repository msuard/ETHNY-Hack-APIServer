const Orientation = require('../models/orientation');
exports.saveDataPoint = async function(shippingId, timestamp, orientation){
  return await Orientation.collection.insertOne({
    shippingId,
    timestamp,
    orientation
  })
};

exports.getDataPoints = async function(shippingId){
  return await Orientation.find({
    shippingId
  })
};

exports.getShippingIdsList = async function(shippingId){
  const result = await Orientation.find({})
  let shippingIds = {};
  result.forEach((item)=> {
    if(!shippingIds[item.shippingId]){
      shippingIds[item.shippingId] = true;
    }
  });

  return Object.keys(shippingIds);

};