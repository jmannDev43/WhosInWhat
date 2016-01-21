Template.search.helpers({
    searchResults: function () {
        return SearchResults.find();
    },
    resultsExists: function () {
        return SearchResults.find().count() > 0;
    }
});

Template.search.events({
    'blur .movieTxt, submit form': function(e){
        e.preventDefault();
        var title = $('.movieTxt').val();

        if (title){
            Router.go('/?srchStr=' + title);
        }
    }
});

