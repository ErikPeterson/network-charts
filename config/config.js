var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'network-chart'
    },
    port: 3000,
    db: 'mongodb://localhost/network-chart-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'network-chart'
    },
    port: 3000,
    db: 'mongodb://localhost/network-chart-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'network-chart'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/network-chart-production'
  }
};

module.exports = config[env];
