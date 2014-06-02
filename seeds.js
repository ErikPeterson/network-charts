
    var mongoose = require('mongoose'),
        config = require('./config/config');

    var colors = require('colors');

    mongoose.connect(config.db);

    var db = mongoose.connection;

    var faker = require('faker');

    var modelsPath = __dirname + '/app/models';

    require(modelsPath + '/site.js');
    require(modelsPath + '/siteLink.js');
    require(modelsPath + '/page.js');
    require(modelsPath + '/pageLink.js');

    var Site = mongoose.model('Site'),
        Page = mongoose.model('Page'),
        SiteLink = mongoose.model('SiteLink'),
        PageLink = mongoose.model('PageLink');

    var sites = [],
        pages = [],
        siteLinks = [],
        pageLinks = [];

    function buildSite(){
        var sitename = faker.Company.companyName(),
            domainName = faker.Internet.domainName();

            sites.push({name: sitename, domainName: domainName});
    }

    function buildPages(sites){

        sites.forEach(buildSitePages);

        return pages; 
    }

    function buildSitePages(site){
        console.log("Building pages for site" + site.domainName + "...")

        var path, url, title, 
            domain = site.domainName,
            count = Math.floor(Math.random() * 25) + 1;

        while(count > 0){
            count--;
            title = faker.Company.bs();
            path = '/' + faker.random.bs_adjective() + '/' + faker.Helpers.slugify(title) + '.html';
            url = domain + path;
            pages.push({_site: domain, url: url, title: title, path: path})
        }

    }

    function buildSites(count){
        console.log("Building sites...")
        while(count > 0){
            count--;
            buildSite();
        }

        return sites;
    }

    function linkPages(pages){

        console.log("Adding links to pages...");

        pages.forEach(addPageLinks)

        return pageLinks;
    }

    function addPageLinks(page){

        var links = shuffle(pages.slice(0)).slice(0, Math.floor(Math.random() * 5) + 1),
            extantDomains = [];

        links.forEach(function(link){
            pageLinks.push({_sourceSite: page._site, _targetSite: link._site, source: page.url, target: link.url});     
        });

    }

    function linkSites(sites, pagelinks){
        console.log("Adding links to sites...");

        sites.forEach(function(site){
            var visited = [];
            pagelinks.forEach(function(link){
                if(link._sourceSite === site.domainName && visited.indexOf(link._toSite) === -1 ){
                    visited.push(link._toSite);
                    siteLinks.push({source: site.domainName, target: link._targetSite});
                }
            });
        });

        return siteLinks;
    }

    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    function seed(count, cb){

        var sitearr = buildSites(count),
            pagesarr = buildPages(sitearr),
            pageLinkArr = linkPages(pagesarr),
            siteLinkArr = linkSites(sitearr, pageLinkArr);

        console.log("Beginning save...");
        if(siteLinkArr.length === 0){
            db.close();
            return console.log("empty site links");
        }

        Site.create( sitearr, function(err){
            if(err){
                console.log(err.toString().red);
                return;
            } else{
                console.log("Successfully saved sites : )".green);
            }
        });

        Page.create( pagesarr, function(err){
            if(err){
                console.log(err.toString().red);
                return;
            } else{
                console.log("Successfully saved pages : )".green);
            }
        });

        PageLink.create( pageLinkArr, function(err){
            if(err){
                console.log(err.toString().red);
                return;
            } else{
                console.log("Successfully saved page links : )".green);
            }
        });

        SiteLink.create( siteLinkArr, function(err){
            if(err){
                console.log(err.toString().red);
                return;
            } else{
                console.log("Successfully saved site links : )".green);

                db.close()
            }
        });
        
        return cb();
    }

   
    seed(150, function(){
        console.log("Seed complete!")
    });
