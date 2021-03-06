Meteor.methods({
    addSelection: function(data){ // eventually refactor to use userId instead of connectionId
        var existingRecord = SelectedItems.find({id: data.id}).count();

        if (!existingRecord){
            // relatedNodes ARE ONLY LOADED FOR SELECTED PEOPLE (NOT SELECTED MOVIES)
            if (data.media_type === 'person'){
                var credits = tmdb.getActorCredits(data.id.toString());

                if (credits){
                    data['relatedNodes'] = credits;

                } else {
                    data['relatedNodes'] = null;
                }
            }
        } else {
            return { duplicate: true };
        }
        SelectedItems.insert(data);
        return { duplicate: false };
    },
    addMovieCast: function(id){
        var cast = tmdb.getMovieCredits(id) || {};
        return cast;
    },
    addTvCast: function(id){
        var cast = tmdb.getTvCredits(id) || {};
        return cast;
    },
    addActorCredits: function(id){
        var credits = tmdb.getActorCredits(id) || {};
        return credits;
    },
    removeSelection: function(_id){
        SelectedItems.remove({_id: _id});
    },
    clearSelections: function(){
        SelectedItems.remove({});
        // SelectedItems.remove({ connectionId: this.connection.id });
    },
    clearNetwork: function(){
        Nodes.remove({});
        Links.remove({});
        //Nodes.remove({ connectionId: this.connection.id });
        //Links.remove({ connectionId: this.connection.id });
    }
});
