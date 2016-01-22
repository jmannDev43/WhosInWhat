
networkBuilder = {
    nodeArray: [],
    linkArray: [],
    nodeIdArray: [],
    linkIdArray: [],
    imageUrl: 'https://image.tmdb.org/t/p/w185',
    imageFields: ['imagePath','poster_path','profile_path'],
    lastMethodName: '',
    getImagePath: function(el){
        var path;
        var imageField = _.intersection(_.keys(el), networkBuilder.imageFields);
        if (el[imageField]){
            path = imageField === 'imagePath' ? el[imageField] : networkBuilder.imageUrl + el[imageField];
        } else {
            path = 'missing.png';
        }
        return path;
    },
    getTitle: function(el){
        return el['name'] ? el['name'] : el['title'];
    },
    getNodesAndLinks: function(arrayOfNewNodes, sourceId){
        networkBuilder.addNodes(arrayOfNewNodes, sourceId);

        return  {nodes: networkBuilder.nodeArray, links: networkBuilder.linkArray};
    },
    clearNetwork: function(){
        networkBuilder.nodeArray = []; networkBuilder.linkArray = [];
        networkBuilder.nodeIdArray = []; networkBuilder.linkIdArray = [];
    },
    hasBeenNotified: false,
    loadInitialNetwork: function(){
        networkBuilder.clearNetwork();
        var newNodesCursor = SelectedItems.find().fetch();
        var arrayOfNewNodes = $.map(newNodesCursor, function(el) { return typeof el === 'object' ? el : null });

        var networkObject = networkBuilder.getNodesAndLinks(arrayOfNewNodes);

        Nodes.insert(networkObject.nodes);
        if (networkObject.links.length > 0)
            Links.insert(networkObject.links);

        Meteor.call('clearSelections', function(err, resp){
            if (err)
                console.log(err);

            Router.go('viewNetwork');
        });
    },
    addNodes: function(arrayOfNewNodes, sourceId){
        arrayOfNewNodes.forEach(function(el, idx){
            networkBuilder.addNode(el);
            if (el['relatedNodes']){
                sourceId = el.id;
                networkBuilder.addNodes(el.relatedNodes, sourceId);
            }
            if (sourceId){
                networkBuilder.addLink(el, sourceId);
            }
        });
    },
    addNode: function(el){
        var title = networkBuilder.getTitle(el);
        var imagePath = networkBuilder.getImagePath(el);

        // Push Top-Level selectedItems
        if (networkBuilder.nodeIdArray.indexOf(el.id) === -1){
            networkBuilder.nodeArray.push({
                group: 'nodes',
                data: {
                    id: el.id.toString(),
                    title: title,
                    imagePath: imagePath,
                    media_type: el['media_type'] || networkBuilder.lastMediaType
                }
            });
            networkBuilder.nodeIdArray.push(el.id);
        }
    },
    addLink: function(el, sourceId){
        // Build link array at the same time
        if (el.id !== sourceId){
            networkBuilder.linkArray.push({
                group: 'edges',
                data: {
                    source: sourceId.toString(),
                    target: el.id.toString()
                }
            });
        }
    }
}

