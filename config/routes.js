module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);

    var sites = require('../app/controllers/sites');
    app.get('/sites', sites.all)

    var pages = require('../app/controllers/pages');
    app.get('/pages', pages.all);

};
