Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/', {
    name: 'search',
    //waitOn: function(){ return [Meteor.subscribe('movieResults'), Meteor.subscribe('actorResults')]; },
    data: function() { return [SearchResults.find(), SelectedItems.find()]; }
});

Router.route('/viewNetwork', {
   name: 'viewNetwork',
   data: function() { return [Nodes.find(), Links.find()]; }
});