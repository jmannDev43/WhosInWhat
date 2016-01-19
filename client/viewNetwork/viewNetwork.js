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
        style: cytoscape.stylesheet().selector('edge').css({
            'line-color': '#B2B2B2',
        }),
        layout: {
            name: 'cose',
            padding: 0,
            fit: true,
            animate: false
        }
    });

    var nodes = cy.nodes();
    nodes.forEach(function(node, idx){
       node.css('background-image', node.data('imagePath'));
       node.css('background-size', '30px 30px');
       node.css('background-height', '30px');
       node.css('background-width', '30px');
       node.css('height', '30px');
       node.css('width', '30px');
       node.css('content', node.data('title'));
       node.css('color', '#1565C0');
       node.css('font-size', '5px');

        if (node.data('mediaType') != 'person' && node._private.edges.length > 1){
            node._private.edges.forEach(function(edge, idx){
                edge.css('line-color', '#1565C0');
                edge.css('width', '2');
            });
        }
    });

});

//Template.viewNetwork.helpers({
//   networkItems: function(){
//       return NetworkItems.find();
//   }
//});