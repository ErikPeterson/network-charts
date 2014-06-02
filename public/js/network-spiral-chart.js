(function($, d3, Promise){

function initGraph(data){

    var width = $('section.chart').width(),
        height = $('section.chart').height();

    var fill = d3.scale.category10();

    var nodes = data.sites;
    var links = data.sitelinks;


    var svg = d3.select('section.chart div.chart-container').append('svg')
        .attr('width', width)
        .attr('height', height);


    var force = d3.layout.force()
        .linkDistance(10)
        .gravity(.06)
        .size([width, height])
        .charge(-90).nodes(nodes)
            .links(links)
            .start();
  

    var link = svg.selectAll('.link')
            .data(links)
        .enter().append('line')
            .attr('class', 'link')
            .style('stroke-width', 1);

    var node = svg.selectAll('.node')
            .data(nodes)
        .enter().append('g')
            .attr('class', 'node')
            .call(force.drag)
        .on('click', showText);

    node.append('circle')
        .attr('r', 4)
        .style('fill', function(d, i){ return fill(i); });

    node.append('svg:text')
        .text(function(d){
            return d.domainName;
        })
        .attr('dx', 4)
        .attr('dy', -2);

    function showText(d){
        d3.select(this).classed('active', function(){
            if(this.getAttribute('class').match(/active/)){
                return false;
            }
            return true;
        })
    };



    force.on('tick', function() {
        link.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

         node.attr('transform', function(d) { 
            return 'translate(' + d.x + ',' + d.y + ')'; 
        });
    });

}



    $(function(){
        var $req = $.ajax('/sites', {dataType: 'json'}),
            promise = Promise.resolve($req);

            promise.then(initGraph);
    });
    

}(jQuery, d3, Promise));