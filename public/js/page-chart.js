(function(d3){

function PageGraph(data){

    var width = $('section.chart').width(),
        height = $('section.chart').height();

    var fill = data.colors;

    var nodes = data.pages;
    var links = data.pagelinks;

    var zoom = d3.behavior.zoom()
    .scaleExtent([0.001, 10])
    .on("zoom", zoomed);


    var svg = d3.select('section.chart div.chart-container').append('svg')
        .attr('class', 'pages')
        .attr('width', width)
        .attr('height', height)
        .call(zoom);



    var container = svg.append('svg:g');


    var force = d3.layout.force()
        .linkDistance(20)
        .gravity(0.01)
        .size([width, height])
        .friction(0.85)
        .charge(-160).nodes(nodes)
            .links(links)
            .start();
  

    var link = container.selectAll('.link')
            .data(links)
        .enter().append('line')
            .attr('class', function(d, i){
                return 'link ' + 'l' + d.source.index + ' ' + 'l' + d.target.index;
            });

    var node = container.selectAll('.node')
            .data(nodes)
        .enter().append('g')
            .attr('class', 'node')
            .call(force.drag)
        .on('mouseover', showText)
        .on('mouseout', showText)
        .on('click', function(d){
            console.log(d);
            console.log(d.index);

            d3.selectAll('.link.activated')
                .classed('activated', false);

            return d3.selectAll('.link.' + 'l' + d.index)
                .classed('activated', true);
        });

    node.append('svg:text')
    .text(function(d){
        return d.url;
    })
    .attr('dx', 4)
    .attr('dy', -2);

    node.append('circle')
        .attr('r', 4)
        .style('fill', function(d){ return fill[d._site]; });



    function showText(d){
        d3.select(this).classed('activated', function(){
            if(this.getAttribute('class').match(/activated/)){
                return false;
            }
            return true;
        })
    }

    function zoomed() {
      container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }



    force.on('tick', function(e) {
         var k = 6 * e.alpha

        link.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

        nodes.forEach( function (nd) {
            nd.y += nd._site & 1 ? k : -k;
            nd.x += nd._site & 2 ? k : -k;
        });

         node.attr('transform', function(d) { 
            return 'translate(' + d.x + ',' + d.y + ')'; 
        });
    });
    svg.append('svg:g')
        .attr('fill', 'white').append('svg:text')
        .text("Scroll to zoom, drag to pan, click on any page node to see its links.")
        .attr("dy", 23)
        .attr('fill', '#333333');
}

window.drawPages = PageGraph;

}(d3, window));