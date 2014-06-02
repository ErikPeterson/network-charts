var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PageLinkSchema = new Schema({
    _sourceSite: String,
    _targetSite: String,
    source: String,
    target: String
});

mongoose.model('PageLink', PageLinkSchema);
