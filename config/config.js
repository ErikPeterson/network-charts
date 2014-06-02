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
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://heroku_app25941671:q2dcm8gm6034v94orr9q69m7l0@ds051858.mongolab.com:51858/heroku_app25941671'
  }
};

module.exports = config[env];
