Template.search.helpers({
    searchResults: function () {
        return SearchResults.find();
    },
    resultsExists: function () {
        return SearchResults.find().count() > 0;
    },
    selectedItemsExist: function () {
        return SelectedItems.find().count() > 0;
    }
});

Template.search.events({
    'blur .movieTxt, submit form': function(e){
        e.preventDefault();
        var title = $('.movieTxt').val();

        if (title){
            Router.go('/?srchStr=' + title);
        }
    },
    'click .createNetwork': function(e, template){
        // get data from SelectedItems collection
        Meteor.call('clearNetwork', function(err, resp){
            networkBuilder.loadInitialNetwork();
        });

        // make lazy-loading requests for each selected item (in a way that allows for expand/collapse)

    },
    'click .clearSelected': function (e) {
        Meteor.call('clearSelections', function(err, resp){

        });
    }
});

