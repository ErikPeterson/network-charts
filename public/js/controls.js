(function($, Promise, window){

        var $sitesbutton = $("li#sites-button"),
            $pagesbutton = $("li#pages-button"),
            $container = $('.chart-container');


        var $sitereq = $.ajax('/sites', {dataType: 'json'}),
            sitepromise = Promise.resolve($sitereq);

            sitepromise.then(function(data){
                
                drawSites(data);
                
                $sitesbutton.on('click', function(){
                
                    if(!$container.hasClass('sites') && $('svg.sites').length == 0){
                        if($('svg.pages')){
                            $('svg.pages').remove();
                            $container.removeClass('pages');
                            $pagesbutton.removeClass('active');
                        }

                        drawSites(data);
                        $container.addClass('sites');
                        $sitesbutton.addClass('sites');
                    }

                });
            });

        var $pagereq = $.ajax('/pages', {dataType: 'json'}),
            pagepromise = Promise.resolve($pagereq);

            pagepromise.then(function(data){

                $pagesbutton.on('click', function(){
                
                    if(!$container.hasClass('pagees') && $('svg.pages').length == 0){
                        if($('svg.sites')){
                            $('svg.sites').remove();
                            $container.removeClass('sites');
                            $sitesbutton.removeClass('active');
                        }

                        drawPages(data);
                        $container.addClass('pages');
                        $sitesbutton.addClass('pages');
                    }

                });


            });

            



}(jQuery, Promise, window));