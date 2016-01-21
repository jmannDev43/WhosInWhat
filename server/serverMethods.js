Meteor.methods({
    addSelection: function(data){ // eventually refactor to use userId instead of connectionId
        var existingRecord = SelectedItems.find({tmdbId: data.tmdbId}).count();

        if (!existingRecord){
            if (data.mediaType === 'person'){
                var credits = tmdb.getActorCredits(data.tmdbId);

                console.log(this.connection.id);
                if (credits){
                    data['initialLinks'] = credits;

                } else {
                    data['initialLinks'] = null;
                }
                SelectedItems.insert(data);
            }
        } else {
            return { duplicate: true };
        }

        return { duplicate: false };
    },
    addMovieCast: function(tmdbId){
        var cast = tmdb.getMovieCredits(tmdbId) || {};
        //console.log('cast: ', cast);
        return cast;
    },
    removeSelection: function(_id){
        SelectedItems.remove({_id: _id});
    },
    clearSelections: function(){
        SelectedItems.remove({ connectionId: this.connection.id });
    },
    clearNetwork: function(){
        Nodes.remove({});
        Links.remove({});
        //Nodes.remove({ connectionId: this.connection.id });
        //Links.remove({ connectionId: this.connection.id });
    }
});
