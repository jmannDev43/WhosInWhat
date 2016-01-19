Template.layout.events({
    'click .bg-img': function(e){
        if ($('.srchResults:visible').length === 1){
            Meteor.call('clearSearchResults', function(err, resp){
               if (err)
                   console.log(err);
            });
        }
    }
});