const OrientationController = require('../../controllers/orientation');

class Service {

  constructor (app, options) {
    this.options = options || {};
    this.app = app;

  }

  async create(data, params) {

    return await OrientationController.saveDataPoint(data.shippingId, data.timestamp, data.orientation)

  }

}

module.exports = function (app, options) {
  return new Service(app, options);
};

module.exports.Service = Service;
