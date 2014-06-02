var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SiteSchema = new Schema({
    name: String,
    domainName: String
});

mongoose.model('Site', SiteSchema);
