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
            id: data.id,
            title: title,
            imagePath: imagePath,
            releaseDate: releaseDate,
            media_type: data.media_type,
            connectionId: self.connection.id
        };
        self.added('searchResults', data.id.toString() + self.connection.id, resultProps);
    });

    self.ready();

    self.onStop(function(){
        _.each(results, function(data){
            self.removed('SearchResults', self.connection.id);
        }) ;
    });

});

Meteor.publish('selectedItems', function() {
    return SelectedItems.find({ connectionId: this.connection.id });
});

Meteor.publish('nodes', function(){
    return Nodes.find();
   //return Nodes.find({ connectionId: this.connection.id });
});

Meteor.publish('links', function(){
    return Links.find();
    //return Links.find({ connectionId: this.connection.id });
});


//Meteor.publish('selectedItems', function(_id){
//
//    if (typeof _id !== 'string'){
//        return this.ready();
//    }
//
//    //var self = this;
//    //var data = SearchResults.findOne({ _id: _id });
//    //
//    //var initialLinks = tmdb.getActorCredits(data.tmdbId);
//    //var selectedItem = _.extend(data, initialLinks);
//
//    self.added('selectedItems', selectedItem.id, selectedItem);
//
//    self.ready();
//
//    //self.onStop(function(){
//    //    _.each()
//    //});
//});