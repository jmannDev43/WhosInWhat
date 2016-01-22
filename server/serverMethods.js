Meteor.methods({
    addSelection: function(data){ // eventually refactor to use userId instead of connectionId
        var existingRecord = SelectedItems.find({id: data.id}).count();

        if (!existingRecord){
            // relatedNodes ARE ONLY LOADED FOR SELECTED PEOPLE (NOT SELECTED MOVIES)
            if (data.media_type === 'person'){
                var credits = tmdb.getActorCredits(data.id);

                if (credits){
                    data['relatedNodes'] = credits;

                } else {
                    data['relatedNodes'] = null;
                }
                SelectedItems.insert(data);
            }
        } else {
            return { duplicate: true };
        }

        return { duplicate: false };
    },
    addMovieCast: function(id){
        var cast = tmdb.getMovieCredits(id) || {};
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
        SelectedItems.remove({ connectionId: this.connection.id });
    },
    clearNetwork: function(){
        Nodes.remove({});
        Links.remove({});
        //Nodes.remove({ connectionId: this.connection.id });
        //Links.remove({ connectionId: this.connection.id });
    }
});
