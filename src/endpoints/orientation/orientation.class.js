const OrientationController = require('../../controllers/orientation');
const sha256 = require('../../utils/sha256');

class Service {

  constructor (app, options) {
    this.options = options || {};
    this.app = app;
    this.Web3Service = app.get('web3Service');
  }

  async create(data, params) {

    console.log(data);

    await this.Web3Service.sendData([
      "0x" + sha256.sha256(data.shippingId),
      data.timestamp.c1,
      data.timestamp.c2,
      data.orientation.c1,
      data.orientation.c2,
      data.orientationEphemeralKey.c1,
      data.orientationEphemeralKey.c2
    ]);


    return await OrientationController.saveDataPoint(
      data.shippingId,
      data.timestamp,
      data.orientation,
      data.timestampEphemeralKey,
      data.orientationEphemeralKey
    )

  }

  async find(params) {

    try{

      return await OrientationController.getShippingIdsList();


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
