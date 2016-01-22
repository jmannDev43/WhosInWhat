Template.selection.helpers({
    selectedActors: function(){
        return SelectedItems.find({ media_type: 'person' });
    },
    actorsExist: function(){
        return SelectedItems.find({ media_type: 'person' }).count() > 0;
    },
    selectedMovies: function(){
        return SelectedItems.find({ media_type: 'movie' });
    },
    moviesExist: function(){
        return SelectedItems.find({ media_type: 'movie' }).count() > 0;
    },
    selectedTv: function(){
        return SelectedItems.find({ media_type: 'tv' });
    },
    tvShowsExist: function(){
        return SelectedItems.find({ media_type: 'tv' }).count() > 0;
    },
    hasSelectedItems: function(){
        return SelectedItems.find().count() > 0;
    }
});

Template.selection.events({
    'click .createNetwork': function(e, template){
        // get data from SelectedItems collection
          Meteor.call('clearNetwork', function(err, resp){
              networkBuilder.loadInitialNetwork();
          });

        // make lazy-loading requests for each selected item (in a way that allows for expand/collapse)

    }
});