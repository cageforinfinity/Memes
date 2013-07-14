$(document).ready(function() {

var radius = 150,
    padding = 5;

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 30);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

d3.csv("meme_full_labels.csv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));

  data.forEach(function(d) {
    d.ages = color.domain().map(function(name) {
      return {name: name, population: +d[name]};
    });
  });

  var svg = d3.select("body").select("#img_body").selectAll(".pie") //append("svg") //selectAll(".pie")
    .data(data)
    .enter().append("svg")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      .attr("class", function(d) { return d.Label; })
      .attr("width", radius )
      .attr("height", radius )

  svg.append("svg:image")
      .attr("xlink:href", function(d) { return "img_small/small_" + d.Image; })
      .attr("width", radius)
      .attr("height", radius );


  $('svg').popover({
    html   : true,
    trigger: 'hover',
    placement: 'bottom',
    title: function(){  }, 
    content: function(){
                var d = this.__data__;
                var pic_src = "img/" + d.Image;
      return  '<img src=\"'+pic_src+'\" class=\"hoverpic\"/> <small id=\"sourcepic\">' + d.Source + '</small>';


    } 
  });

});


var hide_show = function(id_div, cls_obj){
  $( id_div ).click( function(){
    $("svg").hide();
    $(cls_obj).show();
    $(".menu_opt").css("color", "rgb(143, 143, 143)");
    $(id_div).css("color", "white");
    $(window).scrollTop(0);
  });

}

/*    for equality memes */

hide_show( "#all",      "svg"  );
hide_show( "#promeme", ".pro" );
hide_show( "#conmeme", ".con" );
hide_show( "#eq", ".eq" );


hide_show( "#food", ".food" );
hide_show( "#love", ".love" );
hide_show( "#physical", ".physical" );
hide_show( "#eqvertical", ".eqvertical" );
hide_show( "#eqperturbed", ".eqperturbed" );
hide_show( "#eqobj", ".obj" );
hide_show( "#face", ".face" );
hide_show( "#character", ".character" );
hide_show( "#interactive", ".interactive" );
hide_show( "#macro", ".macro" );
hide_show( "#message", ".message" );
hide_show( "#animal", ".animal" );
hide_show( "#sex", ".sex" );
hide_show( "#place", ".place" );
hide_show( "#brand", ".brand" );
hide_show( "", "" );

$("#eq_").hide();



/*   for marathon memes    */
hide_show( "#all",      "svg"  );

hide_show( "#pray", ".pray" );
hide_show( "#strong", ".strong" );
hide_show( "#police", ".police" );

hide_show( "#manhunt", ".manhunt" );
hide_show( "#violence", ".violence" );
hide_show( "#terrorism", ".terrorism" );
hide_show( "#clue", ".clue" );
hide_show( "#inspirational", ".inspirational" );
hide_show( "#shame", ".shame" );
hide_show( "#bomb", ".bomb" );
hide_show( "#race", ".race" );
hide_show( "#international", ".international" );
hide_show( "#meme", ".meme" );

/* romanian memes */

hide_show( "#all",      "svg"  );

hide_show( "#ponta", ".ponta" );
hide_show( "#basescu", ".basescu" );
hide_show( "#copypaste", ".copypaste" );
hide_show( "#cultural", ".cultural" );
hide_show( "#international", ".international" );
hide_show( "#leaderbashing", ".leaderbashing" );
hide_show( "#vote", ".vote" );
hide_show( "#novote", ".novote" );
hide_show( "", "" );
hide_show( "", "" );
hide_show( "", "" );

});
