var mdb = Meteor.npmRequire('moviedb')(Meteor.settings.apiKey);
var lastId;

tmdb = {};
_.extend(tmdb, {
    'getSearchResults': function getSearchResults(title){
        var resp = Async.runSync(function(done){
            var encodedTitle = encodeURIComponent(title);
            mdb.searchMulti({query: encodedTitle }, function(err, list){
                done(null, list);
            });
        });
        return Meteor._get(resp, 'result', 'results');
    },
    addSelection: function(data){
        if (data.mediaType === 'person'){
            var credits = tmdb.getActorCredits(data.tmdbId);
            if (credits){
                _.extend(data, {
                    initialLinks: credits
                });
            }
        }
        SelectedItems.insert(data);
        SearchResults.remove({});
    },
    getActorCredits: function(tmdbId, connectionId){ // eventually refactor to use userId instead of connectionId
        var resp = Async.runSync(function(done){
            mdb.personCredits({ id: tmdbId }, function(err, credits){
                done(null, credits);
            });
        });

        //console.log(resp);
        return Meteor.get(resp, 'result', 'cast');
    },
    removeSelection: function(id){
        SelectedItems.remove({_id: id});
    },
    clearSearchResults: function(){
        SearchResults.remove({});
    }
});

//storeSearchResults = function(data){
//    var imagePath = data['profile_path'] ? data['profile_path'] : data['poster_path'];
//    var releaseDate = data['first_air_date'] ? data['first_air_date'] : data['release_date'];
//    var title = data['name'] ? data['name'] : data['title'];
//
//    var initialLinks;
//    if (data.media_type === 'person'){
//        initialLinks = getActorCredits(data.id);
//    }
//
//    lastId = SearchResults.insert({ tmdbId: data.id, title: title, imagePath: imagePath, releaseDate: releaseDate, mediaType: data.media_type, initialLinks: initialLinks });
//}

