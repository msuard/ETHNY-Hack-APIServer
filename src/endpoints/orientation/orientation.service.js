// Initializes the `alert` service on path `/alert`
const getRequestHeaders = require('../../utils/headers');
const createOrientationService = require('./orientation.class');
const hooks = require('./orientation.hooks');

module.exports = function (app) {

  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our public service with any options it requires
  app.use('/orientation', getRequestHeaders, createOrientationService(app, options));


  // Get our initialized public service so that we can register hooks
  const orientationService = app.service('orientation');

  orientationService.hooks(hooks(app));

};
