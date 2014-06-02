var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SiteLinkSchema = new Schema({
    source: String,
    target: String
});

mongoose.model('SiteLink', SiteLinkSchema);
