Template.viewNetwork.onRendered(function(){
    // convert collections back into arrays
    var nodes = Nodes.find().fetch()[0];
    nodes = $.map(nodes, function(el) { return typeof el === 'object' ? el : null });
    var edges = Links.find().fetch()[0];

    if (edges)
        edges = $.map(edges, function(el) { return typeof el === 'object' ? el : null });

    // build cytoscape network / UI
    cy = cytoscape({
       container: $('.cytoscapeCtnr'),
       elements: {
           nodes: nodes,
           edges: edges
       },
        style: cytoscape.stylesheet().selector('edge').css({
            'line-color': '#adadad',
        }),
        layout: {
            name: 'cose',
            padding: 0,
            fit: true,
            animate: false
        }
    });

    var nodes = cy.nodes();
    styleNodes(nodes);

    cy.on('tap', 'node', loadMovieCast);
    if (!networkBuilder.hasBeenNotified){
        Materialize.toast('Click on a movie / TV show to display it\'s cast. Click on an actor to display his/her film credits.', 5500);
        Meteor.setTimeout(function(){
            Materialize.toast('You can also use the mouse to pan, zoom, and move (drag) items in the graph.', 5500);
        }, 2000);
        networkBuilder.hasBeenNotified = true;
    }
});

loadMovieCast = function(){
    networkBuilder.clearNetwork();
    var tapped = this;
    var data = tapped.data();
    var sourceId = data.id;

    // dynamically determine which server method to call...
    var infoByMediaType = {
        person: {methodName: 'addActorCredits', childType: 'movie'},
        movie: {methodName: 'addMovieCast', childType: 'person'},
        tv: {methodName: 'addTvCast', childType: 'person'}
    };
    var methodName = infoByMediaType[data['media_type']].methodName;

    Meteor.call(methodName, sourceId, function(err, resp){

        if (resp.length === 0)
            return Materialize.toast('No results found for ' + data.title + '.', 1500, 'toastError');

        //var parentNodeWithChildren = _.extend(data, resp);
        data['relatedNodes'] = resp;
        var parentNodeWithChildren = $.map(data, function(el) { return typeof el === 'object' ? el : null });

        var networkObj = networkBuilder.getNodesAndLinks(parentNodeWithChildren, sourceId);

        cy.add(networkObj.nodes);
        cy.add(networkObj.links);

        var nodes = cy.nodes();
        styleNodes(nodes);

        cy.layout({ name: 'cose', fit: true, animation: true, padding: 0 });
    });
}

styleNodes = function(nodes){
    var highDegreeNodes = [], highlightedEdges = [];
    nodes.forEach(function(node, idx){
        var imagePathField = _.intersection(networkBuilder.imageFields, _.keys(node.data()))[0];
        var titleField = _.intersection(['name','title'], _.keys(node.data()))[0];

        node.css('background-image', node.data(imagePathField));
        node.css('background-size', '30px 30px');
        node.css('background-height', '30px');
        node.css('background-width', '30px');
        node.css('height', '30px');
        node.css('width', '30px');
        node.css('content', node.data(titleField));
        node.css('color', '#1565C0');
        node.css('font-size', '5px');

        var deg = node.degree(true);
        if (deg > 2) {
            highDegreeNodes.push(node);
        }
    });

    var highDegreeNodeCombinations = pairwise(highDegreeNodes);
    _.each(highDegreeNodeCombinations, function(comb){
       var nodeA = comb[0], nodeB = comb[1];
        var dij = cy.elements().dijkstra(nodeA, function() { return 1; });
        var edges = dij.pathTo(nodeB);
        _.each(edges, function(edge){
            edge.css('line-color', '#1565C0');
        });
    });
}

pairwise = function(list) {
    if (list.length < 2) { return []; }
    var first = _.first(list),
        rest  = _.rest(list),
        pairs = _.map(rest, function (x) { return [first, x]; });
    return _.flatten([pairs, pairwise(rest)], true);
}