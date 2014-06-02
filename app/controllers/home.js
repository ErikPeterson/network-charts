var mongoose = require('mongoose'),
  Site = mongoose.model('Site');

exports.index = function(req, res){


    res.render('home/index', {

      title: 'Network Charts'

    });


};