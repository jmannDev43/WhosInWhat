Template.searchResultItem.events({
    'click .collection-item': function(e, template){
        var data = template.data;
        Meteor.call('addSelection', data, function(err, resp){
           if (err)
               console.log(err);
        });
    }
})