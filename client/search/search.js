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
        //start loader maybe
        if (title){
            Router.go('/?srchStr=' + title);
            //Meteor.call('getSearchResults', title, function(err, resp){
            //    if (err)
            //        console.log(err);
            //
            //    if (!resp){
            //        Materialize.toast('No results found.', 2000, 'noResults');
            //    }
            //});
        }
    }
});