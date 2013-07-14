$(document).ready(function() {

var viz_function = function( fileName, div_id, indx_lim, no_buckets, height ){
	var nodes = [];

	var w = 800,
    	h = 600,
   		fill = d3.scale.category10();

	d3.csv( fileName, function(data) {
    	nodes = data

		var vis = d3.select("#"+div_id).append("svg:svg")
    		.attr("width", w)
	    	.attr("height", height);


		var force = d3.layout.force()
    		.nodes(nodes)
	    	.links([])
	    	.size([w, h])
		    .charge([-600])
    		.start();


		var node = vis.selectAll("rect.node")
    		.data(nodes)
	    	.enter().append("svg:image")
	    	.attr("class", "node")
		    .attr("xlink:href",  function(d) {return "img/" + d.Image;})
    		.attr("height", 100  )
		    .attr("width", 100)
    		.call(force.drag);

	    $('svg image').tipsy({
    	    gravity: 'w',
        	html: true,
			opacity: 1,
    	    title: function() {
    		    var d = this.__data__;
				var pic_src = "img/" + d.Image;
	        	return '<img src=\"'+pic_src+'\" class=\"hoverpic\"> <h4><strong>' + d.Translation + '</strong></h4>';
    		}
		});


		vis.style("opacity", 1e-6)
    		.transition()
	    	.duration(1000)
	    	.style("opacity", 1);

		force.on("tick", function(e) {

		  // Push different nodes in different directions for clustering.
		    var k = 10 * e.alpha;
	    	nodes.forEach(function(o, i) {
    			o.y += -e.alpha *8; //function(d){return d.label;} == 0 ? k : -k;
				if ( no_buckets == 2 ){
			    	o.x += i >= indx_lim ? k : -k;
				}
				else{
					o.x += 0;
				}			
				// function(d){ if (d.label==0) {return -k;} else {return k;}} ; //== 0 ? k : -k;
			});

		    node.attr("x", function(d) { return d.x; })
			   .attr("y", function(d) { return d.y; });
		});

		d3.select("body").on("click", function() {
    		nodes.forEach(function(o, i) {
			    o.x += (Math.random() - .5) * 20;
    			o.y += (Math.random() - .5) * 20;
		    });
 			force.resume();
		});

	});
}


viz_function( 'meme_romania_cultural.csv', 'cultural', 8, 2, 500 );
viz_function( 'meme_romania_international.csv', 'international', 5, 1, 450 );
//viz_function( 'meme_romania_other.csv', 'other' );
viz_function( 'meme_romania_vote.csv', 'vote', 7, 2, 500 );
viz_function( 'meme_romania_CopyPaste.csv', 'copypaste', 8, 1, 600 );
viz_function( 'meme_romania_LeaderBashing.csv', 'leader', 2, 1, 500 );
});

    
