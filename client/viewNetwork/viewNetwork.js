Template.viewNetwork.onRendered(function(){
    // convert collections back into arrays
    var nodes = Nodes.find().fetch()[0];
    nodes = $.map(nodes, function(el) { return typeof el === 'object' ? el : null });
    var edges = Links.find().fetch()[0];
    edges = $.map(edges, function(el) { return typeof el === 'object' ? el : null });

    imageUrl = 'https://image.tmdb.org/t/p/w185';
    // build cytoscape network / UI
    cy = cytoscape({
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

    cy.on('tap', 'node', loadMovieCast);

    //cy.on('add', 'node, edge', function(e){
    //    e.cyTarget.css('opacity', 0);
    //    e.cyTarget.animate({ opacity: 1}, 500);
    //});

});

loadMovieCast = function(){

    var tapped = this;
    var data = tapped.data();
    var sourceId = data.id;
    // could dynamically determine which method here
    Meteor.call('addMovieCast', sourceId, function(err, resp){

        var nodeArray = [], nodeIdArray = [], linkArray = [];
        var imagePath = null, title = null;
        var imageUrl = 'https://image.tmdb.org/t/p/w185';
        resp.forEach(function(el, idx) {
            var imageShort = el['profile_path'] ? el['profile_path'] : el['poster_path'];
            title = el['name'] ? el['name'] : el['title'];
            // Push Top-Level selectedItems
            if (nodeIdArray.indexOf(el.id) === -1) {
                var imagePath = imageShort ? imageUrl + imageShort : 'missing.png';
                nodeArray.push({
                    group: 'nodes',
                    data: {
                        id: el.id.toString(),
                        title: title,
                        imagePath: imagePath,
                        mediaType: 'person'
                    }
                });
                nodeIdArray.push(el.id);

                // Don't add link for single person connected to it (make more robust)
                if (el.id !== sourceId){
                    linkArray.push({
                        group: 'edges',
                        data: {
                            source: el.id.toString(),
                            target: sourceId
                        }
                    });
                }
            }
        });
        console.log(cy.nodes().length);
        cy.add(nodeArray);
        cy.add(linkArray);
        console.log(cy.nodes().length);

        var nodes = cy.nodes();
        nodes.forEach(function(node, idx) {
            node.css('background-image', node.data('imagePath'));
            node.css('background-size', '30px 30px');
            node.css('background-height', '30px');
            node.css('background-width', '30px');
            node.css('height', '30px');
            node.css('width', '30px');
            node.css('content', node.data('title'));
            node.css('color', '#1565C0');
            node.css('font-size', '5px');

            if (node.data('mediaType') != 'person' && node._private.edges.length > 1) {
                node._private.edges.forEach(function (edge, idx) {
                    edge.css('line-color', '#1565C0');
                    edge.css('width', '2');
                });
            }
        });

        cy.layout({ name: 'cose', fit: true, animation: true, padding: 0 });
    });
}