var mdb = Meteor.npmRequire('moviedb')(Meteor.settings.apiKey);

var lastId;

tmdb = {};
_.extend(tmdb, {
    getSearchResults: function(title){
        var resp = Async.runSync(function(done){
            var encodedTitle = encodeURIComponent(title);
            mdb.searchMulti({query: encodedTitle }, function(err, list){
                done(null, list);
            });
        });
        return Meteor._get(resp, 'result', 'results');
    },
    getMovieCredits: function (id){
        var resp = Async.runSync(function(done){
            mdb.movieCredits({id: id }, function(err, list){
                done(null, list);
            });
        });
        return Meteor._get(resp, 'result', 'cast');
    },
    getTvCredits: function(id){
        var resp = Async.runSync(function(done){
            mdb.tvCredits({id: id }, function(err, list){
                done(null, list);
            });
        });
        return Meteor._get(resp, 'result', 'cast');
    },
    getActorCredits: function(id){
        var resp = HTTP.call('GET', 'http://api.themoviedb.org/3/person/' + id + '/combined_credits?api_key=' + Meteor.settings.apiKey, {});
        var credits = resp ? resp.data.cast : [];
        return credits;
    }
});