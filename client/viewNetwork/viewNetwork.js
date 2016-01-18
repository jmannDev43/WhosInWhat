Template.viewNetwork.onRendered(function(){
    // convert collections back into arrays
    var nodes = Nodes.find().fetch()[0];
    nodes = $.map(nodes, function(el) { return typeof el === 'object' ? el : null });
    var edges = Links.find().fetch()[0];
    edges = $.map(edges, function(el) { return typeof el === 'object' ? el : null });

    var imageUrl = 'https://image.tmdb.org/t/p/w185';
    // build cytoscape network / UI
    var cy = cytoscape({
       container: $('.cytoscapeCtnr'),
       elements: {
           nodes: nodes,
           edges: edges
       },
       //style: cytoscape.stylesheet().selector('node').style({
       //   'background-image': function(el) {
       //       return el.data('imagePath') ? imageUrl + el.data('imagePath') : null;
       //   }
       //}),

        layout: {
            name: 'breadthfirst',
            directed: true,
            padding: 0,
            fit: true
        }
    });

});

//Template.viewNetwork.helpers({
//   networkItems: function(){
//       return NetworkItems.find();
//   }
//});