var mongoose = require('mongoose'),
  Site = mongoose.model('Site'),
  SiteLink = mongoose.model('SiteLink'),
  async = require('async');

exports.all = function(req, res){
  var data = {

    };

      res.setHeader('Content-Type', 'application/json');
      
      Site.find().lean().exec(function(err, sites){

        if(err){
            res.status(500);
            return res.end(JSON.stringify({err: err}));
        }

        data.sites = sites;

        async.map(sites, asyncDomainName, function(err, urlarray){
            if(err){
                res.status(500);
                return res.end(JSON.stringify({err: err}));
            }

            SiteLink.find().lean().exec(function(err, sitelinks){
            
                async.map(sitelinks, function(sl, callback){
                    callback(null, {source: urlarray.indexOf(sl.source), target: urlarray.indexOf(sl.target)});
                },
                    function(err, sls){
                        if(err){
                         res.status(500);
                         return res.end(JSON.stringify({err: err}));
                        }
                        data.sitelinks = sls;
                        res.json(data);
                    }
                );

            });

        });
        
      });
    
};

function asyncDomainName(item, callback){
    callback(null, item.domainName);
}