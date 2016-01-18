Template.search.helpers({
    searchResults: function () {
        return SearchResults.find();
    },
    selectedItem: function(){
        return SelectedItems.find();
    },
    resultsExists: function () {
        return SearchResults.find().count() > 0;
    }
});

Template.search.events({
    'blur .movieTxt': function(e){
        var title = $(e.target).val();
        //start loader maybe
        Meteor.call('getSearchResults', title, function(err, resp){
            if (err)
                console.log(err);

            console.log(resp);
        });
    }
});