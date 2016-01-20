Meteor.methods({
    getActorCredits: function(data){ // eventually refactor to use userId instead of connectionId
        if (data.mediaType === 'person'){
            var credits = tmdb.getActorCredits(data.tmdbId);

            console.log(this.connection.id);
            if (credits){
                //var selectedItem = _.extend(data, credits);
                data['initialLinks'] = credits;
                //SearchResults.remove({ connectionId: this.connection.id });

            } else {
                data['initialLinks'] = null;
            }
            SelectedItems.insert(data);
        }
    },
    removeSelection: function(id){
        SelectedItems.remove({_id: id});
    },
    clearNetwork: function(){
        Nodes.remove({});
        Links.remove({});
        //Nodes.remove({ connectionId: this.connection.id });
        //Links.remove({ connectionId: this.connection.id });
    }
});
