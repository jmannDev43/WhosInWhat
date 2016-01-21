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
    'getMovieCredits': function getResultsById(tmdbId){
        console.log(tmdbId);
        var resp = Async.runSync(function(done){
            mdb.movieCredits({id: tmdbId }, function(err, list){
                done(null, list);
            });
        });
        return Meteor._get(resp, 'result', 'cast');
    },
    getActorCredits: function(tmdbId){ // eventually refactor to use userId instead of connectionId
        var resp = Async.runSync(function(done){
            mdb.personCredits({ id: tmdbId }, function(err, credits){
                done(null, credits);
            });
        });

        return Meteor._get(resp, 'result', 'cast');
    }
});