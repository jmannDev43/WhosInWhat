Template.selection.helpers({
    selectedActors: function(){
        return SelectedItems.find({ mediaType: 'person' });
    },
    actorsExist: function(){
        return SelectedItems.find({ mediaType: 'person' }).count() > 0;
    },
    selectedMovies: function(){
        return SelectedItems.find({ mediaType: 'movie' });
    },
    moviesExist: function(){
        return SelectedItems.find({ mediaType: 'movie' }).count() > 0;
    },
    selectedTv: function(){
        return SelectedItems.find({ mediaType: 'tv' });
    },
    tvShowsExist: function(){
        return SelectedItems.find({ mediaType: 'tv' }).count() > 0;
    },
    hasSelectedItems: function(){
        return SelectedItems.find().count() > 0;
    }
});

Template.selection.events({
    'click .createNetwork': function(e, template){
        // get data from SelectedItems collection

//        loadInitialNetwork();
        Meteor.call('loadInitialNetwork', function(err, resp){
           if (!err){
               Router.go('viewNetwork');
           }
        });

        // make lazy-loading requests for each selected item (in a way that allows for expand/collapse)

    }
});