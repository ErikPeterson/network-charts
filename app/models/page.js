var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PageSchema = new Schema({
    _site: String,
    url: String,
    path: String,
    title: String
});

mongoose.model('Page', PageSchema);
