Template.searchResultItem.events({
    'click .collection-item': function(e, template){
        var data = template.data;
        //Router.go('/?selectedId=' + data._id);
        Meteor.call('getActorCredits', data, function(err, resp){
            //console.log(resp);
            //SelectedItems.insert(resp)
            Router.go('search');
        });


        //Meteor.call('addSelection', data, function(err, resp){
        //   if (err)
        //       console.log(err);
        //
        //   $('.movieTxt').val('');
        //});
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