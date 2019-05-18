const orientation = require('./orientation/orientation.service');

module.exports = function (app) {
  app.configure(orientation);
};
