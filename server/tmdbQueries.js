//mdb = Npm.require('moviedb')(Meteor.settings.apiKey);

SearchResults.remove({});

var mdb = Meteor.npmRequire('moviedb')(Meteor.settings.apiKey);
var lastId;
Meteor.methods({
    'getSearchResults': function getSearchResults(title){
       var responseLength;
       var resp = Async.runSync(function(done){
           var encodedTitle = encodeURIComponent(title);
           mdb.searchMulti({query: encodedTitle }, function(err, list){
               done(null, list);
           });
       });

        SearchResults.remove({});
        responseLength = resp.result.results.length;
        resp.result.results.forEach(function(el, idx){
            storeSearchResults(el);
        });
        return {_id: lastId};
    },
    addSelection: function(data){
        SelectedItems.insert(data);
        SearchResults.remove({});
    },
    removeSelection: function(id){
        SelectedItems.remove({_id: id});
    }
});

storeSearchResults = function(data){
    var imagePath = data['profile_path'] ? data['profile_path'] : data['poster_path'];
    var releaseDate = data['first_air_date'] ? data['first_air_date'] : data['release_date'];
    var title = data['name'] ? data['name'] : data['title'];
    lastId = SearchResults.insert({ tmdbId: data.id, title: title, imagePath: imagePath, releaseDate: releaseDate, mediaType: data.media_type });
}