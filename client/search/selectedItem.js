Template.selectedItem.events({
    'click .collection-item': function(e, template){
        var _id = template.data._id;
        Meteor.call('removeSelection', _id, function(err, resp){
           if (err)
               console.log(err);

        });
    }
})