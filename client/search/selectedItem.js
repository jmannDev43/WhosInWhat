Template.selectedItem.events({
    'click .collection-item': function(e, template){
        var id = template.data._id;
        Meteor.call('removeSelection', id, function(err, resp){
           if (err)
               console.log(err);

        });
    }
})