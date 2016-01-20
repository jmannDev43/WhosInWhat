loadInitialNetwork = function(){

    var all = SelectedItems.find().fetch();
    all = $.map(all, function(el) { return typeof el === 'object' ? el : null });

    //console.log(all);

    var elementsObj = {}, nodeArray = [], linkArray = [], nodeIdArray = [];
    var imageUrl = 'https://image.tmdb.org/t/p/w185';
    all.forEach(function(el, idx){

        // Push Top-Level selectedItems
        if (nodeIdArray.indexOf(el.tmdbId) === -1){
            var imagePath = el['imagePath'] ? imageUrl + el['imagePath'] : 'missing.png';
            nodeArray.push({
                data: {
                    id: el.tmdbId,
                    connectionId: el.connectionId,
                    title: el.title,
                    imagePath: imagePath,
                    mediaType: el.mediaType
                }
            });
            nodeIdArray.push(el.tmdbId);
        }

        // If 'person' and has initialLinks (credits), add those links as nodes
        if (el.mediaType === 'person' && el.initialLinks.length > 0){
            el.initialLinks.forEach(function(credit, n){
                imagePath = credit['poster_path'] ? imageUrl + credit['poster_path'] : 'missing.png';
                if (nodeIdArray.indexOf(credit.id) === -1){
                    nodeArray.push({
                        data: {
                            id: credit.id,
                            connectionId: el.connectionId,
                            title: credit.title,
                            imagePath: imagePath,
                            mediaType: null,
                            character: credit.character
                        }
                    });
                    nodeIdArray.push(credit.id);
                }

                // Build link array at the same time
                linkArray.push({
                    data: {
                        connectionId: el.connectionId,
                        source: el.tmdbId,
                        target: credit.id
                    }
                });
            });
        }
    });
    //console.log('hi :)')
    Nodes.insert(nodeArray);
    if (linkArray.length > 0)
        Links.insert(linkArray);

    Router.go('viewNetwork');
}