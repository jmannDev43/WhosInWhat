Meteor.publish('searchResults', function(srchStr){
    if (typeof srchStr !== "string"){
        return this.ready();
    }
    var results = tmdb.getSearchResults(srchStr) || [];
    var self = this;

    var imagePath, releaseDate, title, lastId;
    _.each(results, function(data){
        imagePath = data['profile_path'] ? data['profile_path'] : data['poster_path'];
        releaseDate = data['first_air_date'] ? data['first_air_date'] : data['release_date'];
        title = data['name'] ? data['name'] : data['title'];

        var resultProps = {
            tmdbId: data.id,
            title: title,
            imagePath: imagePath,
            releaseDate: releaseDate,
            mediaType: data.media_type,
            connectionId: self.connection.id
        };
        self.added('searchResults', data.id, resultProps);
    });

    self.ready();

    self.onStop(function(){
        _.each(results, function(data){
            self.removed('SearchResults', data.id);
        }) ;
    });

    //var initialLinks;
    //if (data.media_type === 'person'){
    //    initialLinks = getActorCredits(data.id);
    //}
    //SearchResults.insert({ tmdbId: data.id, title: title, imagePath: imagePath, releaseDate: releaseDate, mediaType: data.media_type, initialLinks: initialLinks });


});