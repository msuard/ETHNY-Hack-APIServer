const OrientationController = require('../../controllers/orientation');

class Service {

  constructor (app, options) {
    this.options = options || {};
    this.app = app;

  }

  async create(data, params) {

    return await OrientationController.saveDataPoint(data.shippingId, data.timestamp, data.orientation)

  }

  async find(params) {

    try{


    } catch(e){
      throw(e)
    }

  }

  async get(id, params) {

    try {
      return await OrientationController.getDataPoints(id);


    } catch(e){
      throw(e)
    }

  }


}

module.exports = function (app, options) {
  return new Service(app, options);
};

module.exports.Service = Service;
