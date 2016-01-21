Template.searchResultItem.events({
    'click .collection-item': function(e, template){
        var data = template.data;
        Meteor.call('addSelection', data, function(err, resp){
            if (resp.duplicate)
                Materialize.toast(data.title + ' already selected.', 2000, 'toastError');

            Router.go('search'); // removes SearchResults, since route is changing
        });
    }
});

Template.searchResultItem.helpers({
   formatedMediaType: function(){
       var convertVals = {
           tv: 'TV Show',
           person: 'Actor',
           movie: 'Movie'
       }
       return convertVals[this.mediaType];
   },
   formatedReleaseDate: function(){
        return this.releaseDate ? '(' + this.releaseDate.toString() + ')' : '';
   }
});