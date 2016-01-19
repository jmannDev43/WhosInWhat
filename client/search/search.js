Template.search.helpers({
    searchResults: function () {
        return SearchResults.find();
    },
    resultsExists: function () {
        return SearchResults.find().count() > 0;
    }
});

Template.search.events({
    'blur .movieTxt': function(e){
        var title = $(e.target).val();
        //start loader maybe
        if (title){
            Meteor.call('getSearchResults', title, function(err, resp){
                if (err)
                    console.log(err);

                if (!resp){
                    Materialize.toast('No results found.', 2000, 'noResults');
                }
            });
        }
    }
});