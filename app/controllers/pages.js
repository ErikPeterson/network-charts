var mongoose = require('mongoose'),
  Site = mongoose.model('Site'),
  Page = mongoose.model('Page'),
  PageLink = mongoose.model('PageLink'),
  async = require('async'),
  randomcolor = require('randomcolor');

exports.all = function(req, res){
  var data = {};

    res.setHeader('Content-Type', 'application/json');

    Site.find().lean().exec(function(err, sites){
        if(err){
            res.status(500);
            return res.end(JSON.stringify({err: err}));
        }

        async.map(sites, asyncDomainName, function(err, urlarray){
            if(err){
                res.status(500);
                return res.end(JSON.stringify({err: err}));
            }

            data.colors = randomcolor({luminosity: 'bright', count: urlarray.length, format: 'hex'});

            Page.find().lean().exec(function(err, pages){
                if(err){
                    res.status(500);
                    return res.end(JSON.stringify({err: err}));
                }

                async.map(pages, 

                    function(page, callback){

                        page._site = urlarray.indexOf(page._site)
                    
                        callback(null, page.url);
                    
                    }, function(err, pageurlarray){
                            if(err){
                                res.status(500);
                                return res.end(JSON.stringify({err: err}));
                            }

                        data.pages = pages;

                        PageLink.find().lean().exec(function(err, pagelinks){

                            if(err){
                                res.status(500);
                                return res.end(JSON.stringify({err: err}));
                            }

                            async.map(pagelinks, 
                                function(pl, callback){
                                    callback(null, {source: pageurlarray.indexOf(pl.source), target: pageurlarray.indexOf(pl.target)});
                                },
                                function(err, pls){
                                    if(err){
                                        res.status(500);
                                        return res.end(JSON.stringify({err: err}));
                                    }

                                    data.pagelinks = pls;
                                    res.json(data);
                                });

                        });
                    });
            });

        });
    });
    
}


function asyncDomainName(item, callback){
    callback(null, item.domainName);
}