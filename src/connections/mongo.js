const Promise = require('bluebird');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.Promise = Promise;

class MongoService {

  constructor(config, on_connection_open) {
    const {url} = config;
    console.log(url)
    mongoose.connect(url, { useNewUrlParser: true });
    this.client = mongoose.connection;

    this.client.on('error', (error) => {
      logger.error('mongo connection error', error);
    })
      .once('open', () => {
        logger.info('remote mongo connection established\n');
        if (on_connection_open) on_connection_open();
      });
  }

  getClient() {
    return this.client;
  }

}


module.exports = function () {
  return function(){

    const app = this;
    const mongoConfig = app.get('mongo');
    const mongoServ = new MongoService(mongoConfig);

    app.set('mongoService', mongoServ);
  };
};
